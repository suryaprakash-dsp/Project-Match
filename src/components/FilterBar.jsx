import React from 'react';
import { ChevronDown } from 'lucide-react';

export function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none input-field pr-8 py-2 text-sm cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt === 'All' ? `${label}: All` : opt}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  );
}

export default function FilterBar({ children, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {children}
    </div>
  );
}
