import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={18} className="text-emerald-600" />,
  error: <AlertCircle size={18} className="text-red-600" />,
  info: <Info size={18} className="text-blue-600" />,
};

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, toast.duration || 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-auto flex items-center gap-3 bg-white border border-slate-200 shadow-lg rounded-xl px-4 py-3 animate-in slide-in-from-right-5">
      {icons[toast.type] || icons.info}
      <p className="text-sm text-slate-700 font-medium">{toast.message}</p>
      <button onClick={onClose} className="ml-1 text-slate-400 hover:text-slate-600">
        <X size={14} />
      </button>
    </div>
  );
}
