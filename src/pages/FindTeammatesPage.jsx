import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  Users,
  CheckCircle2,
  Sliders,
  Check,
  Grid,
  List,
  GraduationCap,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  UserCheck,
  Award,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import ScoringLogicModal from '../components/ScoringLogicModal';
import ValidationPolicyModal from '../components/ValidationPolicyModal';

export default function FindTeammatesPage() {
  const navigate = useNavigate();
  const { toast, toasts, removeToast } = useToast();

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('CSE');
  const [selectedSkills, setSelectedSkills] = useState(['React', 'UI/UX']);
  const [minScore, setMinScore] = useState(75);
  const [selectedYears, setSelectedYears] = useState(['3rd Year', '4th Year']);
  const [availability, setAvailability] = useState('Ready to Join Immediately');
  const [connectedMap, setConnectedMap] = useState({});

  // View mode and filter visibility
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [filterEnabled, setFilterEnabled] = useState(true);

  // Modals
  const [showScoringModal, setShowScoringModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [customWeights, setCustomWeights] = useState({
    skills: 40,
    department: 25,
    year: 20,
    availability: 15,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleConnect = (name) => {
    setConnectedMap(prev => ({ ...prev, [name]: true }));
    toast.success(`Invitation dispatched to ${name}!`);
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
    setCurrentPage(1);
  };

  const toggleYear = (year) => {
    setSelectedYears(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
    setCurrentPage(1);
  };

  const initialCandidates = [
    {
      id: 2,
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
      baseScore: 89,
      dept: 'CSE • 3rd Year • Campus Alpha',
      role: 'UI/UX & FRONTEND SPECIALIST',
      bio: 'Focused on human-computer interaction, design systems, and fluid micro-interactions for student-facing web platforms.',
      bullets: [
        { icon: CheckCircle2, text: '3 matching skills with your profile' },
        { icon: GraduationCap, text: 'Same department • CSE Lab 4 companion' },
        { icon: Clock, text: 'Compatible project preference & evenings open' },
      ],
      skills: ['React', 'Figma', 'Tailwind', 'TypeScript'],
      availability: 'Ready to Join Immediately',
    },
    {
      id: 1,
      name: 'Rahul Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      baseScore: 92,
      dept: 'CSE • 3rd Year • AI Specialization',
      role: 'ML ENGINEER & BACKEND DEV',
      bio: 'Specializing in distributed LLM fine-tuning, scalable REST APIs, and asynchronous message broker pipelines.',
      bullets: [
        { icon: CheckCircle2, text: '4 complementary skills (Python & FastAPI)' },
        { icon: Award, text: 'Winner: Campus Hackathon 2024' },
        { icon: Clock, text: 'Ready to Join Immediately' },
      ],
      skills: ['Python', 'PyTorch', 'SQL', 'FastAPI', 'Docker'],
      availability: 'Ready to Join Immediately',
    },
    {
      id: 3,
      name: 'Arun Kumar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      baseScore: 81,
      dept: 'ECE • 4th Year • Embedded Labs',
      role: 'IOT SYSTEMS & EMBEDDED FIRMWARE',
      bio: 'Hands-on micro-architecture, sensor mesh networking, and hardware-software telemetry protocols.',
      bullets: [
        { icon: CheckCircle2, text: 'Hardware lead for multidisciplinary teams' },
        { icon: GraduationCap, text: '4.0 GPA in Senior Embedded Lab' },
        { icon: Clock, text: 'Seeking Capstone Collaborators' },
      ],
      skills: ['C++', 'Arduino', 'FreeRTOS', 'MQTT'],
      availability: 'Looking for Capstone Lead',
    },
    {
      id: 4,
      name: 'Sneha Patel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      baseScore: 88,
      dept: 'IT • 3rd Year • DevOps & Cloud',
      role: 'CLOUD ARCHITECT & DEVOPS',
      bio: 'Experienced in automated CI/CD pipelines, container orchestration, and serverless microservices deployment.',
      bullets: [
        { icon: CheckCircle2, text: 'AWS Certified Cloud Practitioner' },
        { icon: GraduationCap, text: 'Cross-functional experience in 2 prior teams' },
        { icon: Clock, text: 'Looking for Capstone Lead role' },
      ],
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      availability: 'Looking for Capstone Lead',
    },
    {
      id: 5,
      name: 'Rohan Verma',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80',
      baseScore: 84,
      dept: 'CSE • 2nd Year • App Studio',
      role: 'MOBILE APP DEVELOPER',
      bio: 'Creating clean cross-platform client applications with offline persistence and real-time syncing architectures.',
      bullets: [
        { icon: CheckCircle2, text: 'Published 2 apps on Play Store' },
        { icon: GraduationCap, text: 'High algorithmic coursework ranking' },
        { icon: Clock, text: 'Hackathon & Term Project Ready' },
      ],
      skills: ['Flutter', 'Dart', 'Firebase', 'REST'],
      availability: 'Part-time Hackathon (Weekends)',
    },
    {
      id: 6,
      name: 'Ananya Sen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
      baseScore: 86,
      dept: 'Data Science • 3rd Year',
      role: 'DATA ANALYST & VISUALIZATION',
      bio: 'Extracting rich narratives from messy observational datasets with statistical rigor and executive dashboards.',
      bullets: [
        { icon: CheckCircle2, text: 'Co-author on 1 IEEE Student Paper' },
        { icon: GraduationCap, text: 'Advanced Econometrics TA' },
        { icon: Clock, text: 'Flexible schedule (12 hrs/week)' },
      ],
      skills: ['Python', 'Pandas', 'Tableau', 'R'],
      availability: 'Ready to Join Immediately',
    },
  ];

  // Dynamically compute matchScore based on current weights
  const candidates = initialCandidates.map(cand => {
    // Dynamic score formula: baseScore influenced by calibrated weights
    const weightFactor = (customWeights.skills * 0.4 + customWeights.department * 0.25 + customWeights.year * 0.2 + customWeights.availability * 0.15) / 25;
    const computedScore = Math.min(99, Math.max(65, Math.round(cand.baseScore * (0.85 + 0.15 * weightFactor))));
    return {
      ...cand,
      matchScore: computedScore,
    };
  });

  const handleExecuteSearch = () => {
    setCurrentPage(1);
    toast.success(`Search completed! Found ${filteredCandidates.length} candidate(s)`);
  };

  const handleResetFilters = () => {
    setSelectedDept('All');
    setSelectedSkills([]);
    setMinScore(60);
    setSearch('');
    setSelectedYears(['1st Year', '2nd Year', '3rd Year', '4th Year']);
    setAvailability('Any Status');
    setCurrentPage(1);
    toast.info('Filters reset to default');
  };

  const filteredCandidates = candidates.filter(cand => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesName = cand.name.toLowerCase().includes(q);
      const matchesRole = cand.role.toLowerCase().includes(q);
      const matchesSkills = cand.skills.some(s => s.toLowerCase().includes(q));
      const matchesBio = cand.bio.toLowerCase().includes(q);
      if (!matchesName && !matchesRole && !matchesSkills && !matchesBio) return false;
    }

    if (selectedDept !== 'All' && !cand.dept.includes(selectedDept)) {
      return false;
    }

    if (cand.matchScore < minScore) {
      return false;
    }

    if (selectedSkills.length > 0) {
      const hasAnySkill = selectedSkills.some(s => cand.skills.includes(s));
      if (!hasAnySkill) return false;
    }

    if (availability !== 'Any Status' && cand.availability !== availability) {
      return false;
    }

    return true;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage) || 1;
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="max-w-[1340px] w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Modals */}
      <ScoringLogicModal
        isOpen={showScoringModal}
        onClose={() => setShowScoringModal(false)}
        weights={customWeights}
        onSaveWeights={(newWeights) => {
          setCustomWeights(newWeights);
          toast.success('Affinity scoring weights recalibrated!');
        }}
      />
      <ValidationPolicyModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
      />

      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-surface-border/60">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-surface border border-surface-border text-brand-muted text-xs font-semibold tracking-wide uppercase">
              Academic Affinity Engine • Fall 2025
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight">
            Find Your Teammates
          </h1>
          <p className="text-sm text-brand-muted mt-0.5">
            Discover students with complementary skills, verified coursework, and aligned project goals across departments.
          </p>
        </div>

        {/* Top Right Stat Badges */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-surface border border-surface-border flex items-center gap-2 shadow-xs">
            <Users size={18} className="text-brand-muted" />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-brand-navy">418</span>
              <span className="text-xs text-brand-muted font-medium">Students</span>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-accent-emeraldBg border border-accent-emeraldBorder flex items-center gap-2 shadow-xs">
            <Zap size={18} className="text-accent-emerald fill-current" />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-accent-emerald">94%</span>
              <span className="text-xs text-accent-emerald font-medium">Avg Match</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar & Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-surface border border-surface-border text-brand-navy placeholder:text-brand-muted/70 text-sm focus:outline-none focus:border-[#b46b2b] shadow-xs"
            placeholder="Search by name, skills (e.g. React, Python), interests, or roll number..."
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

        {/* Filter ON / OFF Toggle Button */}
        <button
          onClick={() => {
            const next = !filterEnabled;
            setFilterEnabled(next);
            toast.info(next ? 'Filter sidebar enabled' : 'Filter sidebar hidden (full width view)');
          }}
          className={`px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-2 shrink-0 shadow-xs transition-all cursor-pointer ${
            filterEnabled
              ? 'bg-[#fdf5eb] dark:bg-[#35291f] text-[#9c5921] dark:text-[#f2cb9b] border-[#f2cb9b] dark:border-[#523d2b]'
              : 'bg-surface hover:bg-surface-subtle text-brand-navy border-surface-border'
          }`}
        >
          <Filter size={16} className={filterEnabled ? 'text-[#b46b2b]' : 'text-brand-muted'} />
          <span>Filter: <strong>{filterEnabled ? 'ON' : 'OFF'}</strong></span>
        </button>

        {/* Scoring Logic Button */}
        <button
          onClick={() => setShowScoringModal(true)}
          className="px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-subtle border border-surface-border text-brand-navy text-sm font-semibold flex items-center gap-2 shrink-0 shadow-xs transition-colors cursor-pointer"
        >
          <SlidersHorizontal size={16} className="text-[#b46b2b]" />
          <span>Scoring Logic</span>
          <span className="px-1.5 py-0.5 rounded text-xs bg-surface-subtle font-mono text-brand-muted border border-surface-border">
            v2.4
          </span>
        </button>
      </div>

      {/* Main Content Layout */}
      <div className={`grid grid-cols-1 ${filterEnabled ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-6 items-start`}>
        {/* Left Filter Sidebar (4 cols when enabled) */}
        {filterEnabled && (
          <aside className="lg:col-span-4 p-5 rounded-xl bg-surface border border-surface-border shadow-xs flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-brand-navy" />
                <h3 className="text-sm font-bold text-brand-navy">Filter Candidates</h3>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-brand-muted hover:text-brand-navy cursor-pointer transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Minimum Match Score Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-navy">Minimum Match Score</span>
                <span className="px-2 py-0.5 rounded-full bg-accent-emeraldBg text-accent-emerald text-xs font-bold border border-accent-emeraldBorder">
                  {minScore}% & above
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                step="5"
                value={minScore}
                onChange={(e) => {
                  setMinScore(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-brand-navy cursor-pointer"
              />
              <div className="flex justify-between text-xs text-brand-muted font-medium">
                <span>60%</span>
                <span>75%</span>
                <span>90%</span>
                <span>95%+</span>
              </div>
            </div>

            {/* Department Filter */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-brand-navy">Department</span>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Biotech'].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDept(dept);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      selectedDept === dept
                        ? 'bg-[#b46b2b] text-white shadow-xs'
                        : 'bg-surface-subtle hover:bg-surface text-brand-slate dark:text-slate-300 border border-surface-border'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Academic Cohort */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-brand-navy">Academic Cohort</span>
              <div className="flex flex-col gap-1.5 text-xs text-brand-slate dark:text-slate-300">
                {['1st Year (Freshman)', '2nd Year (Sophomore)', '3rd Year (Junior)', '4th Year (Senior Capstone)'].map((label) => {
                  const yearKeyword = label.split(' ')[0] + ' Year';
                  const isChecked = selectedYears.includes(yearKeyword);
                  return (
                    <label key={label} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleYear(yearKeyword)}
                        className="rounded border-surface-border text-brand-navy focus:ring-brand-navy"
                      />
                      <span>{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Core Competencies */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-brand-navy">Core Competencies</span>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'Python', 'Java', 'C++', 'Node.js', 'MongoDB', 'UI/UX', 'Machine Learning', 'Cybersecurity'].map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#b46b2b] text-white'
                          : 'bg-surface-subtle hover:bg-white text-brand-slate dark:text-slate-300 border border-surface-border'
                      }`}
                    >
                      {skill} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Commitment & Availability */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-brand-navy">Commitment & Availability</span>
              <div className="flex flex-col gap-1.5 text-xs text-brand-slate dark:text-slate-300">
                {[
                  'Any Status',
                  'Ready to Join Immediately',
                  'Looking for Capstone Lead',
                  'Part-time Hackathon (Weekends)',
                ].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === opt}
                      onChange={() => {
                        setAvailability(opt);
                        setCurrentPage(1);
                      }}
                      className="text-brand-navy focus:ring-brand-navy"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Academic Match Guarantee Callout */}
            <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-brand-navy font-bold text-xs">
                <ShieldCheck size={16} className="text-accent-emerald" />
                <span>Academic Match Guarantee</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Profiles with verified checkmarks have validated course transcripts and faculty endorsements.
              </p>
              <button
                type="button"
                onClick={() => setShowValidationModal(true)}
                className="text-xs font-semibold text-[#b46b2b] hover:underline pt-1 text-left cursor-pointer inline-flex items-center gap-1"
              >
                Validation Policy →
              </button>
            </div>

            {/* Search Button in Filter Option */}
            <div className="pt-1 flex flex-col gap-2">
              <button
                onClick={handleExecuteSearch}
                className="w-full py-2.5 px-4 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-[#b46b2b]/25 transition-all cursor-pointer"
              >
                <Search size={16} />
                <span>Search Teammates ({filteredCandidates.length})</span>
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full py-1.5 px-4 rounded-lg bg-surface-subtle hover:bg-surface text-brand-muted hover:text-brand-navy dark:hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          </aside>
        )}

        {/* Right Candidates Section (8 cols or 12 cols if filter disabled) */}
        <section className={`${filterEnabled ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col gap-4 w-full`}>
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-semibold text-brand-muted">
              <strong className="text-brand-navy">{filteredCandidates.length} Teammates Matched</strong> • Sorted by affinity
            </span>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-surface-border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded cursor-pointer transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#b46b2b] text-white shadow-xs'
                    : 'text-brand-muted hover:text-brand-navy dark:hover:text-white'
                }`}
                title="Grid Layout"
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded cursor-pointer transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#b46b2b] text-white shadow-xs'
                    : 'text-brand-muted hover:text-brand-navy dark:hover:text-white'
                }`}
                title="List Layout"
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {filteredCandidates.length === 0 ? (
            <div className="p-12 rounded-2xl bg-surface border border-surface-border text-center flex flex-col items-center justify-center gap-3 shadow-xs">
              <Users size={36} className="text-brand-muted/50" />
              <h4 className="text-base font-bold text-brand-navy">No Candidates Match Your Filters</h4>
              <p className="text-xs text-brand-muted max-w-sm">Try widening your search terms or lowering the minimum match score.</p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className={`grid grid-cols-1 ${filterEnabled ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
              {paginatedCandidates.map((cand) => (
                <div
                  key={cand.id}
                  className="p-5 rounded-xl bg-surface border border-surface-border shadow-xs hover:border-slate-300 dark:hover:border-stone-700 transition-all flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-3">
                    {/* Top user row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          alt={cand.name}
                          src={cand.avatar}
                          className="w-11 h-11 rounded-xl object-cover border border-surface-border"
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <h4 className="font-bold text-brand-navy text-sm">
                              {cand.name}
                            </h4>
                            <CheckCircle2 size={14} className="text-accent-emerald fill-accent-emerald/20" />
                          </div>
                          <p className="text-xs text-brand-muted">{cand.dept}</p>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-md bg-accent-emeraldBg text-accent-emerald border border-accent-emeraldBorder text-xs font-bold flex items-center gap-1">
                        <Zap size={11} className="fill-current" />
                        {cand.matchScore}%
                      </span>
                    </div>

                    {/* Specialization tag */}
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-slate dark:text-slate-300">
                      {cand.role}
                    </span>

                    <p className="text-sm text-brand-muted leading-relaxed line-clamp-2">
                      {cand.bio}
                    </p>

                    {/* Match bullets */}
                    <div className="p-3 rounded-lg bg-surface-subtle border border-surface-border/60 flex flex-col gap-1.5 text-xs text-brand-slate dark:text-slate-300">
                      {cand.bullets.map((b, i) => {
                        const Icon = b.icon;
                        return (
                          <div key={i} className="flex items-center gap-2">
                            <Icon size={13} className="text-accent-emerald shrink-0" />
                            <span className="truncate">{b.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cand.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-surface-border text-xs font-medium text-brand-slate dark:text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-surface-border/60">
                    <button
                      onClick={() => handleConnect(cand.name)}
                      disabled={connectedMap[cand.name]}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        connectedMap[cand.name]
                          ? 'bg-accent-emerald text-white'
                          : 'bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white'
                      }`}
                    >
                      {connectedMap[cand.name] ? 'Connected' : 'Connect / Invite'}
                    </button>
                    <button
                      onClick={() => navigate(`/profile/${cand.id}`)}
                      className="px-4 py-1.5 rounded-lg border border-surface-border bg-white dark:bg-surface-subtle hover:bg-surface-subtle text-brand-navy text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="flex flex-col gap-3">
              {paginatedCandidates.map((cand) => (
                <div
                  key={cand.id}
                  className="p-4 sm:p-5 rounded-xl bg-surface border border-surface-border shadow-xs hover:border-slate-300 dark:hover:border-stone-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <img
                      alt={cand.name}
                      src={cand.avatar}
                      className="w-12 h-12 rounded-xl object-cover border border-surface-border shrink-0"
                    />
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-brand-navy text-sm">
                          {cand.name}
                        </h4>
                        <CheckCircle2 size={14} className="text-accent-emerald fill-accent-emerald/20" />
                        <span className="text-xs text-brand-muted">• {cand.dept}</span>
                        <span className="px-2 py-0.5 rounded-md bg-accent-emeraldBg text-accent-emerald border border-accent-emeraldBorder text-xs font-bold flex items-center gap-1 ml-auto sm:ml-0">
                          <Zap size={11} className="fill-current" />
                          {cand.matchScore}%
                        </span>
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-slate dark:text-slate-300">
                        {cand.role}
                      </p>
                      <p className="text-xs text-brand-muted line-clamp-1">
                        {cand.bio}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cand.skills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-surface-border text-xs font-medium text-brand-slate dark:text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* List Item Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-border">
                    <button
                      onClick={() => handleConnect(cand.name)}
                      disabled={connectedMap[cand.name]}
                      className={`w-full sm:w-36 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                        connectedMap[cand.name]
                          ? 'bg-accent-emerald text-white'
                          : 'bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white'
                      }`}
                    >
                      {connectedMap[cand.name] ? 'Connected' : 'Connect / Invite'}
                    </button>
                    <button
                      onClick={() => navigate(`/profile/${cand.id}`)}
                      className="w-full sm:w-36 py-1.5 px-3 rounded-lg border border-surface-border bg-white dark:bg-surface-subtle hover:bg-surface-subtle text-brand-navy text-xs font-semibold transition-colors cursor-pointer text-center"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-surface-border text-xs text-brand-muted">
            <span>
              Showing <strong className="text-brand-navy">{paginatedCandidates.length}</strong> of{' '}
              <strong className="text-brand-navy">{filteredCandidates.length}</strong> candidate(s)
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-surface-border bg-surface text-brand-slate disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle cursor-pointer transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-surface-border bg-surface text-brand-slate disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle cursor-pointer transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
