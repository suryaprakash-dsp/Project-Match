import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, GitBranch, Globe, MapPin, BookOpen, Mail, UserPlus, Check } from 'lucide-react';
import Button from '../components/Button';
import SkillBadge from '../components/SkillBadge';
import Badge from '../components/Badge';
import MatchScore from '../components/MatchScore';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { userService } from '../services/userService';
import { currentUser, mockUsers } from '../data/mockUsers';
import { mockProjects } from '../data/mockProjects';
import { getMatchReasons, calculateMatchScore } from '../utils/matchScore';

export default function StudentProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast, toasts, removeToast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const isOwnProfile = !id;

  useEffect(() => {
    if (isOwnProfile) {
      setUser(currentUser);
      setLoading(false);
    } else {
      userService.getById(id).then(result => {
        if (result.success) setUser(result.data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleConnect = async () => {
    await userService.connect(user.id);
    setConnected(true);
    toast.success(`Connection request dispatched to ${user.name}!`);
  };

  const userProjects = mockProjects.filter(p =>
    p.currentMembers.some(m => m.id === (user?.id ?? 0))
  );

  const yearLabel = (y) => {
    const map = { 1: '1st Year', 2: '2nd Year', 3: '3rd Year', 4: '4th Year' };
    return map[y] || `${y}th Year`;
  };

  if (loading) return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
    </div>
  );

  if (!user) return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-center">
      <p className="text-slate-600 dark:text-slate-400">Student not found.</p>
    </div>
  );

  const score = isOwnProfile ? 100 : calculateMatchScore(currentUser, user);
  const reasons = isOwnProfile ? [] : getMatchReasons(currentUser, user);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Toast toasts={toasts} removeToast={removeToast} />
      
      {!isOwnProfile && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs sm:text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={16} /> Back to Directory
        </button>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card text-center space-y-3">
            <div className="w-20 h-20 rounded-2xl bg-[#b46b2b] flex items-center justify-center mx-auto shadow-md">
              <span className="text-white text-3xl font-extrabold">{user.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-brand-navy">{user.name}</h1>
              <p className="text-xs sm:text-sm text-brand-slate font-semibold mt-0.5">{user.role}</p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-brand-muted font-medium mt-1">
                <MapPin size={12} className="text-[#b46b2b]" />
                <span>{user.department} • {yearLabel(user.year)}</span>
              </div>
            </div>

            <div className="flex justify-center">
              <Badge variant={user.availability === 'Available' ? 'green' : 'yellow'}>
                {user.availability}
              </Badge>
            </div>

            {!isOwnProfile ? (
              <div className="pt-2 space-y-2">
                <button
                  className={`w-full text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 ${
                    connected
                      ? 'bg-emerald-600 text-white'
                      : 'btn-primary'
                  }`}
                  onClick={handleConnect}
                  disabled={connected}
                >
                  {connected ? <Check size={14} /> : <UserPlus size={14} />}
                  <span>{connected ? 'Connected' : 'Connect / Invite'}</span>
                </button>
                <button
                  onClick={() => toast.info(`Direct message initiated with ${user.name}`)}
                  className="btn-secondary w-full text-xs font-semibold py-2.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail size={14} />
                  <span>Send Message</span>
                </button>
              </div>
            ) : (
              <button className="btn-outline w-full text-xs font-semibold py-2.5 mt-2 cursor-pointer" onClick={() => navigate('/settings')}>
                Edit Profile
              </button>
            )}
          </div>

          {!isOwnProfile && (
            <div className="card">
              <MatchScore score={score} reasons={reasons} size="lg" showReasons />
            </div>
          )}

          {/* External Links */}
          {(user.github || user.portfolio) && (
            <div className="card space-y-2.5">
              <h3 className="font-bold text-brand-navy text-xs uppercase tracking-wider">
                Profiles & Repos
              </h3>
              {user.github && (
                <a href={user.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#1b2238] transition-colors">
                  <GitBranch size={15} className="text-[#1b2238]" /> GitHub Repository
                </a>
              )}
              {user.portfolio && (
                <a href={user.portfolio} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#1b2238] transition-colors">
                  <Globe size={15} className="text-[#1b2238]" /> Personal Portfolio
                </a>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* About */}
          <div className="card space-y-2">
            <h2 className="font-bold text-[#1b2238] text-base">About</h2>
            <p className="text-slate-700 text-sm leading-relaxed font-normal">{user.bio}</p>
          </div>

          {/* Skills */}
          <div className="card space-y-3">
            <h2 className="font-bold text-[#1b2238] text-base">Verified Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map(skill => <SkillBadge key={skill} skill={skill} />)}
            </div>
          </div>

          {/* Interests */}
          {user.interests?.length > 0 && (
            <div className="card space-y-3">
              <h2 className="font-bold text-brand-navy text-base flex items-center gap-2">
                <BookOpen size={16} className="text-[#b46b2b]" />
                <span>Interests & Project Preferences</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.interests.map(interest => (
                  <span key={interest} className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#f8f6f0] dark:bg-[#302821] border border-[#e8e2d5] dark:border-[#42372e] text-[#4a3e35] dark:text-[#dfd4c5]">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Current & Past Projects */}
          {userProjects.length > 0 && (
            <div className="card space-y-3">
              <h2 className="font-bold text-brand-navy text-base">Projects Involved</h2>
              <div className="space-y-2.5">
                {userProjects.map(project => (
                  <div
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy">{project.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{project.category}</p>
                    </div>
                    <Badge variant={project.status === 'Recruiting' ? 'green' : project.status === 'In Progress' ? 'blue' : 'default'}>
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
