import React, { useState } from 'react';
import { SlidersHorizontal, Check, RotateCcw, Sparkles, HelpCircle, X, Percent, Award } from 'lucide-react';

export default function ScoringLogicModal({ isOpen, onClose, weights, onSaveWeights }) {
  if (!isOpen) return null;

  const defaultWeights = {
    skills: 40,
    department: 25,
    year: 20,
    availability: 15,
  };

  const [currentWeights, setCurrentWeights] = useState(weights || defaultWeights);

  const totalWeight = Object.values(currentWeights).reduce((a, b) => a + Number(b), 0);

  const handleSliderChange = (key, val) => {
    setCurrentWeights(prev => ({
      ...prev,
      [key]: Number(val),
    }));
  };

  const handleReset = () => {
    setCurrentWeights(defaultWeights);
  };

  const handleSave = () => {
    onSaveWeights(currentWeights);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#1e1c19] rounded-2xl border border-surface-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-subtle/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#b46b2b]/15 flex items-center justify-center text-[#b46b2b]">
              <SlidersHorizontal size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-navy">Scoring Algorithm Calibration</h3>
              <p className="text-xs text-brand-muted">Configure affinity weightings for matching candidates</p>
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
        <div className="p-6 overflow-y-auto flex flex-col gap-5 text-sm">
          {/* Summary Banner */}
          <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border flex items-start gap-3">
            <Sparkles size={18} className="text-[#b46b2b] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-brand-navy text-xs block">Formula: Affinity Score (0-100%)</span>
              <p className="text-xs text-brand-muted mt-0.5 font-mono">
                Score = (W_skill × S_match) + (W_dept × D_match) + (W_cohort × Y_match) + (W_avail × A_match)
              </p>
            </div>
            <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
              totalWeight === 100 
                ? 'bg-accent-emeraldBg text-accent-emerald border-accent-emeraldBorder' 
                : 'bg-amber-500/15 text-amber-600 border-amber-500/30'
            }`}>
              Total: {totalWeight}%
            </div>
          </div>

          {/* Sliders */}
          <div className="flex flex-col gap-4">
            {/* Skill Match */}
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface border border-surface-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
                  Core Skills & Frameworks
                </span>
                <span className="text-xs font-bold text-[#b46b2b] bg-[#b46b2b]/10 px-2 py-0.5 rounded">
                  {currentWeights.skills}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="70"
                step="5"
                value={currentWeights.skills}
                onChange={(e) => handleSliderChange('skills', e.target.value)}
                className="w-full accent-[#b46b2b] cursor-pointer"
              />
              <span className="text-[11px] text-brand-muted">Overlap in React, Python, Cloud, UI/UX, and data stacks.</span>
            </div>

            {/* Department Match */}
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface border border-surface-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-navy">Department & Specialization Alignment</span>
                <span className="text-xs font-bold text-[#b46b2b] bg-[#b46b2b]/10 px-2 py-0.5 rounded">
                  {currentWeights.department}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={currentWeights.department}
                onChange={(e) => handleSliderChange('department', e.target.value)}
                className="w-full accent-[#b46b2b] cursor-pointer"
              />
              <span className="text-[11px] text-brand-muted">Shared academic branch (CSE, IT, ECE) or interdisciplinary bonus.</span>
            </div>

            {/* Academic Cohort */}
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface border border-surface-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-navy">Academic Cohort / Year Proximity</span>
                <span className="text-xs font-bold text-[#b46b2b] bg-[#b46b2b]/10 px-2 py-0.5 rounded">
                  {currentWeights.year}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="5"
                value={currentWeights.year}
                onChange={(e) => handleSliderChange('year', e.target.value)}
                className="w-full accent-[#b46b2b] cursor-pointer"
              />
              <span className="text-[11px] text-brand-muted">Senior capstone pairs or same-year peer synergy.</span>
            </div>

            {/* Availability */}
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface border border-surface-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-navy">Commitment & Immediate Availability</span>
                <span className="text-xs font-bold text-[#b46b2b] bg-[#b46b2b]/10 px-2 py-0.5 rounded">
                  {currentWeights.availability}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="5"
                value={currentWeights.availability}
                onChange={(e) => handleSliderChange('availability', e.target.value)}
                className="w-full accent-[#b46b2b] cursor-pointer"
              />
              <span className="text-[11px] text-brand-muted">Preference for "Ready to Join Immediately" vs part-time hackathons.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-surface-border bg-surface-subtle/50">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-muted hover:text-brand-navy flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw size={14} />
            Reset to Default
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-surface-border bg-surface text-brand-navy text-xs font-semibold hover:bg-surface-subtle cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <Check size={14} />
              Apply Weights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
