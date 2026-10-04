import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, BookOpen, UserPlus, Check, Sparkles } from 'lucide-react';
import SkillBadge from './SkillBadge';
import MatchScore from './MatchScore';
import Button from './Button';
import { getMatchReasons } from '../utils/matchScore';
import { currentUser } from '../data/mockUsers';
import { userService } from '../services/userService';

export default function StudentCard({ user, onConnect, className = '' }) {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const reasons = getMatchReasons(currentUser, user);

  const handleConnect = async (e) => {
    e.stopPropagation();
    setLoading(true);
    await userService.connect(user.id);
    setConnected(true);
    setLoading(false);
    onConnect?.(user);
  };

  const yearLabel = (y) => {
    const map = { 1: '1st Year', 2: '2nd Year', 3: '3rd Year', 4: '4th Year' };
    return map[y] || `${y}th Year`;
  };

  return (
    <div
      className={`card hover:shadow-2xl hover:translate-y-[-2px] transition-all cursor-pointer group flex flex-col justify-between ${className}`}
      onClick={() => navigate(`/profile/${user.id}`)}
    >
      <div>
        <div className="flex items-start gap-3 mb-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9c5921] via-[#b46b2b] to-[#e4a86b] flex items-center justify-center shrink-0 shadow-md">
            <span className="text-white font-extrabold text-lg">
              {user.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-brand-navy group-hover:text-[#b46b2b] dark:group-hover:text-[#f2cb9b] transition-colors truncate text-sm sm:text-base">
              {user.name}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
              <MapPin size={11} className="text-[#b46b2b] dark:text-[#f2cb9b]" />
              {user.department} · {yearLabel(user.year)}
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-0.5">
              {user.role}
            </p>
          </div>
          <span className={`shrink-0 text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
            user.availability === 'Available'
              ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800'
              : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-800'
          }`}>
            {user.availability}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {user.skills.slice(0, 4).map(skill => (
            <SkillBadge key={skill} skill={skill} size="xs" />
          ))}
          {user.skills.length > 4 && (
            <span className="text-xs text-slate-500 dark:text-slate-400 self-center font-semibold">+{user.skills.length - 4}</span>
          )}
        </div>

        {user.interests?.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3.5 text-slate-600 dark:text-slate-400 font-medium">
            <BookOpen size={12} className="text-[#b46b2b] dark:text-[#f2cb9b] shrink-0" />
            <p className="text-xs truncate">
              {user.interests.slice(0, 3).join(' · ')}
            </p>
          </div>
        )}
      </div>

      <div>
        <MatchScore score={user.matchScore} reasons={reasons} />

        <div className="flex gap-2 mt-4" onClick={e => e.stopPropagation()}>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => navigate(`/profile/${user.id}`)}
          >
            Profile
          </Button>
          <Button
            variant={connected ? 'success' : 'primary'}
            size="sm"
            className="flex-1 text-xs"
            loading={loading}
            icon={connected ? Check : UserPlus}
            onClick={handleConnect}
            disabled={connected}
          >
            {connected ? 'Connected' : 'Connect'}
          </Button>
        </div>
      </div>
    </div>
  );
}
