import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
 FolderKanban,
 Users,
 Search,
 Plus,
 Send,
 CheckCircle,
 Clock,
 Mail,
 Check,
 ChevronRight,
 Sparkles,
 Zap,
 FolderOpen,
 Inbox,
 Award,
 Calendar,
 Layers,
 FileCheck,
 UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import RealTimeCalendar from '../components/RealTimeCalendar';
import PeerQuizModal from '../components/PeerQuizModal';

export default function DashboardPage() {
 const { user } = useAuth();
 const navigate = useNavigate();
 const { toast, toasts, removeToast } = useToast();
 const [activeFilter, setActiveFilter] = useState('All');
 const [searchQuery, setSearchQuery] = useState('');
 const [connectedMap, setConnectedMap] = useState({});
 const [requestedMap, setRequestedMap] = useState({});
 const [showQuizModal, setShowQuizModal] = useState(false);
 const [devOpsReadiness, setDevOpsReadiness] = useState(45);

 const handleConnect = (name) => {
 setConnectedMap(prev => ({ ...prev, [name]: true }));
 toast.success(`Connection request dispatched to ${name}!`);
 };

 const handleRequestJoin = (projectTitle) => {
 setRequestedMap(prev => ({ ...prev, [projectTitle]: true }));
 toast.success(`Join application submitted for "${projectTitle}"!`);
 };

 const projects = [
 {
 id: 1,
 title: 'AI-Based Real-time Campus Waste Segregation System',
 category: 'Campus Sustainability',
 matchScore: 94,
 filled: '3 / 5 Filled',
 description: 'Automated multi-bin conveyor with edge inferencing via Jetson Nano. Looking for full-stack API integration and lightweight client UI for university canteen telemetry.',
 skills: ['Python', 'Computer Vision', 'React', 'FastAPI'],
 lead: 'Sanjay K.',
 dept: 'ECE',
 avatar: 'SK',
 image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
 },
 {
 id: 2,
 title: 'Smart Campus AR & Accessible Indoor Navigation',
 category: 'Spatial Computing & UI',
 matchScore: 88,
 filled: '2 / 4 Filled',
 description: 'Spatial WebGL and Three.js indoor mapping prototype aiding freshman and visually impaired peers navigating multistory campus labs and auditorium halls.',
 skills: ['React', 'Three.js', 'Node.js', 'WebGL'],
 lead: 'Aditi Mishra',
 dept: 'Design',
 avatar: 'AM',
 image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
 },
 {
 id: 3,
 title: 'Automated ICU Health Vitals Wearable & Alert Telemetry',
 category: 'Biomedical IoT',
 matchScore: 82,
 filled: '4 / 5 Filled',
 description: 'High-frequency SpO2 telemetry over low-power MQTT mesh. Backend broker needing WebSocket integration for hospital nurse station dashboards.',
 skills: ['C++', 'IoT Firmware', 'Node.js', 'MQTT'],
 lead: 'Vikram R.',
 dept: 'BioTech',
 avatar: 'VR',
 image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
 },
 ];

 return (
 <main className="max-w-[1340px] w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8">
 <Toast toasts={toasts} removeToast={removeToast} />

 {/* Top Header & Actions */}
 <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-surface-border/60">
 <div>
 <div className="flex items-center gap-2.5 mb-1.5">
 <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-surface border border-surface-border text-brand-muted text-xs font-semibold tracking-wide uppercase">
 Academic Term 2024–25
 </span>
 <span className="flex items-center gap-1.5 text-xs font-semibold text-accent-emerald">
 <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span>
 Campus Match Active
 </span>
 </div>
 <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight">
 Good morning, {user?.name?.split(' ')[0] || 'Surya'} 👋
 </h1>
 <p className="text-sm text-brand-muted mt-0.5">
 Find high-synergy collaborators, manage your active capstones, and build together.
 </p>
 </div>

 <div className="flex items-center gap-3">
 {/* Quick Search */}
 <div className="relative w-full sm:w-72">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={16} />
 <input
 className="w-full pl-9 pr-12 py-2 rounded-xl bg-white dark:bg-surface border border-surface-border text-brand-navy placeholder:text-brand-muted/70 text-sm focus:outline-none focus:border-[#b46b2b] transition-all shadow-xs"
 placeholder="Search teammates, skills, topics..."
 type="text"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 onKeyDown={(e) => {
 if (e.key === 'Enter' && searchQuery.trim()) {
 navigate(`/projects?q=${encodeURIComponent(searchQuery)}`);
 }
 }}
 />
 <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-surface-border bg-surface-subtle text-brand-muted text-xs font-mono font-medium">
 ⌘K
 </kbd>
 </div>

 {/* Primary CTA Button */}
 <button
 onClick={() => navigate('/projects')}
 className="px-4 py-2 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white text-sm font-semibold shadow-xs hover:shadow-[#b46b2b]/25 transition-all flex items-center gap-1.5 active:scale-[0.99] shrink-0 cursor-pointer"
 >
 <Plus size={16} />
 <span>Create New Project</span>
 </button>
 </div>
 </section>

 {/* 4 Orderly Summary Metric Tiles */}
 <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {/* Tile 1 */}
 <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between gap-4">
 <div className="flex items-start justify-between">
 <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
 Active Workspace
 </span>
 <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-surface-border flex items-center justify-center text-brand-navy">
 <FolderOpen size={16} />
 </div>
 </div>
 <div>
 <div className="text-3xl font-bold text-brand-navy leading-none mb-2">3</div>
 <div className="flex items-center justify-between text-xs text-brand-muted pt-1 border-t border-surface-border/50">
 <span className="flex items-center gap-1.5">
 <span className="w-2 h-2 rounded-full bg-brand-navy dark:bg-white"></span>1 Lead
 </span>
 <span className="flex items-center gap-1.5">
 <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>2 Member
 </span>
 <span className="text-accent-emerald font-semibold">+1 new</span>
 </div>
 </div>
 </div>

 {/* Tile 2 */}
 <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between gap-4">
 <div className="flex items-start justify-between">
 <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
 Team Requests
 </span>
 <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-surface-border flex items-center justify-center text-brand-navy">
 <Inbox size={16} />
 </div>
 </div>
 <div>
 <div className="flex items-baseline gap-2 mb-2">
 <span className="text-3xl font-bold text-brand-navy leading-none">5</span>
 <span className="px-2 py-0.5 rounded-full bg-accent-roseBg text-accent-rose border border-rose-200 text-xs font-semibold">
 2 Action Required
 </span>
 </div>
 <div className="flex items-center justify-between text-xs text-brand-muted pt-1 border-t border-surface-border/50">
 <span><strong>2</strong> Incoming inbox</span>
 <span>3 Pending sent</span>
 </div>
 </div>
 </div>

 {/* Tile 3 */}
 <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between gap-4">
 <div className="flex items-start justify-between">
 <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
 Verified Skills
 </span>
 <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-surface-border flex items-center justify-center text-accent-emerald">
 <CheckCircle size={16} />
 </div>
 </div>
 <div>
 <div className="flex items-baseline gap-2 mb-2">
 <span className="text-3xl font-bold text-brand-navy leading-none">7</span>
 <span className="px-2 py-0.5 rounded-full bg-accent-emeraldBg text-accent-emerald border border-accent-emeraldBorder text-xs font-semibold">
 Top 10% CSE
 </span>
 </div>
 <div className="flex flex-wrap gap-1 pt-1 border-t border-surface-border/50">
 <span className="px-2 py-0.5 rounded bg-surface-subtle text-brand-slate dark:text-slate-300 text-xs font-medium border border-surface-border">React</span>
 <span className="px-2 py-0.5 rounded bg-surface-subtle text-brand-slate dark:text-slate-300 text-xs font-medium border border-surface-border">Node.js</span>
 <span className="px-2 py-0.5 rounded bg-surface-subtle text-brand-slate dark:text-slate-300 text-xs font-medium border border-surface-border">Python</span>
 <span className="text-xs text-brand-muted self-center ml-0.5">+4 more</span>
 </div>
 </div>
 </div>

 {/* Tile 4 */}
 <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-xs hover:border-slate-300 transition-all flex items-center justify-between gap-3">
 <div className="flex flex-col">
 <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
 Affinity Score
 </span>
 <span className="text-base font-bold text-brand-navy mt-1">
 Profile Strength
 </span>
 <span className="text-xs text-brand-muted mt-0.5 leading-snug">
 Strong fit for ML & Full-Stack
 </span>
 </div>
 <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
 <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
 <path
 className="text-surface-border"
 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
 fill="none"
 stroke="currentColor"
 strokeWidth="3.5"
 />
 <path
 className="text-[#b46b2b]"
 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
 fill="none"
 stroke="currentColor"
 strokeDasharray="86, 100"
 strokeLinecap="round"
 strokeWidth="3.5"
 />
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
 <span className="text-sm font-bold text-brand-navy">86%</span>
 <span className="text-xs text-brand-muted font-medium uppercase mt-0.5">Rating</span>
 </div>
 </div>
 </div>
 </section>

 {/* 2-Column Main Layout: Projects (Left) & Widgets (Right) */}
 <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
 {/* Left Main Stream (8 cols) */}
 <div className="lg:col-span-8 flex flex-col gap-6">
 {/* Section Heading & Filter Bar */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
 <div className="flex items-center gap-2">
 <Sparkles className="text-brand-navy" size={20} />
 <h2 className="text-lg font-bold text-brand-navy">Recommended Projects</h2>
 </div>
 {/* Filter Pills */}
 <div className="flex items-center gap-1.5 overflow-x-auto">
 {['All (18)', 'AI / ML (7)', 'Full Stack (5)', 'IoT (3)'].map((filter) => {
 const label = filter.split(' ')[0];
 const isSelected = activeFilter === label;
 return (
 <button
 key={filter}
 onClick={() => setActiveFilter(label)}
 className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
 isSelected
 ? 'bg-brand-navy text-white shadow-xs'
 : 'bg-surface hover:bg-surface-subtle text-brand-slate dark:text-slate-300 border border-surface-border'
 }`}
 >
 {filter}
 </button>
 );
 })}
 </div>
 </div>

 {/* Project Cards List */}
 <div className="flex flex-col gap-4">
 {projects.map((proj) => (
 <div
 key={proj.id}
 className="p-5 rounded-xl bg-surface border border-surface-border shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row gap-5 group"
 >
 <div className="relative w-full md:w-52 h-44 md:h-auto rounded-lg overflow-hidden shrink-0 bg-surface-subtle border border-surface-border/80">
 <img
 alt={proj.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
 src={proj.image}
 />
 <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-surface text-accent-emerald border border-accent-emeraldBorder text-xs font-bold shadow-xs flex items-center gap-1">
 <Zap size={13} className="fill-current" />
 {proj.matchScore}% Match
 </span>
 </div>

 <div className="flex flex-col justify-between flex-1 gap-3 min-w-0">
 <div className="flex flex-col gap-1.5">
 <div className="flex items-center justify-between text-xs">
 <span className="font-semibold text-brand-muted tracking-wider uppercase">
 {proj.category}
 </span>
 <span className="flex items-center gap-1 text-brand-navy font-semibold">
 <Users size={14} className="text-brand-muted" />
 {proj.filled}
 </span>
 </div>
 <h3 className="text-base sm:text-lg font-bold text-brand-navy leading-snug group-hover:text-[#b46b2b] transition-colors">
 {proj.title}
 </h3>
 <p className="text-sm text-brand-muted line-clamp-2 leading-relaxed">
 {proj.description}
 </p>
 </div>

 <div className="flex flex-wrap gap-1.5">
 {proj.skills.map((skill) => (
 <span
 key={skill}
 className="px-2 py-0.5 rounded bg-surface-subtle text-brand-slate dark:text-slate-300 text-xs font-medium border border-surface-border"
 >
 {skill}
 </span>
 ))}
 </div>

 <div className="flex items-center justify-between pt-2 border-t border-surface-border/50 text-xs">
 <div className="flex items-center gap-2">
 <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 border border-surface-border text-brand-navy font-bold text-xs flex items-center justify-center">
 {proj.avatar}
 </div>
 <span className="text-brand-muted">
 Lead: <strong className="text-brand-navy font-medium">{proj.lead}</strong> ({proj.dept})
 </span>
 </div>

 <div className="flex items-center gap-2">
 <button
 onClick={() => navigate(`/projects/${proj.id}`)}
 className="px-3 py-1.5 rounded-lg border border-surface-border bg-white dark:bg-surface-subtle hover:bg-surface-subtle text-brand-navy font-medium text-xs transition-colors"
 >
 View Details
 </button>
 <button
 onClick={() => handleRequestJoin(proj.title)}
 disabled={requestedMap[proj.title]}
 className={`px-3.5 py-1.5 rounded-lg font-medium text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer ${
 requestedMap[proj.title]
 ? 'bg-accent-emerald text-white'
 : 'bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white'
 }`}
 >
 {requestedMap[proj.title] ? <Check size={14} /> : <Send size={14} />}
 <span>{requestedMap[proj.title] ? 'Requested' : 'Request to Join'}</span>
 </button>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Recent Activity (Clean Feed) */}
 <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-xs flex flex-col gap-4">
 <div className="flex items-center justify-between pb-2 border-b border-surface-border">
 <div className="flex items-center gap-2">
 <Clock size={18} className="text-brand-navy" />
 <h3 className="text-sm font-bold text-brand-navy">Recent Activity</h3>
 </div>
 <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
 Live Log
 </span>
 </div>

 <div className="flex flex-col gap-2.5 text-sm">
 <div className="p-3 rounded-lg bg-surface-subtle border border-surface-border/60 flex items-center justify-between gap-3">
 <div className="flex items-center gap-3">
 <div className="w-7 h-7 rounded-md bg-accent-emeraldBg text-accent-emerald border border-accent-emeraldBorder flex items-center justify-center shrink-0">
 <Check size={15} />
 </div>
 <div>
 <span className="text-brand-navy font-semibold">Priya Sharma</span>{' '}
 <span className="text-brand-muted">accepted your request to join</span>{' '}
 <strong className="text-brand-navy font-semibold">Campus Flow</strong>
 </div>
 </div>
 <span className="text-xs text-brand-muted shrink-0">24m ago</span>
 </div>

 <div className="p-3 rounded-lg bg-surface-subtle border border-surface-border/60 flex items-center justify-between gap-3">
 <div className="flex items-center gap-3">
 <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-800 text-brand-slate border border-surface-border flex items-center justify-center shrink-0">
 <FileCheck size={15} />
 </div>
 <div>
 <span className="text-brand-muted">Milestone delivered:</span>{' '}
 <strong className="text-brand-navy font-semibold">Backend Schema Definition</strong>{' '}
 <span className="text-brand-muted text-xs">· Distributed Cloud Lab</span>
 </div>
 </div>
 <span className="text-xs text-brand-muted shrink-0">3h ago</span>
 </div>

 <div className="p-3 rounded-lg bg-surface-subtle border border-surface-border/60 flex items-center justify-between gap-3">
 <div className="flex items-center gap-3">
 <div className="w-7 h-7 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center shrink-0">
 <Mail size={15} />
 </div>
 <div>
 <span className="text-brand-muted">Incoming invite from</span>{' '}
 <span className="text-brand-navy font-semibold">Karthik V.</span>{' '}
 <span className="text-brand-muted">for</span>{' '}
 <strong className="text-brand-navy font-semibold">Autonomous Drone Nav</strong>
 </div>
 </div>
 <span className="text-xs text-brand-muted shrink-0">Yesterday</span>
 </div>
 </div>
 </div>
 </div>

 {/* Right Rail Column (4 cols) */}
 <div className="lg:col-span-4 flex flex-col gap-6">
 {/* Recommended Peers Widget */}
 <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-xs flex flex-col gap-4">
 <div className="flex items-center justify-between pb-2 border-b border-surface-border">
 <div className="flex items-center gap-2">
 <Users size={19} className="text-brand-navy" />
 <h3 className="text-sm font-bold text-brand-navy">Recommended Peers</h3>
 </div>
 <button
 onClick={() => toast.info('Refreshed peer recommendations')}
 className="text-xs font-semibold text-brand-navy dark:text-blue-400 hover:underline"
 >
 Refresh
 </button>
 </div>

 <div className="flex flex-col gap-3">
 {/* Teammate 1 */}
 <div className="p-3 rounded-lg bg-surface-subtle border border-surface-border/70 flex flex-col gap-2.5">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2.5">
 <div className="w-8 h-8 rounded-lg bg-brand-navy text-white text-xs font-semibold flex items-center justify-center">
 RK
 </div>
 <div>
 <div className="text-sm font-bold text-brand-navy leading-tight">
 Rahul Kumar
 </div>
 <div className="text-xs text-brand-muted">CSE · 3rd Year</div>
 </div>
 </div>
 <span className="px-2 py-0.5 rounded bg-accent-emeraldBg text-accent-emerald border border-accent-emeraldBorder text-xs font-bold">
 92%
 </span>
 </div>
 <div className="flex items-center justify-between pt-1 border-t border-surface-border/50 text-xs">
 <div className="flex gap-1 text-brand-muted font-medium">
 <span>Python</span> · <span>ML</span> · <span>SQL</span>
 </div>
 <button
 onClick={() => handleConnect('Rahul Kumar')}
 className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
 connectedMap['Rahul Kumar']
 ? 'bg-accent-emerald text-white'
 : 'bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white'
 }`}
 >
 {connectedMap['Rahul Kumar'] ? 'Connected' : 'Connect'}
 </button>
 </div>
 </div>

 {/* Teammate 2 */}
 <div className="p-3 rounded-lg bg-surface-subtle border border-surface-border/70 flex flex-col gap-2.5">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2.5">
 <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-brand-navy text-xs font-semibold flex items-center justify-center">
 PS
 </div>
 <div>
 <div className="text-sm font-bold text-brand-navy leading-tight">
 Priya Sharma
 </div>
 <div className="text-xs text-brand-muted">IT · 3rd Year</div>
 </div>
 </div>
 <span className="px-2 py-0.5 rounded bg-accent-emeraldBg text-accent-emerald border border-accent-emeraldBorder text-xs font-bold">
 89%
 </span>
 </div>
 <div className="flex items-center justify-between pt-1 border-t border-surface-border/50 text-xs">
 <span className="text-brand-muted italic">Design Systems & UI</span>
 <button
 onClick={() => handleConnect('Priya Sharma')}
 className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
 connectedMap['Priya Sharma']
 ? 'bg-accent-emerald text-white'
 : 'bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white'
 }`}
 >
 {connectedMap['Priya Sharma'] ? 'Connected' : 'Connect'}
 </button>
 </div>
 </div>

 {/* Teammate 3 */}
 <div className="p-2.5 rounded-lg bg-surface-subtle border border-surface-border/50 flex items-center justify-between">
 <div className="flex items-center gap-2.5">
 <div className="w-7 h-7 rounded bg-slate-100 dark:bg-slate-800 border border-surface-border text-brand-navy text-xs font-semibold flex items-center justify-center">
 AK
 </div>
 <div>
 <span className="text-xs font-semibold text-brand-navy block leading-tight">
 Arun Kumar
 </span>
 <span className="text-xs text-brand-muted">ECE · Firmware</span>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <span className="text-xs font-bold text-accent-emerald">85%</span>
 <button
 onClick={() => handleConnect('Arun Kumar')}
 className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 text-brand-muted hover:text-brand-navy transition-colors"
 >
 <UserPlus size={16} />
 </button>
 </div>
 </div>

 {/* Teammate 4 */}
 <div className="p-2.5 rounded-lg bg-surface-subtle border border-surface-border/50 flex items-center justify-between">
 <div className="flex items-center gap-2.5">
 <div className="w-7 h-7 rounded bg-slate-100 dark:bg-slate-800 border border-surface-border text-brand-navy text-xs font-semibold flex items-center justify-center">
 AS
 </div>
 <div>
 <span className="text-xs font-semibold text-brand-navy block leading-tight">
 Ananya Sen
 </span>
 <span className="text-xs text-brand-muted">CSE · Data Pipelines</span>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <span className="text-xs font-bold text-accent-emerald">82%</span>
 <button
 onClick={() => handleConnect('Ananya Sen')}
 className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 text-brand-muted hover:text-brand-navy transition-colors"
 >
 <UserPlus size={16} />
 </button>
 </div>
 </div>
 </div>
 </div>

 {/* Skill Gap Diagnostics Widget */}
 <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-xs flex flex-col gap-3">
 <div className="flex items-center gap-2">
 <Zap size={18} className="text-brand-navy" />
 <span className="text-xs uppercase tracking-wider font-bold text-brand-muted">
 Skill Gap Diagnostic
 </span>
 </div>
 <h4 className="text-sm font-bold text-brand-navy">Cloud Architecture & CI/CD</h4>
 <p className="text-xs text-brand-muted leading-relaxed">
 Your profile matches 94% on Frontend & ML, but current prospective capstones require verified Docker and Kubernetes deployment experience.
 </p>
 <div className="flex flex-col gap-1.5 pt-1">
 <div className="flex items-center justify-between text-xs">
 <span className="text-brand-muted">DevOps Readiness</span>
 <span className="font-bold text-brand-navy">{devOpsReadiness}%</span>
 </div>
 <div className="w-full h-1.5 rounded-full bg-surface-subtle overflow-hidden border border-surface-border/60">
 <div className="h-full bg-brand-navy dark:bg-blue-500 rounded-full" style={{ width: `${devOpsReadiness}%` }}></div>
 </div>
 </div>
 <button
 onClick={() => setShowQuizModal(true)}
 className="mt-2 py-2 px-3 rounded-lg bg-surface-subtle hover:bg-white dark:hover:bg-slate-800 border border-surface-border text-brand-navy text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
 >
 <span>Take 10-Min Peer Quiz</span>
 </button>
 </div>

 {/* Real-Time Live Campus Calendar & Timeline */}
 <RealTimeCalendar />
 </div>
 </section>
 <PeerQuizModal isOpen={showQuizModal} onClose={() => setShowQuizModal(false)} onQuizComplete={() => { setDevOpsReadiness(85); toast.success('Peer verification completed! DevOps Readiness updated to 85%'); }} />
 </main>
 );
}
