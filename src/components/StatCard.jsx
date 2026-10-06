import React from 'react';

export default function StatCard({ label, value, icon: Icon, color = 'indigo', trend }) {
  const iconTints = {
    indigo: 'bg-indigo-100/80 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800',
    blue: 'bg-blue-100/80 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800',
    green: 'bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800',
    yellow: 'bg-amber-100/80 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800',
    purple: 'bg-violet-100/80 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200/80 dark:border-violet-800',
    cyan: 'bg-cyan-100/80 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800',
  };

  return (
    <div className="card flex items-center gap-4 hover:shadow-xl hover:translate-y-[-2px] transition-all">
      {Icon && (
        <div className={`p-3 rounded-2xl ${iconTints[color] || iconTints.indigo} shadow-sm shrink-0`}>
          <Icon size={22} />
        </div>
      )}
      <div>
        <p className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
          {value}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          {label}
        </p>
        {trend && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}
