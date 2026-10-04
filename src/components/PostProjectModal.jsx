import React, { useState } from 'react';
import { Plus, X, Sparkles, FolderPlus, Check } from 'lucide-react';

export default function PostProjectModal({ isOpen, onClose, onProjectCreated }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI & Web Systems');
  const [description, setDescription] = useState('');
  const [openSlots, setOpenSlots] = useState('2 slots open');
  const [skills, setSkills] = useState(['React', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProject = {
      id: Date.now(),
      title,
      category,
      description: description || 'New collaborative academic capstone project.',
      slots: openSlots,
      skills,
      matchScore: 92,
      owner: 'Current User',
      dept: 'CSE 3rd Year',
      avatar: 'CU',
      urgent: false,
      isTop: false,
    };

    onProjectCreated(newProject);
    onClose();
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
              <p className="text-xs text-brand-muted">Recruit verified teammates across campus</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-surface transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-4 text-sm">
          <div>
            <label className="text-xs font-bold text-brand-navy block mb-1">Project Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Autonomous Campus Delivery Rover"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-surface border border-surface-border text-brand-navy placeholder:text-brand-muted/70 text-sm focus:outline-none focus:border-[#b46b2b]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-brand-navy block mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-surface border border-surface-border text-brand-navy text-xs focus:outline-none focus:border-[#b46b2b]"
              >
                <option>AI & Web Systems</option>
                <option>Campus Sustainability</option>
                <option>Spatial Computing & UI</option>
                <option>Biomedical IoT</option>
                <option>Cybersecurity & Defense</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-brand-navy block mb-1">Open Vacancies</label>
              <select
                value={openSlots}
                onChange={e => setOpenSlots(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-surface border border-surface-border text-brand-navy text-xs focus:outline-none focus:border-[#b46b2b]"
              >
                <option>1 slot open</option>
                <option>2 slots open</option>
                <option>3 slots open</option>
                <option>4+ slots open</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-brand-navy block mb-1">Project Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Outline project objectives, tech stack, milestones, and required weekly hours..."
              className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-surface border border-surface-border text-brand-navy placeholder:text-brand-muted/70 text-xs focus:outline-none focus:border-[#b46b2b] resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-brand-navy block mb-1">Required Competencies & Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. PyTorch, Docker)..."
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
              className="px-4 py-2 rounded-xl border border-surface-border bg-surface text-brand-navy text-xs font-semibold hover:bg-surface-subtle cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <Check size={14} />
              Publish Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
