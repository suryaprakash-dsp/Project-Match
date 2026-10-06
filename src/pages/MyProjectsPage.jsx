import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  ArrowUpRight,
  FolderKanban,
  Tag,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import SkillBadge from '../components/SkillBadge';
import EmptyState from '../components/EmptyState';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import PostProjectModal from '../components/PostProjectModal';
import { projectService } from '../services/projectService';

const tabs = ['All', 'Created'];

export default function MyProjectsPage() {
  const navigate = useNavigate();
  const { toast, toasts, removeToast } = useToast();

  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 6,
    totalProjects: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  // Fetch projects from backend API: GET /api/projects/getAllProjects?type=my
  const fetchMyProjects = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');

    const res = await projectService.getAll({
      type: 'my',
      page,
      limit: itemsPerPage,
    });

    if (res.success) {
      setProjects(res.projects || []);
      setPagination(res.pagination || {
        currentPage: page,
        limit: itemsPerPage,
        totalProjects: (res.projects || []).length,
        totalPages: 1,
      });
    } else {
      if (res.status === 401) {
        setError('Authentication required. Please sign in to view your projects.');
      } else {
        setError(res.error || 'Failed to load your projects.');
      }
      setProjects([]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMyProjects(currentPage);
  }, [fetchMyProjects, currentPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleProjectCreated = (newProject) => {
    toast.success(`Project "${newProject.title}" posted successfully!`);
    fetchMyProjects(1);
  };

  const statusVariant = { Recruiting: 'green', 'In Progress': 'blue', Completed: 'default' };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Post Project Modal */}
      <PostProjectModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onProjectCreated={handleProjectCreated}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>PORTFOLIO WORKSPACE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
            My Projects
          </h1>
          <p className="text-brand-muted text-xs sm:text-sm mt-0.5 font-normal">
            Manage your created capstone projects and recruit verified teammates across campus.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPostModal(true)}
            className="btn-primary text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus size={16} />
            <span>Create Project</span>
          </button>
          <button
            onClick={() => navigate('/projects')}
            className="px-4 py-2.5 rounded-xl border border-surface-border bg-surface hover:bg-surface-subtle text-brand-navy text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <span>Explore Projects</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 p-1 bg-white dark:bg-surface border border-surface-border rounded-xl w-fit shadow-xs">
        {tabs.map(tab => (
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
          </button>
        ))}
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
          {error.includes('Authentication') && (
            <Button size="xs" variant="primary" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          )}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="card p-6 animate-pulse space-y-3">
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
                <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects List or Empty State */}
      {!loading && projects.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No projects created yet"
          description="You haven't posted any projects. Create a new capstone project to start recruiting team members."
          action={
            <div className="flex gap-2 justify-center">
              <Button variant="primary" onClick={() => setShowPostModal(true)}>
                <Plus size={16} /> Post a Project
              </Button>
              <Button variant="secondary" onClick={() => navigate('/projects')}>
                Explore Available Projects
              </Button>
            </div>
          }
        />
      ) : !loading && (
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id} className="card hover:shadow-xl transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-brand-navy text-lg">{project.title}</h3>
                    <Badge variant={statusVariant[project.status] || 'green'}>{project.status}</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-slate mb-3 font-medium">
                    Your Role: <strong className="text-brand-navy">Project Lead</strong>
                    <span className="mx-2">•</span>
                    <span>Category: <strong>{project.category}</strong></span>
                    <span className="mx-2">•</span>
                    <span>Open Vacancies: <strong>{project.openVacancies}</strong></span>
                  </p>

                  {project.description && (
                    <p className="text-xs text-brand-muted line-clamp-2 mb-3">
                      {project.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.requiredSkills.map(s => (
                      <SkillBadge key={s} skill={s} size="xs" />
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold text-brand-muted">
                    <span className="flex items-center gap-1.5">
                      <Users size={14} className="text-[#b46b2b]" />
                      <span>{project.slots}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={14} /> Created by you
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col sm:items-end justify-between gap-3 pt-2 sm:pt-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full sm:w-auto font-bold justify-center cursor-pointer"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <span>Open Project</span>
                    <ArrowUpRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-surface-border text-xs text-brand-muted font-medium">
              <span>
                Showing <strong className="text-brand-navy font-bold">{projects.length}</strong> of{' '}
                <strong className="text-brand-navy font-bold">{pagination.totalProjects}</strong> project(s)
              </span>
              <div className="flex items-center gap-1 font-semibold">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-surface-border bg-surface text-brand-slate disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle cursor-pointer transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
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
                  disabled={currentPage === pagination.totalPages}
                  onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-surface-border bg-surface text-brand-slate disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle cursor-pointer transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
