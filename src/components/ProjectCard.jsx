import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Tag, TrendingUp, ArrowUpRight } from 'lucide-react';
import SkillBadge from './SkillBadge';
import Badge from './Badge';
import Button from './Button';

export default function ProjectCard({ project, className = '' }) {
  const navigate = useNavigate();

  const statusVariant = {
    Recruiting: 'green',
    'In Progress': 'blue',
    Completed: 'default',
  };

  const slotsLeft = project.teamSize - project.currentMembers.length;

  return (
    <div
      className={`card hover:shadow-2xl hover:translate-y-[-2px] transition-all cursor-pointer group flex flex-col justify-between ${className}`}
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <h3 className="font-bold text-brand-navy group-hover:text-[#b46b2b] dark:group-hover:text-[#f2cb9b] transition-colors leading-snug text-sm sm:text-base">
            {project.title}
          </h3>
          <Badge variant={statusVariant[project.status] || 'default'} className="shrink-0">
            {project.status}
          </Badge>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mb-3.5 line-clamp-2 leading-relaxed font-normal">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {project.requiredSkills.slice(0, 4).map(skill => (
            <SkillBadge key={skill} skill={skill} size="xs" />
          ))}
          {project.requiredSkills.length > 4 && (
            <span className="text-xs text-slate-500 dark:text-slate-400 self-center font-semibold">+{project.requiredSkills.length - 4}</span>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 font-medium">
          <div className="flex items-center gap-1.5">
            <Users size={13} className="text-[#b46b2b] dark:text-[#f2cb9b]" />
            <span>{project.currentMembers.length}/{project.teamSize} members</span>
            {slotsLeft > 0 && <span className="text-[#b46b2b] dark:text-[#f2cb9b] font-bold">· {slotsLeft} open</span>}
          </div>
          <div className="flex items-center gap-1">
            <Tag size={12} />
            <span className="truncate max-w-[110px]">{project.category}</span>
          </div>
        </div>

        {project.matchScore && (
          <div className="flex items-center justify-between mb-3.5 bg-[#fdf5eb] dark:bg-[#35291f]/60 p-2.5 rounded-xl border border-[#f2cb9b]/70 dark:border-[#523d2b]">
            <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">Your Skill Match</span>
            <div className="flex items-center gap-1.5">
              <TrendingUp size={13} className="text-emerald-600 dark:text-emerald-400" />
              <span className={`text-xs font-black ${
                project.matchScore >= 85 ? 'text-emerald-600 dark:text-emerald-400' :
                project.matchScore >= 70 ? 'text-[#b46b2b] dark:text-[#f2cb9b]' : 'text-slate-500'
              }`}>
                {project.matchScore}%
              </span>
            </div>
          </div>
        )}

        <div onClick={e => e.stopPropagation()}>
          <Button
            variant="secondary"
            size="sm"
            className="w-full text-xs font-semibold justify-between group-hover:border-[#b46b2b]"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <span>View Project</span>
            <ArrowUpRight size={14} className="text-[#b46b2b] dark:text-[#f2cb9b]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
