import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bookmark,
  Plus,
  Users,
  ChevronDown,
  X,
  Zap,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Grid,
  List,
  SlidersHorizontal,
  Filter,
  Check
} from 'lucide-react';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import PostProjectModal from '../components/PostProjectModal';
import SavedSearchesModal from '../components/SavedSearchesModal';
import ScoringLogicModal from '../components/ScoringLogicModal';

export default function ExploreProjectsPage() {
  const navigate = useNavigate();
  const { toast, toasts, removeToast } = useToast();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [activeDept, setActiveDept] = useState('Dept: All');
  const [activeSlots, setActiveSlots] = useState('Open Slots: All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [statusTab, setStatusTab] = useState('all'); // 'all' | 'recruiting' | 'high_match' | 'urgent'
  const [showFilters, setShowFilters] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [appliedMap, setAppliedMap] = useState({});

  // Interactive Modals
  const [showPostModal, setShowPostModal] = useState(false);
  const [showSavedSearchesModal, setShowSavedSearchesModal] = useState(false);
  const [showScoringModal, setShowScoringModal] = useState(false);
  const [profileWeights, setProfileWeights] = useState({
    skills: 40,
    department: 25,
    year: 20,
    availability: 15,
  });

  const [customProjectsList, setCustomProjectsList] = useState([]);

  const handleApply = (projectTitle) => {
    setAppliedMap(prev => ({ ...prev, [projectTitle]: true }));
    toast.success(`Application submitted for "${projectTitle}"!`);
  };

  const projects = [
    {
      id: 1,
      category: 'Smart Education / Maps',
      matchScore: 87,
      isTop: false,
      title: 'Smart Campus Navigation',
      description: 'Indoor positioning system leveraging BLE beacons and AR turn-by-turn guidance across multicampus buildings.',
      slots: '2 slots open',
      urgent: false,
      skills: ['React', 'Node.js', 'MongoDB', 'UI/UX'],
      owner: 'Rahul Kumar',
      dept: 'CSE 3rd Year Lead',
      avatar: 'RK',
    },
    {
      id: 2,
      category: 'AI & Sustainability',
      matchScore: 94,
      isTop: true,
      topBanner: '⭐ TOP RECOMMENDATION  •  Dept of IT / CS',
      title: 'AI-Based Waste Segregation',
      description: 'Edge-deployed computer vision model running on Raspberry Pi to automate recycling stream segregation at university dining facilities.',
      slots: '2 slots open',
      urgent: false,
      skills: ['Python', 'OpenCV', 'TensorFlow', 'React'],
      owner: 'Sneha Patel',
      dept: 'IT 4th Year Lead',
      avatar: 'SP',
    },
    {
      id: 3,
      category: 'Cybersecurity & Web3',
      matchScore: 79,
      isTop: false,
      title: 'Decentralized Credential Verifier',
      description: 'Tamper-proof academic diploma verification portal backed by zero-knowledge proofs on lightweight campus rollup chains.',
      slots: '3 slots open',
      urgent: false,
      skills: ['Solidity', 'React', 'Node.js', 'zkEVM'],
      owner: 'Vikram Rao',
      dept: 'CSE 4th Year Lead',
      avatar: 'VR',
    },
    {
      id: 4,
      category: 'Robotics & IoT',
      matchScore: 72,
      isTop: false,
      title: 'Autonomous Drone Delivery',
      description: 'Inter-campus quadcopter dispatch network with LiDAR collision avoidance and secure payload lockboxes for library materials.',
      slots: '1 slot open (Urgent)',
      urgent: true,
      skills: ['ROS', 'Python', 'C++', 'Arduino'],
      owner: 'Arun Kumar',
      dept: 'ECE 3rd Year Lead',
      avatar: 'AK',
    },
    {
      id: 5,
      category: 'Web Platform',
      matchScore: 91,
      isTop: false,
      title: 'Peer Tutoring & Resource Hub',
      description: 'Real-time peer tutoring marketplace with collaborative code scratchpads, audio conferencing, and verified academic notes vault.',
      slots: '3 slots open',
      urgent: false,
      skills: ['Next.js', 'Tailwind', 'MongoDB', 'Socket.io'],
      owner: 'Priya Sharma',
      dept: 'CSE 3rd Year Lead',
      avatar: 'PS',
    },
    {
      id: 6,
      category: 'Healthcare Tech',
      matchScore: 85,
      isTop: false,
      title: 'Student Mental Wellness Tracker',
      description: 'Confidential longitudinal mood forecasting app using voice journaling sentiments and anonymized peer support groups.',
      slots: '2 slots open',
      urgent: false,
      skills: ['Flutter', 'Node.js', 'ML', 'UI/UX'],
      owner: 'Rohan Gupta',
      dept: 'CSE & Design Lead',
      avatar: 'RG',
    },
  ];

  const allProjects = [...customProjectsList, ...projects];

  const handleExecuteSearch = () => {
    toast.success(`Search completed: ${filteredProjects.length} project(s) matched`);
  };

  const handleResetFilters = () => {
    setSearch('');
    setActiveCategory('All Categories');
    setActiveDept('Dept: All');
    setActiveSlots('Open Slots: All');
    setStatusTab('all');
    setSelectedSkills([]);
    toast.info('All filters reset');
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Dynamic filter logic
  const filteredProjects = allProjects.filter(p => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesTitle = p.title.toLowerCase().includes(q);
      const matchesDesc = p.description.toLowerCase().includes(q);
      const matchesCat = p.category.toLowerCase().includes(q);
      const matchesSkills = p.skills.some(s => s.toLowerCase().includes(q));
      if (!matchesTitle && !matchesDesc && !matchesCat && !matchesSkills) return false;
    }

    if (statusTab === 'urgent' && !p.urgent) return false;
    if (statusTab === 'high_match' && p.matchScore < 88) return false;
    if (statusTab === 'recruiting' && p.slots.includes('0')) return false;

    if (activeCategory !== 'All Categories' && !p.category.includes(activeCategory)) {
      return false;
    }

    if (activeDept !== 'Dept: All') {
      const deptCode = activeDept.replace('Dept: ', '');
      if (!p.dept.includes(deptCode)) return false;
    }

    if (activeSlots === '1-2 Slots' && !p.slots.includes('1') && !p.slots.includes('2')) return false;
    if (activeSlots === '3+ Slots' && !p.slots.includes('3')) return false;

    if (selectedSkills.length > 0) {
      const hasAnySkill = selectedSkills.some(s => p.skills.includes(s));
      if (!hasAnySkill) return false;
    }

    return true;
  });

  const popularSkills = ['React', 'Python', 'Node.js', 'MongoDB', 'UI/UX', 'TensorFlow', 'C++', 'Solidity'];

  return (
    <main className="max-w-[1340px] w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-surface border border-surface-border text-brand-muted text-xs font-bold tracking-wide uppercase">
              Curated Scholarly Registry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
            Explore Projects
          </h1>
          <p className="text-sm text-brand-muted mt-0.5 font-medium">
            Discover peer capstones aligned with your tech stack, department, and academic schedule with synergy scoring.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowSavedSearchesModal(true)}
            className="px-3.5 py-2 rounded-xl border border-surface-border bg-surface hover:bg-surface-subtle text-brand-navy text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Bookmark size={16} className="text-[#b46b2b]" />
            <span>Saved Searches</span>
          </button>

          <button
            onClick={() => setShowPostModal(true)}
            className="px-4 py-2 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white text-sm font-bold flex items-center gap-1.5 shadow-xs hover:shadow-[#b46b2b]/25 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Post a Project</span>
          </button>
        </div>
      </section>

      {/* Search & Top Filter Bar */}
      <div className="flex flex-col gap-4">
        {/* Search Input Row with Dedicated Caramel Search Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-surface-border text-brand-navy placeholder:text-brand-muted/70 text-sm font-medium focus:outline-none focus:border-[#b46b2b] shadow-xs"
              placeholder="Search projects by tech stack, keywords (e.g. OpenCV, Flutter, Web3), or research topic..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch()}
            />
          </div>

          <button
            onClick={handleExecuteSearch}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow-[#b46b2b]/25 transition-all cursor-pointer shrink-0"
          >
            <Search size={16} />
            <span>Search</span>
          </button>

          {/* Toggle View Mode Button Group */}
          <div className="flex items-center p-1 rounded-xl bg-surface border border-surface-border shadow-xs shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#b46b2b] text-white shadow-xs'
                  : 'text-brand-muted hover:text-brand-navy dark:hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid size={15} />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#b46b2b] text-white shadow-xs'
                  : 'text-brand-muted hover:text-brand-navy dark:hover:text-white'
              }`}
              title="List View"
            >
              <List size={15} />
              <span>List</span>
            </button>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3.5 py-2 rounded-xl border text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0 ${
              showFilters
                ? 'bg-[#fdf5eb] dark:bg-[#35291f] text-[#9c5921] dark:text-[#f2cb9b] border-[#f2cb9b] dark:border-[#523d2b]'
                : 'bg-surface hover:bg-surface-subtle text-brand-navy border-surface-border'
            }`}
          >
            <Filter size={15} />
            <span>Filters</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Status / Category Segmented Toggle Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface border border-surface-border text-xs font-semibold shadow-xs">
            {[
              { id: 'all', label: `All Projects (${projects.length})` },
              { id: 'recruiting', label: 'Recruiting Now' },
              { id: 'high_match', label: 'High Match (88%+)' },
              { id: 'urgent', label: 'Urgent Vacancies' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                  statusTab === tab.id
                    ? 'bg-[#b46b2b] text-white shadow-xs'
                    : 'text-brand-muted hover:text-brand-navy dark:hover:text-white hover:bg-surface-subtle'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-brand-muted">
            <span>Showing <strong className="text-brand-navy">{filteredProjects.length}</strong> of {projects.length} capstones</span>
          </div>
        </div>

        {/* Expandable Filter Options Panel */}
        {showFilters && (
          <div className="p-4 rounded-2xl bg-surface border border-surface-border shadow-xs flex flex-col gap-3.5 animate-in fade-in">
            {/* Dropdown Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
              <div>
                <label className="block text-xs font-bold text-brand-muted mb-1">Category</label>
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-surface-subtle border border-surface-border text-brand-navy font-semibold focus:outline-none focus:border-[#b46b2b] cursor-pointer shadow-xs"
                >
                  <option>All Categories</option>
                  <option>AI & Sustainability</option>
                  <option>Smart Education</option>
                  <option>Cybersecurity & Web3</option>
                  <option>Robotics & IoT</option>
                  <option>Healthcare Tech</option>
                  <option>Web Platform</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-muted mb-1">Department</label>
                <select
                  value={activeDept}
                  onChange={(e) => setActiveDept(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-surface-subtle border border-surface-border text-brand-navy font-semibold focus:outline-none focus:border-[#b46b2b] cursor-pointer shadow-xs"
                >
                  <option>Dept: All</option>
                  <option>Dept: CSE</option>
                  <option>Dept: IT</option>
                  <option>Dept: ECE</option>
                  <option>Dept: Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-muted mb-1">Open Slots</label>
                <select
                  value={activeSlots}
                  onChange={(e) => setActiveSlots(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-surface-subtle border border-surface-border text-brand-navy font-semibold focus:outline-none focus:border-[#b46b2b] cursor-pointer shadow-xs"
                >
                  <option>Open Slots: All</option>
                  <option>1-2 Slots</option>
                  <option>3+ Slots</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-muted mb-1">Sort Preference</label>
                <select className="w-full px-3 py-1.5 rounded-lg bg-surface-subtle border border-surface-border text-brand-navy font-semibold focus:outline-none focus:border-[#b46b2b] cursor-pointer shadow-xs">
                  <option>Highest Synergy Match</option>
                  <option>Most Recent</option>
                  <option>Slots Available</option>
                </select>
              </div>
            </div>

            {/* Quick Skill Filter Pills */}
            <div className="flex flex-col gap-1.5 pt-1 border-t border-surface-border/60">
              <span className="text-xs font-bold text-brand-muted">Filter by Required Tech:</span>
              <div className="flex flex-wrap gap-1.5">
                {popularSkills.map(skill => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#b46b2b] text-white shadow-xs'
                          : 'bg-surface-subtle hover:bg-surface text-brand-slate border border-surface-border'
                      }`}
                    >
                      {skill} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Criteria Chips & Reset */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-brand-muted font-semibold">Active:</span>

                {activeCategory !== 'All Categories' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fdf5eb] dark:bg-[#35291f] text-[#9c5921] dark:text-[#f2cb9b] border border-[#f2cb9b] dark:border-[#523d2b] font-bold flex items-center gap-1">
                    <span>{activeCategory}</span>
                    <X size={12} className="cursor-pointer" onClick={() => setActiveCategory('All Categories')} />
                  </span>
                )}

                {activeDept !== 'Dept: All' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fdf5eb] dark:bg-[#35291f] text-[#9c5921] dark:text-[#f2cb9b] border border-[#f2cb9b] dark:border-[#523d2b] font-bold flex items-center gap-1">
                    <span>{activeDept}</span>
                    <X size={12} className="cursor-pointer" onClick={() => setActiveDept('Dept: All')} />
                  </span>
                )}

                {selectedSkills.map(s => (
                  <span key={s} className="px-2.5 py-0.5 rounded-full bg-[#b46b2b] text-white font-bold flex items-center gap-1">
                    <span>{s}</span>
                    <X size={12} className="cursor-pointer" onClick={() => toggleSkill(s)} />
                  </span>
                ))}
              </div>

              <button
                onClick={handleResetFilters}
                className="text-[#b46b2b] hover:underline font-bold text-xs cursor-pointer ml-auto"
              >
                Reset all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Projects Display: Grid or List Mode */}
      {filteredProjects.length === 0 ? (
        <div className="p-14 rounded-2xl bg-surface border border-surface-border text-center flex flex-col items-center justify-center gap-3 shadow-xs">
          <Users size={40} className="text-brand-muted/40" />
          <h4 className="text-base font-bold text-brand-navy">No Projects Found</h4>
          <p className="text-xs text-brand-muted max-w-sm">No campus projects match the applied filters and keywords. Try adjusting your parameters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* 3-Column Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className={`rounded-2xl bg-surface border transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:border-[#f2cb9b] dark:hover:border-[#523d2b] ${
                proj.isTop ? 'border-[#b46b2b] shadow-md ring-1 ring-[#b46b2b]/20' : 'border-surface-border'
              }`}
            >
              {/* Top recommendation banner */}
              {proj.isTop && (
                <div className="bg-[#b46b2b] text-white text-xs font-bold px-4 py-1.5 tracking-wide flex items-center justify-between">
                  <span>{proj.topBanner}</span>
                </div>
              )}

              <div className="p-5 flex flex-col gap-3">
                {/* Category & Match Score pill */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-surface-subtle text-brand-muted font-bold text-xs border border-surface-border truncate">
                    {proj.category}
                  </span>

                  <span className="px-2 py-0.5 rounded bg-accent-emeraldBg text-accent-emerald border border-accent-emeraldBorder font-extrabold text-xs shrink-0 flex items-center gap-1">
                    <Zap size={11} className="fill-current" />
                    {proj.matchScore}% Match
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3
                    className="text-base font-extrabold text-brand-navy leading-snug hover:text-[#b46b2b] transition-colors cursor-pointer"
                    onClick={() => navigate(`/projects/${proj.id}`)}
                  >
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mt-1.5 leading-relaxed font-normal">
                    {proj.description}
                  </p>
                </div>

                {/* Open Slots Indicator */}
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  {proj.urgent ? (
                    <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1">
                      <AlertTriangle size={14} />
                      {proj.slots}
                    </span>
                  ) : (
                    <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <Users size={14} />
                      {proj.slots}
                    </span>
                  )}
                </div>

                {/* Required Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-surface-subtle text-slate-700 dark:text-slate-200 text-xs font-semibold border border-surface-border"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Row & Actions */}
              <div className="px-5 py-3 border-t border-surface-border bg-surface-subtle flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-[#b46b2b] text-white text-xs font-black flex items-center justify-center shrink-0">
                    {proj.avatar}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-brand-navy truncate leading-tight">
                      {proj.owner}
                    </span>
                    <span className="text-xs text-brand-muted truncate leading-tight font-medium">
                      {proj.dept}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => navigate(`/projects/${proj.id}`)}
                    className="px-3 py-1.5 rounded-lg border border-surface-border bg-surface hover:bg-surface-subtle text-brand-navy font-bold text-xs transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleApply(proj.title)}
                    disabled={appliedMap[proj.title]}
                    className={`px-3 py-1.5 rounded-lg text-white font-bold text-xs transition-all cursor-pointer ${
                      appliedMap[proj.title]
                        ? 'bg-accent-emerald'
                        : 'bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] shadow-xs hover:shadow-[#b46b2b]/25'
                    }`}
                  >
                    {appliedMap[proj.title] ? 'Applied' : 'Quick Apply'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View Mode */
        <div className="flex flex-col gap-3.5">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className={`p-5 rounded-2xl bg-surface border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs hover:border-[#f2cb9b] dark:hover:border-[#523d2b] ${
                proj.isTop ? 'border-[#b46b2b] ring-1 ring-[#b46b2b]/20' : 'border-surface-border'
              }`}
            >
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-surface-subtle text-brand-muted font-bold text-xs border border-surface-border">
                    {proj.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-accent-emeraldBg text-accent-emerald border border-accent-emeraldBorder font-extrabold text-xs flex items-center gap-1">
                    <Zap size={11} className="fill-current" />
                    {proj.matchScore}% Match
                  </span>
                  {proj.urgent && (
                    <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 text-xs font-bold">
                      Urgent Vacancy
                    </span>
                  )}
                </div>

                <div>
                  <h3
                    className="text-base font-extrabold text-brand-navy leading-snug hover:text-[#b46b2b] transition-colors cursor-pointer"
                    onClick={() => navigate(`/projects/${proj.id}`)}
                  >
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-brand-muted pt-1">
                  <span>Lead: <strong className="text-brand-navy">{proj.owner}</strong> ({proj.dept})</span>
                  <span>•</span>
                  <span>{proj.slots}</span>
                  <span>•</span>
                  <div className="flex flex-wrap gap-1">
                    {proj.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-surface-subtle border border-surface-border text-xs font-semibold text-brand-slate">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-row md:flex-col items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-surface-border/60">
                <button
                  onClick={() => handleApply(proj.title)}
                  disabled={appliedMap[proj.title]}
                  className={`w-full sm:w-auto md:w-32 py-2 px-3 rounded-xl text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    appliedMap[proj.title]
                      ? 'bg-accent-emerald'
                      : 'bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] shadow-xs hover:shadow-[#b46b2b]/25'
                  }`}
                >
                  {appliedMap[proj.title] ? <Check size={14} /> : null}
                  <span>{appliedMap[proj.title] ? 'Applied' : 'Quick Apply'}</span>
                </button>
                <button
                  onClick={() => navigate(`/projects/${proj.id}`)}
                  className="w-full sm:w-auto md:w-32 py-2 px-3 rounded-xl border border-surface-border bg-surface hover:bg-surface-subtle text-brand-navy font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Synergy Callout */}
      <div className="p-5 rounded-2xl bg-surface border border-surface-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#b46b2b] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-brand-navy">
              How Synergy Scoring Works
            </h4>
            <p className="text-xs text-brand-muted mt-0.5 leading-relaxed font-medium">
              Calculated by cross-referencing your completed core coursework, verified GitHub contributions, and schedule availability with active team vacancy requirements.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowScoringModal(true)}
          className="px-4 py-2 rounded-xl border border-surface-border bg-surface hover:bg-surface-subtle text-brand-navy text-xs font-bold shrink-0 shadow-xs transition-colors cursor-pointer"
        >
          Calibrate Profile Weights
        </button>
      </div>

      {/* Interactive Modals */}
      <PostProjectModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onProjectCreated={(newProj) => {
          setCustomProjectsList(prev => [newProj, ...prev]);
          toast.success(`Project "${newProj.title}" posted successfully!`);
        }}
      />

      <SavedSearchesModal
        isOpen={showSavedSearchesModal}
        onClose={() => setShowSavedSearchesModal(false)}
        onApplySearch={(s) => {
          setSearch(s.query);
          if (s.category) setActiveCategory(s.category);
          toast.info(`Loaded search bookmark: "${s.title}"`);
        }}
      />

      <ScoringLogicModal
        isOpen={showScoringModal}
        onClose={() => setShowScoringModal(false)}
        weights={profileWeights}
        onSaveWeights={(w) => {
          setProfileWeights(w);
          toast.success('Synergy scoring weights updated!');
        }}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2 text-xs text-brand-muted font-medium">
        <span>Showing <strong className="text-brand-navy font-bold">{filteredProjects.length}</strong> of {projects.length} total projects</span>
        <div className="flex items-center gap-1 font-semibold">
          <button className="px-2.5 py-1 rounded-lg border border-surface-border bg-surface text-brand-slate disabled:opacity-50">
            &lt;
          </button>
          <button className="w-7 h-7 rounded-lg bg-[#b46b2b] text-white font-bold flex items-center justify-center shadow-xs">
            1
          </button>
          <button className="w-7 h-7 rounded-lg hover:bg-surface-subtle text-brand-slate flex items-center justify-center">
            2
          </button>
          <button className="px-2.5 py-1 rounded-lg border border-surface-border bg-surface text-brand-slate">
            &gt;
          </button>
        </div>
      </div>
    </main>
  );
}
