import React from 'react';

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 shadow-sm">
          <Icon size={28} />
        </div>
      )}
      <h3 className="text-lg font-bold text-brand-navy mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm font-normal">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
