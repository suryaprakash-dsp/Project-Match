import React, { useState, useEffect } from 'react';
import { Check, X, Clock, CheckCircle2, XCircle, Bell } from 'lucide-react';
import Button from '../components/Button';
import SkillBadge from '../components/SkillBadge';
import EmptyState from '../components/EmptyState';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { requestService } from '../services/requestService';

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState('Received');
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { toast, toasts, removeToast } = useToast();

  useEffect(() => {
    Promise.all([requestService.getReceived(), requestService.getSent()]).then(([r, s]) => {
      if (r.success) setReceived(r.data);
      if (s.success) setSent(s.data);
      setLoading(false);
    });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleRespond = async (requestId, action) => {
    await requestService.respond(requestId, action);
    setReceived(prev =>
      prev.map(r => r.id === requestId ? { ...r, status: action === 'accept' ? 'accepted' : 'rejected' } : r)
    );
    toast.success(`Request ${action === 'accept' ? 'accepted' : 'rejected'}!`);
  };

  const currentList = activeTab === 'Received' ? received : sent;
  const totalPages = Math.ceil(currentList.length / itemsPerPage) || 1;
  const paginatedList = currentList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusIcon = {
    pending: <Clock size={14} className="text-amber-600 dark:text-amber-400" />,
    accepted: <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />,
    rejected: <XCircle size={14} className="text-rose-600 dark:text-rose-400" />,
  };

  const statusText = {
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Declined',
  };

  const statusColor = {
    pending: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    accepted: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    rejected: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Toast toasts={toasts} removeToast={removeToast} />
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>TEAM RECRUITMENT</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
          Join Requests
        </h1>
        <p className="text-brand-muted text-xs sm:text-sm mt-0.5 font-normal">
          Manage incoming student join applications and monitor sent project inquiries.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 p-1 bg-white dark:bg-surface border border-surface-border rounded-xl w-fit shadow-xs">
        {['Received', 'Sent'].map(tab => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-[#b46b2b] text-white shadow-xs font-bold'
                : 'text-brand-slate hover:text-[#b46b2b] dark:hover:text-white'
            }`}
          >
            {tab}
            {tab === 'Received' && received.filter(r => r.status === 'pending').length > 0 && (
              <span className="ml-2 bg-emerald-600 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold">
                {received.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="card animate-pulse h-32" />
          ))}
        </div>
      ) : activeTab === 'Received' ? (
        received.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="No requests received"
            description="When students request to join your projects, they will appear here."
          />
        ) : (
          <div className="space-y-4">
            {paginatedList.map(req => (
              <div key={req.id} className="card space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#b46b2b] to-amber-500 text-white font-black flex items-center justify-center text-base shadow">
                      {req.fromUserName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-navy text-base">
                        {req.fromUserName}
                      </h3>
                      <p className="text-xs text-brand-muted font-medium">
                        {req.fromUserDept} • {req.fromUserRole}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                    statusColor[req.status]
                  }`}>
                    {statusIcon[req.status]}
                    <span>{statusText[req.status]}</span>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-subtle border border-surface-border">
                  <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-0.5">
                    Target Project
                  </p>
                  <p className="text-sm font-bold text-brand-navy">
                    {req.projectTitle}
                  </p>
                </div>

                {req.message && (
                  <p className="text-xs sm:text-sm text-brand-slate italic pl-3 border-l-2 border-[#b46b2b]">
                    "{req.message}"
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {req.fromUserSkills.map(s => <SkillBadge key={s} skill={s} size="xs" />)}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-surface-border">
                  <span className="text-xs text-brand-muted font-medium">{req.time}</span>
                  {req.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={X}
                        onClick={() => handleRespond(req.id, 'reject')}
                        className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 cursor-pointer"
                      >
                        Decline
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Check}
                        onClick={() => handleRespond(req.id, 'accept')}
                        className="cursor-pointer"
                      >
                        Accept Member
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            {currentList.length > itemsPerPage && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-surface-border text-xs text-brand-muted font-medium">
                <span>
                  Showing <strong className="text-brand-navy font-bold">{paginatedList.length}</strong> of{' '}
                  <strong className="text-brand-navy font-bold">{currentList.length}</strong> received requests
                </span>
                <div className="flex items-center gap-1 font-semibold">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg border border-surface-border bg-surface text-brand-slate disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle cursor-pointer transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-colors cursor-pointer ${
                        currentPage === page
                          ? 'bg-[#b46b2b] text-white shadow-xs'
                          : 'hover:bg-surface-subtle text-brand-slate'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="px-3 py-1.5 rounded-lg border border-surface-border bg-surface text-brand-slate disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle cursor-pointer transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        sent.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="No sent requests"
            description="When you apply to join other student projects, your inquiries will show here."
          />
        ) : (
          <div className="space-y-4">
            {paginatedList.map(req => (
              <div key={req.id} className="card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider mb-1">
                      You applied to join
                    </p>
                    <h3 className="font-bold text-brand-navy text-lg">
                      {req.toProjectTitle}
                    </h3>
                    <p className="text-xs text-brand-slate font-medium mt-0.5">
                      Project Lead: <strong className="text-brand-navy">{req.toOwnerName}</strong> • Applying as {req.role}
                    </p>
                    <p className="text-[11px] text-brand-muted mt-2 font-medium">Dispatched {req.time}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shrink-0 ${
                    statusColor[req.status]
                  }`}>
                    {statusIcon[req.status]}
                    <span>{statusText[req.status]}</span>
                  </span>
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            {currentList.length > itemsPerPage && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-surface-border text-xs text-brand-muted font-medium">
                <span>
                  Showing <strong className="text-brand-navy font-bold">{paginatedList.length}</strong> of{' '}
                  <strong className="text-brand-navy font-bold">{currentList.length}</strong> sent applications
                </span>
                <div className="flex items-center gap-1 font-semibold">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg border border-surface-border bg-surface text-brand-slate disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle cursor-pointer transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-colors cursor-pointer ${
                        currentPage === page
                          ? 'bg-[#b46b2b] text-white shadow-xs'
                          : 'hover:bg-surface-subtle text-brand-slate'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="px-3 py-1.5 rounded-lg border border-surface-border bg-surface text-brand-slate disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle cursor-pointer transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
