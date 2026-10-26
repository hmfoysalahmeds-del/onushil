import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Eye, EyeOff, Save, CheckCircle2, ShieldAlert } from 'lucide-react';
import { UserProfile } from '../types';
import { updateUserSettings } from '../lib/firebase';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onProfileUpdated: (updated: UserProfile) => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onProfileUpdated,
}) => {
  const [displayName, setDisplayName] = useState(userProfile.displayName || userProfile.name.split(' ')[0] || '');
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(userProfile.showOnLeaderboard ?? true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = displayName.trim();
    if (!trimmed) {
      setError('Display name cannot be blank.');
      return;
    }
    if (trimmed.length > 50) {
      setError('Display name must be 50 characters or less.');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await updateUserSettings(userProfile.uid, {
        displayName: trimmed,
        showOnLeaderboard,
      });

      const updated = {
        ...userProfile,
        displayName: trimmed,
        showOnLeaderboard,
      };
      onProfileUpdated(updated);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 700);
    } catch (err: any) {
      setError(err.message || 'Failed to update settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-850/60">
            <div className="flex items-center gap-3">
              {userProfile.photo ? (
                <img
                  src={userProfile.photo}
                  alt={userProfile.name}
                  className="w-9 h-9 rounded-xl object-cover ring-1 ring-emerald-500/50"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center text-sm">
                  {userProfile.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-base font-black text-white">Leaderboard & Profile</h3>
                <p className="text-[11px] text-slate-400 font-medium">Privacy and competitive display preferences</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSave} className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Display Name input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                Display Name (shown on leaderboard)
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  if (error) setError(null);
                }}
                maxLength={50}
                placeholder="e.g. Tanvir"
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white font-medium outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all"
              />
              <p className="text-[11px] text-slate-400">
                Your email address is <strong className="text-emerald-400">never</strong> shown on the public leaderboard. Only this display name will appear.
              </p>
            </div>

            {/* Toggle show on leaderboard */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  {showOnLeaderboard ? (
                    <Eye className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-amber-400" />
                  )}
                  <span>Show me on the leaderboard</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {showOnLeaderboard
                    ? 'Your best score will be listed on public rankings.'
                    : 'Hidden from public rankings. You can still see your private rank.'}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnLeaderboard}
                  onChange={(e) => setShowOnLeaderboard(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving || success}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer disabled:opacity-50"
              >
                {success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save Preferences'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
