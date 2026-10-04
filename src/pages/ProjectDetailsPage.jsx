import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, Tag, CheckCircle, Send } from 'lucide-react';
import Button from '../components/Button';
import SkillBadge from '../components/SkillBadge';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { projectService } from '../services/projectService';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast, toasts, removeToast } = useToast();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    projectService.getById(id).then(result => {
      if (result.success) setProject(result.data);
      setLoading(false);
    });
  }, [id]);

  const handleRequest = async () => {
    setSending(true);
    await projectService.requestToJoin(id, message);
    setSending(false);
    setModalOpen(false);
    setRequested(true);
    toast.success('Join request sent successfully!');
  };

  const statusVariant = { Recruiting: 'green', 'In Progress': 'blue', Completed: 'default' };

  if (loading) return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
      </div>
    </div>
  );

  if (!project) return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-center space-y-4">
      <p className="text-slate-600 dark:text-slate-400">Project not found.</p>
      <Button variant="outline" onClick={() => navigate('/projects')}>Back to Projects</Button>
    </div>
  );

  const slotsLeft = project.teamSize - project.currentMembers.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Toast toasts={toasts} removeToast={removeToast} />

      <button
        onClick={() => navigate('/projects')}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-[#1b2238] text-xs sm:text-sm font-semibold transition-colors"
      >
        <ArrowLeft size={16} /> Back to Projects
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant={statusVariant[project.status] || 'default'} className="mb-2">
                  {project.status}
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b2238] tracking-tight">
                  {project.title}
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">
                  Created by <strong className="text-[#1b2238] font-bold">{project.ownerName}</strong>
                </p>
              </div>
              {project.matchScore && (
                <div className="shrink-0 text-center bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
                  <div className="text-2xl font-black text-emerald-700">
                    {project.matchScore}%
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Match Fit</div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Tag size={13} className="text-indigo-600 dark:text-indigo-400" />
              <span>{project.category}</span>
              <span className="mx-1">•</span>
              <span>{project.department}</span>
            </div>

            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-normal">{project.description}</p>
          </div>

          {/* Required Skills */}
          <div className="card space-y-3">
            <h2 className="font-bold text-[#1b2238] text-base">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {project.requiredSkills.map(skill => <SkillBadge key={skill} skill={skill} />)}
            </div>
          </div>

          {/* Current Team */}
          <div className="card space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[#1b2238] text-base">Current Team Members</h2>
              <span className="text-xs font-bold text-slate-500">
                {project.currentMembers.length} / {project.teamSize} filled
              </span>
            </div>
            <div className="space-y-2.5">
              {project.currentMembers.map(member => (
                <div key={member.id} className="flex items-center gap-3 p-3 bg-[#f8f6f0] rounded-xl border border-[#e8e2d5]">
                  <div className="w-9 h-9 rounded-xl bg-[#1b2238] flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1b2238]">{member.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                  </div>
                  {member.id === project.ownerId && (
                    <span className="ml-auto text-[11px] font-bold bg-[#1b2238] text-white px-2.5 py-0.5 rounded-full">
                      Lead
                    </span>
                  )}
                </div>
              ))}
            </div>
            {slotsLeft > 0 && (
              <p className="text-xs font-bold text-amber-700 mt-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {slotsLeft} position{slotsLeft > 1 ? 's' : ''} currently recruiting
              </p>
            )}
          </div>

          {slotsLeft > 0 && !requested && (
            <button
              className="btn-primary w-full text-sm font-bold py-3"
              onClick={() => setModalOpen(true)}
            >
              <Send size={16} />
              <span>Request to Join Project</span>
            </button>
          )}
          {requested && (
            <div className="flex items-center justify-center gap-2 p-4 bg-emerald-50 rounded-xl text-emerald-800 font-bold border border-emerald-200">
              <CheckCircle size={18} /> Request Dispatched to Team Lead!
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card space-y-3.5">
            <h3 className="font-bold text-[#1b2238] text-xs uppercase tracking-wider">
              Project Specification
            </h3>
            <div className="space-y-3 text-xs sm:text-sm font-medium">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Users size={14} /> Team Target</span>
                <span className="font-bold text-[#1b2238]">{project.currentMembers.length} / {project.teamSize}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Calendar size={14} /> Initiated</span>
                <span className="font-bold text-[#1b2238]">{new Date(project.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Recruitment</span>
                <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Domain</span>
                <span className="font-bold text-[#1b2238] text-right">{project.category}</span>
              </div>
            </div>
          </div>

          {project.progress > 0 && (
            <div className="card space-y-2">
              <h3 className="font-bold text-[#1b2238] text-xs uppercase tracking-wider">
                Milestone Velocity
              </h3>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Completion</span>
                <span className="font-black text-emerald-700">{project.progress}%</span>
              </div>
              <div className="w-full bg-[#f8f6f0] border border-[#e8e2d5] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Join Request Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Join Application">
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            Send an application to join <strong className="text-brand-navy">{project.title}</strong>. Introduce your background and what you can contribute.
          </p>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
              Application Note (optional)
            </label>
            <textarea
              className="input-field resize-none h-28 text-sm"
              placeholder="Explain how your stack aligns with the project requirements..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1 font-bold" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" className="flex-1 font-bold" loading={sending} onClick={handleRequest}>Send Application</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
