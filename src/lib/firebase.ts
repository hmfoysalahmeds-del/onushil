import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut,
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  getDocFromServer,
  addDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, ExamHistory, LeaderboardEntry } from '../types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Must pass firebaseConfig.firestoreDatabaseId to getFirestore
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Diagnostic connection check per skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or internet connection.");
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Sign in using Google popup
 */
export async function signInWithGoogle(): Promise<FirebaseUser> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Sign in using Google Redirect (useful if browser blocks popups on custom domains)
 */
export async function signInWithGoogleRedirect(): Promise<void> {
  await signInWithRedirect(auth, googleProvider);
}

/**
 * Check if user returned from a redirect sign-in
 */
export async function checkRedirectResult(): Promise<FirebaseUser | null> {
  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (error) {
    console.warn('Redirect result check:', error);
    return null;
  }
}

/**
 * Sign out current user
 */
export async function logOutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Sync user profile to Firestore
 * Save each user in a Firestore "users" collection with these fields:
 * uid, name, email, photo, role ("student" by default), blocked (false by default),
 * createdAt, lastLoginAt. Update lastLoginAt on every login.
 */
export async function syncUserProfile(user: FirebaseUser): Promise<UserProfile> {
  const userRef = doc(db, 'users', user.uid);
  const now = new Date().toISOString();

  try {
    const docSnap = await getDoc(userRef);
    const firstName = user.displayName?.split(' ')[0] || user.displayName || 'Candidate';

    if (docSnap.exists()) {
      const existing = docSnap.data() as UserProfile;
      // Update lastLoginAt on every login
      const updatedProfile: UserProfile = {
        ...existing,
        name: user.displayName || existing.name || 'Candidate',
        email: user.email || existing.email,
        photo: user.photoURL || existing.photo || '',
        displayName: existing.displayName || firstName,
        lastLoginAt: now,
      };

      await updateDoc(userRef, {
        name: updatedProfile.name,
        email: updatedProfile.email,
        photo: updatedProfile.photo,
        lastLoginAt: now,
      });

      return updatedProfile;
    } else {
      // Create new user profile
      const newProfile: UserProfile = {
        uid: user.uid,
        name: user.displayName || 'Candidate',
        email: user.email || '',
        photo: user.photoURL || '',
        displayName: firstName,
        showOnLeaderboard: true,
        role: 'student',
        blocked: false,
        createdAt: now,
        lastLoginAt: now,
      };

      await setDoc(userRef, newProfile);
      return newProfile;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    throw error;
  }
}

/**
 * Update user display name or privacy settings
 */
export async function updateUserSettings(
  uid: string, 
  settings: { displayName?: string; showOnLeaderboard?: boolean }
): Promise<void> {
  const userRef = doc(db, 'users', uid);
  try {
    await updateDoc(userRef, settings);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
    throw error;
  }
}

/**
 * Fetch candidate's exam history from Firestore
 */
export async function fetchUserHistory(uid: string): Promise<ExamHistory[]> {
  const path = `users/${uid}/history`;
  try {
    const historyCol = collection(db, 'users', uid, 'history');
    const snap = await getDocs(historyCol);
    const list: ExamHistory[] = [];
    snap.forEach((d) => {
      list.push(d.data() as ExamHistory);
    });
    // Sort by date descending
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

/**
 * Save exam result to user's history and to leaderboard if qualified
 */
export async function saveExamResultToFirestore(
  user: UserProfile, 
  exam: ExamHistory,
  answeredCount: number
): Promise<void> {
  // 1. Save to user private history
  const historyPath = `users/${user.uid}/history/${exam.id}`;
  try {
    const historyDoc = doc(db, 'users', user.uid, 'history', exam.id);
    await setDoc(historyDoc, {
      ...exam,
      uid: user.uid,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, historyPath);
  }

  // 2. Only completed tests count (abandoned or < 10 answered excluded).
  if (answeredCount >= 10) {
    const isVerbal = exam.mode.startsWith('verbal') || exam.mode === '100-issb' || exam.mode === '50-sprint';
    const testType: 'verbal' | 'non-verbal' = isVerbal ? 'verbal' : 'non-verbal';
    
    let setName = 'Verbal Set 1';
    if (exam.mode === 'verbal-set-2') setName = 'Verbal Set 2';
    else if (exam.mode === 'non-verbal-set-1' || exam.mode === 'non-verbal-50' || exam.mode === 'non-verbal-38') setName = 'Non-Verbal Set 1';
    else if (exam.mode === '100-issb') setName = '100 IQ ISSB';
    else if (exam.mode === '50-sprint' || exam.mode === 'sprint-50') setName = '50 IQ Sprint';

    const accuracy = exam.totalQuestions > 0 ? Math.round((exam.correctAnswers / exam.totalQuestions) * 100) : 0;

    const leaderboardPath = 'leaderboard';
    try {
      const entry: Omit<LeaderboardEntry, 'id'> = {
        uid: user.uid,
        displayName: user.displayName || user.name.split(' ')[0] || 'Candidate',
        photo: user.photo || '',
        testType,
        setName,
        score: exam.correctAnswers,
        total: exam.totalQuestions,
        accuracy,
        timeTaken: exam.timeTakenSeconds,
        createdAt: exam.date,
        hidden: !user.showOnLeaderboard,
      };

      await addDoc(collection(db, leaderboardPath), entry);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, leaderboardPath);
    }
  }
}

/**
 * Fetch all eligible leaderboard entries
 */
export async function fetchLeaderboardEntries(
  testType: 'verbal' | 'non-verbal',
  currentUid?: string
): Promise<LeaderboardEntry[]> {
  const path = 'leaderboard';
  try {
    const col = collection(db, path);
    // Explicitly query for non-hidden entries to strictly satisfy security rules
    const qPublic = query(
      col, 
      where('testType', '==', testType), 
      where('hidden', '==', false)
    );
    const snap = await getDocs(qPublic);
    const map = new Map<string, LeaderboardEntry>();
    snap.forEach((d) => {
      const data = d.data() as LeaderboardEntry;
      map.set(d.id, {
        ...data,
        id: d.id,
      });
    });

    // If candidate is logged in, also fetch candidate's own entries in case they opted to be hidden
    // so their private ranking can still be computed in "Your rank"
    if (currentUid) {
      try {
        const qMine = query(
          col, 
          where('testType', '==', testType), 
          where('uid', '==', currentUid)
        );
        const snapMine = await getDocs(qMine);
        snapMine.forEach((d) => {
          const data = d.data() as LeaderboardEntry;
          map.set(d.id, {
            ...data,
            id: d.id,
          });
        });
      } catch {
        // Safe fallback if user query fails or has no entries
      }
    }

    return Array.from(map.values());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

