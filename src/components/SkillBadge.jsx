import React from 'react';

const colors = [
  'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200/90 dark:border-indigo-800',
  'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200/90 dark:border-blue-800',
  'bg-cyan-50 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 border-cyan-200/90 dark:border-cyan-800',
  'bg-violet-50 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border-violet-200/90 dark:border-violet-800',
  'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border-teal-200/90 dark:border-teal-800',
  'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-200/90 dark:border-emerald-800',
  'bg-rose-50 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-200/90 dark:border-rose-800',
  'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-200/90 dark:border-amber-800',
];

function getColor(skill) {
  let hash = 0;
  for (let i = 0; i < skill.length; i++) hash = skill.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default function SkillBadge({ skill, removable, onRemove, size = 'sm', className = '' }) {
  const color = getColor(skill);
  return (
    <span
      className={`inline-flex items-center gap-1 border rounded-full font-semibold ${
        size === 'xs' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
      } ${color} ${className}`}
    >
      {skill}
      {removable && (
        <button
          onClick={() => onRemove?.(skill)}
          className="ml-0.5 hover:text-rose-600 transition-colors"
          type="button"
        >
          ×
        </button>
      )}
    </span>
  );
}
