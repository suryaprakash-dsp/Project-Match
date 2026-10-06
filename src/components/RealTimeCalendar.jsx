import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle2,
  AlertCircle,
  Video,
  Users,
  Sparkles,
  X
} from 'lucide-react';

const INITIAL_EVENTS = [
  {
    id: 1,
    day: 1, // Today
    month: 9, // Oct (0-indexed: 9)
    year: 2026,
    time: '03:30 PM',
    title: 'Capstone Architecture Review',
    location: 'Lab 402 / Google Meet',
    type: 'review',
    badge: 'Mandatory',
    badgeColor: 'bg-[#fdf5eb] text-[#9c5921] border-[#f2cb9b] dark:bg-[#35291f] dark:text-[#f2cb9b] dark:border-[#523d2b]'
  },
  {
    id: 2,
    day: 3,
    month: 9,
    year: 2026,
    time: '11:00 AM',
    title: 'AI Study Assistant Teammate Sync',
    location: 'Discord Voice Channel',
    type: 'team',
    badge: 'Team Sync',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800'
  },
  {
    id: 3,
    day: 7,
    month: 9,
    year: 2026,
    time: '05:00 PM',
    title: 'Inter-Collegiate Hackathon Registration',
    location: 'Campus Portal Deadline',
    type: 'deadline',
    badge: 'Deadline',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800'
  },
  {
    id: 4,
    day: 14,
    month: 9,
    year: 2026,
    time: '02:00 PM',
    title: 'Waste Segregation Mid-Demo to Faculty',
    location: 'Seminar Hall B',
    type: 'milestone',
    badge: 'Evaluation',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800'
  },
  {
    id: 5,
    day: 22,
    month: 9,
    year: 2026,
    time: '06:00 PM',
    title: 'Sprint 2 Frontend PR Freeze',
    location: 'GitHub Repo Milestone',
    type: 'deadline',
    badge: 'Code Freeze',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800'
  },
];

export default function RealTimeCalendar({ className = '' }) {
  // Real-time clock state
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Calendar navigation state
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('04:00 PM');
  const [newEventType, setNewEventType] = useState('team');

  // Real-time tick every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date();
  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Days in current viewed month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleGoToday = () => {
    const now = new Date();
    setViewDate(now);
    setSelectedDate(now.getDate());
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEv = {
      id: Date.now(),
      day: selectedDate,
      month: currentMonth,
      year: currentYear,
      time: newEventTime,
      title: newEventTitle.trim(),
      location: 'Student Project Lab',
      type: newEventType,
      badge: newEventType === 'team' ? 'Team Sync' : 'Milestone',
      badgeColor: 'bg-[#fdf5eb] text-[#9c5921] border-[#f2cb9b] dark:bg-[#35291f] dark:text-[#f2cb9b] dark:border-[#523d2b]'
    };

    setEvents(prev => [...prev, newEv]);
    setNewEventTitle('');
    setShowAddModal(false);
  };

  // Filter events for the currently selected date
  const selectedDayEvents = events.filter(
    ev => ev.day === selectedDate && ev.month === currentMonth && ev.year === currentYear
  );

  return (
    <div className={`p-5 rounded-2xl bg-surface border border-surface-border shadow-xs flex flex-col gap-5 ${className}`}>
      
      {/* Real-time Header & Live Clock */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-surface-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#fdf5eb] dark:bg-[#35291f] text-[#b46b2b] dark:text-[#f2cb9b] border border-[#f2cb9b]/60 dark:border-[#523d2b] flex items-center justify-center shrink-0">
            <CalendarIcon size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-brand-navy">Campus Timeline</h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fdf5eb] text-[#9c5921] dark:bg-[#35291f] dark:text-[#f2cb9b] border border-[#f2cb9b] dark:border-[#523d2b]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b46b2b] animate-ping" />
                <span>LIVE SYNC</span>
              </span>
            </div>
            <p className="text-[11px] text-brand-muted">
              {currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Live Digital Clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-subtle border border-surface-border text-xs font-mono font-bold text-brand-navy shrink-0">
          <Clock size={14} className="text-[#b46b2b]" />
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>
      </div>

      {/* Month Navigation & Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-bold text-brand-navy">
            {monthNames[currentMonth]} {currentYear}
          </h4>
          <button
            onClick={handleGoToday}
            className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#fdf5eb] hover:bg-[#f5e6d3] dark:bg-[#35291f] dark:hover:bg-[#433428] text-[#9c5921] dark:text-[#f2cb9b] border border-[#f2cb9b] dark:border-[#523d2b] transition-colors"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg hover:bg-surface-subtle text-brand-muted hover:text-brand-navy transition-colors"
            title="Previous Month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg hover:bg-surface-subtle text-brand-muted hover:text-brand-navy transition-colors"
            title="Next Month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Interactive Monthly Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {dayNames.map(d => (
          <div key={d} className="text-[11px] font-bold text-brand-muted py-1">
            {d}
          </div>
        ))}

        {/* Empty slots before first day of month */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8 w-8 mx-auto" />
        ))}

        {/* Month Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const isToday =
            today.getDate() === dayNum &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;
          const isSelected = selectedDate === dayNum;

          // Check if this day has events
          const dayEvents = events.filter(
            ev => ev.day === dayNum && ev.month === currentMonth && ev.year === currentYear
          );
          const hasEvent = dayEvents.length > 0;

          return (
            <button
              key={dayNum}
              onClick={() => setSelectedDate(dayNum)}
              className={`h-8 w-8 mx-auto rounded-lg text-xs font-semibold flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#b46b2b] text-white shadow-xs font-bold'
                  : isToday
                  ? 'border-2 border-[#b46b2b] text-[#b46b2b] dark:text-[#f2cb9b] font-bold bg-[#fdf5eb]/60 dark:bg-[#35291f]/40'
                  : 'text-brand-navy hover:bg-surface-subtle'
              }`}
            >
              <span>{dayNum}</span>
              {hasEvent && (
                <span
                  className={`w-1 h-1 rounded-full absolute bottom-1 ${
                    isSelected ? 'bg-white' : 'bg-[#b46b2b]'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Agenda & Events */}
      <div className="pt-2 border-t border-surface-border flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy">
            <span>Schedule for {monthNames[currentMonth]} {selectedDate}</span>
            <span className="text-brand-muted font-normal">({selectedDayEvents.length} events)</span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-2.5 py-1 rounded-lg bg-[#fdf5eb] hover:bg-[#f5e6d3] dark:bg-[#35291f] dark:hover:bg-[#433428] text-[#9c5921] dark:text-[#f2cb9b] border border-[#f2cb9b] dark:border-[#523d2b] text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Plus size={13} />
            <span>Add Event</span>
          </button>
        </div>

        {selectedDayEvents.length === 0 ? (
          <div className="p-3.5 rounded-xl bg-surface-subtle text-center text-xs text-brand-muted border border-surface-border/60">
            No scheduled meetings or deadlines for this date.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {selectedDayEvents.map(ev => (
              <div
                key={ev.id}
                className="p-3 rounded-xl bg-surface-subtle border border-surface-border flex items-start justify-between gap-3 hover:border-[#f2cb9b] dark:hover:border-[#523d2b] transition-colors"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white dark:bg-surface border border-surface-border text-[#b46b2b] dark:text-[#f2cb9b] flex items-center justify-center shrink-0 mt-0.5">
                    {ev.type === 'team' ? <Users size={14} /> : <Sparkles size={14} />}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-brand-navy truncate leading-tight">
                      {ev.title}
                    </span>
                    <span className="text-[11px] text-brand-muted truncate mt-0.5">
                      {ev.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span className="text-[11px] font-mono font-bold text-brand-navy">
                    {ev.time}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${ev.badgeColor}`}>
                    {ev.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Add Event Inline Modal */}
      {showAddModal && (
        <form
          onSubmit={handleAddEvent}
          className="p-3.5 rounded-xl bg-[#fdf5eb]/90 dark:bg-[#35291f]/50 border border-[#f2cb9b] dark:border-[#523d2b] flex flex-col gap-2.5 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-navy">
              New Event for {monthNames[currentMonth]} {selectedDate}
            </span>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X size={14} />
            </button>
          </div>

          <input
            type="text"
            placeholder="e.g. Frontend Wireframing Review"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-surface border border-surface-border text-xs text-brand-navy focus:outline-none focus:border-[#b46b2b]"
            autoFocus
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="04:00 PM"
              value={newEventTime}
              onChange={(e) => setNewEventTime(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-surface border border-surface-border text-xs text-brand-navy focus:outline-none focus:border-[#b46b2b]"
            />
            <select
              value={newEventType}
              onChange={(e) => setNewEventType(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-surface border border-surface-border text-xs text-brand-navy focus:outline-none focus:border-[#b46b2b]"
            >
              <option value="team">Team Sync</option>
              <option value="review">Milestone</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-2.5 py-1 text-xs text-brand-muted hover:text-brand-navy font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded-lg bg-[#b46b2b] hover:bg-[#9c5921] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Save Event
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
