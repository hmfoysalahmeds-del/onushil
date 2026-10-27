import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle, 
  Sparkles, 
  RefreshCw, 
  UploadCloud, 
  ToggleLeft, 
  ToggleRight,
  Shield,
  FileText
} from 'lucide-react';
import { WatWord } from '../types';
import { 
  fetchAllWatWordsForAdmin, 
  addWatWord, 
  updateWatWord, 
  deleteWatWord, 
  bulkImportWatWords 
} from '../lib/firebase';
import { ISSB_SAMPLE_153_WORDS } from '../data/watSampleWords';

interface WatAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWordsChanged?: () => void;
}

export const WatAdminModal: React.FC<WatAdminModalProps> = ({
  isOpen,
  onClose,
  onWordsChanged,
}) => {
  const [words, setWords] = useState<WatWord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [newWordInput, setNewWordInput] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [bulkText, setBulkText] = useState<string>('');
  const [isBulkImporting, setIsBulkImporting] = useState<boolean>(false);
  const [bulkResult, setBulkResult] = useState<{ added: number; skipped: number } | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const loadAllWords = async () => {
    setLoading(true);
    try {
      const data = await fetchAllWatWordsForAdmin();
      setWords(data);
    } catch (err) {
      console.warn('Failed to fetch words for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAllWords();
      setBulkResult(null);
      setFeedbackMsg(null);
    }
  }, [isOpen]);

  const showFeedback = (text: string, type: 'success' | 'error') => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  // Add Single Word
  const handleAddSingleWord = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newWordInput.trim();
    if (!trimmed) return;

    // Check duplicate
    if (words.some((w) => w.word.toLowerCase() === trimmed.toLowerCase())) {
      showFeedback(`"${trimmed}" already exists in the word bank.`, 'error');
      return;
    }

    setIsAdding(true);
    try {
      const created = await addWatWord(trimmed, true);
      setWords((prev) => [...prev, created].sort((a, b) => a.word.localeCompare(b.word)));
      setNewWordInput('');
      showFeedback(`Added "${trimmed}" to the word bank.`, 'success');
      onWordsChanged?.();
    } catch (err: any) {
      showFeedback(err.message || 'Failed to add word.', 'error');
    } finally {
      setIsAdding(false);
    }
  };

  // Toggle active on/off
  const handleToggleActive = async (word: WatWord) => {
    if (!word.id) return;
    const nextState = !word.active;
    try {
      await updateWatWord(word.id, { active: nextState });
      setWords((prev) =>
        prev.map((w) => (w.id === word.id ? { ...w, active: nextState } : w))
      );
      onWordsChanged?.();
    } catch (err: any) {
      showFeedback('Failed to update word state.', 'error');
    }
  };

  // Delete Word
  const handleDeleteWord = async (word: WatWord) => {
    if (!word.id) return;
    if (!window.confirm(`Delete "${word.word}" from word bank?`)) return;

    try {
      await deleteWatWord(word.id);
      setWords((prev) => prev.filter((w) => w.id !== word.id));
      showFeedback(`Deleted "${word.word}".`, 'success');
      onWordsChanged?.();
    } catch (err: any) {
      showFeedback('Failed to delete word.', 'error');
    }
  };

  // Bulk Import
  const handleBulkImport = async () => {
    if (!bulkText.trim()) return;

    setIsBulkImporting(true);
    setBulkResult(null);
    try {
      const result = await bulkImportWatWords(bulkText);
      setBulkResult(result);
      setBulkText('');
      await loadAllWords();
      showFeedback(`Import complete: ${result.added} added, ${result.skipped} skipped.`, 'success');
      onWordsChanged?.();
    } catch (err: any) {
      showFeedback(err.message || 'Failed to bulk import words.', 'error');
    } finally {
      setIsBulkImporting(false);
    }
  };

  // Load 153 PDF Words helper
  const handleLoad153SampleWords = () => {
    setBulkText(ISSB_SAMPLE_153_WORDS.join('\n'));
    setBulkResult(null);
  };

  if (!isOpen) return null;

  const activeCount = words.filter((w) => w.active).length;
  const totalCount = words.length;

  const filteredWords = words.filter((w) =>
    w.word.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin Management</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              WAT Word Bank Management
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total Active Count Banner */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Active Words in Bank
              </span>
              <strong className="text-2xl font-black text-emerald-400">
                {activeCount}
              </strong>
              <span className="text-xs text-slate-500 ml-1.5">
                ({totalCount} total in database)
              </span>
            </div>

            {activeCount < 80 ? (
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Need at least 80 active words to start simulation
              </span>
            ) : (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Sufficient words for candidate rotation
              </span>
            )}
          </div>

          <button
            onClick={loadAllWords}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Feedback alert */}
        {feedbackMsg && (
          <div
            className={`mx-6 mt-4 p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
            }`}
          >
            {feedbackMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* Content Body: Scrollable */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-left">
          
          {/* Section 1: Bulk Import */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-purple-400" />
                  Bulk Import Words
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Paste words one per line. Blank lines trimmed; existing words (case-insensitive) skipped automatically.
                </p>
              </div>

              {/* Pre-fill helper from PDF */}
              <button
                type="button"
                onClick={handleLoad153SampleWords}
                className="bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 hover:border-purple-500/50 px-3 py-1.5 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Fill 153 Words from ISSB PDF</span>
              </button>
            </div>

            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Paste words here, one per line (e.g. Soldier, Brave, Risk, Peace...)"
              rows={4}
              className="w-full bg-slate-900 border border-slate-800 focus:border-purple-500 focus:outline-none text-white text-xs sm:text-sm p-3 rounded-xl font-mono"
            />

            <div className="flex items-center justify-between">
              {bulkResult ? (
                <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Added {bulkResult.added} words • {bulkResult.skipped} skipped (already present)</span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-500">
                  {bulkText.split('\n').filter((l) => l.trim()).length} lines detected
                </span>
              )}

              <button
                type="button"
                disabled={isBulkImporting || !bulkText.trim()}
                onClick={handleBulkImport}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  isBulkImporting || !bulkText.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-950/40'
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>{isBulkImporting ? 'Importing...' : 'Import words'}</span>
              </button>
            </div>
          </div>

          {/* Section 2: Add Single Word Form */}
          <form onSubmit={handleAddSingleWord} className="flex gap-2">
            <input
              type="text"
              value={newWordInput}
              onChange={(e) => setNewWordInput(e.target.value)}
              placeholder="Add single word (e.g. Discipline)"
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-purple-500 focus:outline-none text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl font-medium"
            />
            <button
              type="submit"
              disabled={isAdding || !newWordInput.trim()}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                isAdding || !newWordInput.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{isAdding ? 'Adding...' : 'Add Word'}</span>
            </button>
          </form>

          {/* Section 3: Word List Table & Search */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search word bank..."
                  className="w-full bg-slate-950 border border-slate-800 pl-9 pr-4 py-2 rounded-xl text-xs text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredWords.length} of {words.length}
              </span>
            </div>

            {/* Table */}
            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/50">
              <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-800/80">
                {filteredWords.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500">
                    {words.length === 0 ? 'No words in bank yet. Use bulk import or add single word above.' : 'No words match your search.'}
                  </div>
                ) : (
                  filteredWords.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="p-3 px-4 flex items-center justify-between hover:bg-slate-900/60 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-slate-500 w-8">
                          #{index + 1}
                        </span>
                        <strong className="text-sm font-black text-white">
                          {item.word}
                        </strong>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Active toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleActive(item)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            item.active
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {item.active ? (
                            <>
                              <ToggleRight className="w-4 h-4 text-emerald-400" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4 text-slate-500" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteWord(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Delete word"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
