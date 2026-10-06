import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 "
        onClick={onClose}
      />
      <div className={`relative bg-white dark:bg-[#251f1a] border border-[#e7decb] dark:border-[#42372e] rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-6 border-b border-[#e7decb] dark:border-[#42372e]">
          <h2 className="text-lg font-semibold text-[#2d231b] dark:text-[#f6efe6]">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f0e6] dark:hover:bg-[#302821] text-[#7d6e61] dark:text-[#aa9c8e] hover:text-[#2d231b] dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 text-[#2d231b] dark:text-[#f6efe6]">{children}</div>
      </div>
    </div>
  );
}
