import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, CheckCircle2, Clock, Plus, ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import SkillBadge from '../components/SkillBadge';
import EmptyState from '../components/EmptyState';
import { mockProjects } from '../data/mockProjects';
import { currentUser } from '../data/mockUsers';

const tabs = ['All', 'Created', 'Joined', 'Completed'];

export default function MyProjectsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const myProjects = mockProjects.filter(p =>
    p.currentMembers.some(m => m.id === currentUser.id)
  );

  const createdProjects = myProjects.filter(p => p.ownerId === currentUser.id);
  const joinedProjects = myProjects.filter(p => p.ownerId !== currentUser.id && p.status !== 'Completed');
  const completedProjects = myProjects.filter(p => p.status === 'Completed');

  const getFiltered = () => {
    if (activeTab === 'Created') return createdProjects;
    if (activeTab === 'Joined') return joinedProjects;
    if (activeTab === 'Completed') return completedProjects;
    return myProjects;
  };

  const filtered = getFiltered();

  const getRole = (project) => {
    const member = project.currentMembers.find(m => m.id === currentUser.id);
    return member?.role || 'Member';
  };

  const statusVariant = { Recruiting: 'green', 'In Progress': 'blue', Completed: 'default' };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>PORTFOLIO WORKSPACE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b2238] tracking-tight">
            My Projects
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5 font-normal">
            Manage your created and joined projects, track squad progress, and review deliverables.
          </p>
        </div>
        <button
          onClick={() => navigate('/projects')}
          className="btn-primary text-xs sm:text-sm flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Explore Projects</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 p-1 bg-white dark:bg-surface border border-[#e8e2d5] dark:border-surface-border rounded-xl w-fit shadow-xs">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-sky-500 text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={`No ${activeTab.toLowerCase()} projects found`}
          description="Explore active projects or form a team with matching students."
          action={<Button variant="primary" onClick={() => navigate('/projects')}>Explore Projects</Button>}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map(project => (
            <div key={project.id} className="card hover:shadow-xl transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-brand-navy text-lg">{project.title}</h3>
                    <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3 font-medium">
                    Your Role: <strong className="text-brand-navy">{getRole(project)}</strong>
                    <span className="mx-2">•</span>
                    {project.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.requiredSkills.slice(0, 4).map(s => <SkillBadge key={s} skill={s} size="xs" />)}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Users size={14} className="text-indigo-600 dark:text-indigo-400" />
                      <span>{project.currentMembers.length} / {project.teamSize} members</span>
                    </span>
                    {project.status === 'In Progress' && (
                      <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                        <Clock size={14} /> In Progress
                      </span>
                    )}
                    {project.status === 'Completed' && (
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={14} /> Completed
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col sm:items-end justify-between gap-3 pt-2 sm:pt-0">
                  <div className="sm:text-right w-full sm:w-36">
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                      <span>Progress</span>
                      <span className="font-black text-indigo-600 dark:text-indigo-400">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full sm:w-auto font-bold justify-center"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <span>Open Project</span>
                    <ArrowUpRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
