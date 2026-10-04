import React, { useState, useRef, useEffect } from 'react';
import { Bell, Circle } from 'lucide-react';
import { mockNotifications } from '../data/mockNotifications';

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const ref = useRef(null);

  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const colorDot = { blue: 'text-indigo-500', green: 'text-emerald-500', yellow: 'text-amber-500' };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
        title="Notifications"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-80 card p-0 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-brand-navy text-xs uppercase tracking-wider">Notifications</h3>
            {unread > 0 && (
              <button onClick={markAllRead} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold">
                Mark all read
              </button>
            )}
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-80 overflow-y-auto">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                  !n.read ? 'bg-indigo-50/50 dark:bg-indigo-950/30' : ''
                }`}
                onClick={() => setNotifications(prev =>
                  prev.map(x => x.id === n.id ? { ...x, read: true } : x)
                )}
              >
                <div className="flex items-start gap-2.5">
                  <Circle size={8} className={`mt-1.5 shrink-0 fill-current ${colorDot[n.color] || 'text-slate-400'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm ${!n.read ? 'font-bold text-brand-navy' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                      {n.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{n.subtext}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-semibold">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
