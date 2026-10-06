import React, { useState } from 'react';
import { Plus, X, Sparkles, FolderPlus, Check, AlertCircle } from 'lucide-react';
import { projectService } from '../services/projectService';

export default function PostProjectModal({ isOpen, onClose, onProjectCreated }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [description, setDescription] = useState('');
  const [openSlots, setOpenSlots] = useState('3');
  const [skills, setSkills] = useState(['React', 'Node.js', 'MongoDB', 'Express']);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError('');
    setLoading(true);

    const vacanciesNum = parseInt(openSlots.toString().replace(/\D/g, '')) || 3;

    // Call real backend API: POST http://localhost:5000/api/projects/createProject
    const result = await projectService.create({
      project_Title: title.trim(),
      category: category.trim(),
      open_vacancies: vacanciesNum,
      project_description: description.trim(),
      required_skills: skills,
    });

    setLoading(false);

    if (result.success) {
      onProjectCreated(result.data);
      onClose();
    } else {
      // If error (e.g., token missing / unauthenticated or network error)
      setError(result.error || 'Failed to create project on backend.');
      // Also pass project to parent so user's frontend view is not blocked if offline
      if (result.status === 401) {
        setError('Please sign in to authenticate with the backend, or check your token.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1e1c19] rounded-2xl border border-surface-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-subtle/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#b46b2b]/15 flex items-center justify-center text-[#b46b2b]">
              <FolderPlus size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-navy">Post a New Capstone Project</h3>
              <p className="text-xs text-brand-muted">Publishes to backend /api/projects/createProject</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-surface transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-4 text-sm">
          <div>
            <label className="text-xs font-bold text-brand-navy block mb-1">Project Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. MERN Developer Project"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-surface border border-surface-border text-brand-navy placeholder:text-brand-muted/70 text-sm focus:outline-none focus:border-[#b46b2b]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-brand-navy block mb-1">Category *</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-surface border border-surface-border text-brand-navy text-xs focus:outline-none focus:border-[#b46b2b]"
              >
                <option>Web Development</option>
                <option>AI & Machine Learning</option>
                <option>Smart Education</option>
                <option>Campus Sustainability</option>
                <option>Healthcare Tech</option>
                <option>Cybersecurity & Defense</option>
                <option>IoT & Smart Systems</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-brand-navy block mb-1">Open Vacancies *</label>
              <select
                value={openSlots}
                onChange={e => setOpenSlots(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-surface border border-surface-border text-brand-navy text-xs focus:outline-none focus:border-[#b46b2b]"
              >
                <option value="1">1 vacancy</option>
                <option value="2">2 vacancies</option>
                <option value="3">3 vacancies</option>
                <option value="4">4 vacancies</option>
                <option value="5">5+ vacancies</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-brand-navy block mb-1">Project Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Looking for developers to build a MERN application..."
              className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-surface border border-surface-border text-brand-navy placeholder:text-brand-muted/70 text-xs focus:outline-none focus:border-[#b46b2b] resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-brand-navy block mb-1">Required Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. React, Node.js)..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-surface border border-surface-border text-xs focus:outline-none focus:border-[#b46b2b]"
                onKeyDown={e => e.key === 'Enter' && handleAddSkill(e)}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 rounded-lg bg-[#b46b2b] text-white text-xs font-bold cursor-pointer"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-md bg-[#b46b2b]/10 text-[#9c5921] dark:text-[#f2cb9b] border border-[#b46b2b]/20 text-xs font-medium flex items-center gap-1.5"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="text-[#9c5921] hover:text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-surface-border">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl border border-surface-border bg-surface text-brand-navy text-xs font-semibold hover:bg-surface-subtle cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check size={14} />
              )}
              {loading ? 'Creating...' : 'Publish Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
