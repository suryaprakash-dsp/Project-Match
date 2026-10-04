import React, { useState } from 'react';
import { Bookmark, X, Search, Trash2, ArrowRight } from 'lucide-react';

export default function SavedSearchesModal({ isOpen, onClose, onApplySearch }) {
  if (!isOpen) return null;

  const [savedSearches, setSavedSearches] = useState([
    { id: 1, title: 'Computer Vision & Jetson Nano Capstones', query: 'Computer Vision', category: 'Campus Sustainability' },
    { id: 2, title: 'Spatial Computing / WebGL Teams', query: 'Three.js', category: 'Spatial Computing & UI' },
    { id: 3, title: 'Distributed Systems & FastAPI', query: 'FastAPI', category: 'AI & Web Systems' },
  ]);

  const handleDelete = (id) => {
    setSavedSearches(prev => prev.filter(s => s.id !== id));
  };

  const handleSelect = (searchItem) => {
    onApplySearch(searchItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1e1c19] rounded-2xl border border-surface-border shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-subtle/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#b46b2b]/15 flex items-center justify-center text-[#b46b2b]">
              <Bookmark size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-navy">Saved Searches</h3>
              <p className="text-xs text-brand-muted">Quick filters and criteria bookmarks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-surface transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-3">
          {savedSearches.length === 0 ? (
            <div className="py-8 text-center text-xs text-brand-muted">
              No saved searches saved yet.
            </div>
          ) : (
            savedSearches.map((s) => (
              <div
                key={s.id}
                className="p-3.5 rounded-xl bg-surface border border-surface-border hover:border-slate-300 dark:hover:border-stone-700 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <Search size={16} className="text-[#b46b2b] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-brand-navy block truncate">{s.title}</span>
                    <span className="text-[11px] text-brand-muted truncate block">Query: "{s.query}" • {s.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleSelect(s)}
                    className="px-2.5 py-1 rounded-lg bg-[#b46b2b]/10 hover:bg-[#b46b2b] text-[#9c5921] hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Load</span>
                    <ArrowRight size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-1 rounded-lg text-brand-muted hover:text-red-500 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3.5 border-t border-surface-border bg-surface-subtle/50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface border border-surface-border text-brand-navy text-xs font-semibold hover:bg-surface-subtle cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
