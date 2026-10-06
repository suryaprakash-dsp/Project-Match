import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function MatchScore({ score, reasons = [], size = 'sm', showReasons = false }) {
  const textColor =
    score >= 85 ? 'text-emerald-600 dark:text-emerald-400' :
    score >= 70 ? 'text-indigo-600 dark:text-indigo-400' :
    'text-slate-600 dark:text-slate-400';

  const barGradient =
    score >= 85 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
    score >= 70 ? 'bg-gradient-to-r from-indigo-500 to-blue-500' :
    'bg-slate-400 dark:bg-slate-600';

  if (size === 'lg') {
    return (
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Skill Compatibility Match
          </span>
          <span className={`text-xl font-black ${textColor}`}>{score}%</span>
        </div>
        <div className="w-full bg-slate-200/80 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5">
          <div
            className={`${barGradient} h-1.5 rounded-full transition-all duration-700 shadow-sm`}
            style={{ width: `${score}%` }}
          />
        </div>
        {showReasons && reasons.length > 0 && (
          <ul className="space-y-1.5 mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800">
            {reasons.map((r, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Skill Match</span>
        <span className={`text-xs font-extrabold ${textColor}`}>{score}%</span>
      </div>
      <div className="w-full bg-slate-200/80 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div
          className={`${barGradient} h-1.5 rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
