import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Users, Code2, Sparkles,
  ChevronRight, ShieldCheck, Zap,
  FolderKanban, Check, Share2
} from 'lucide-react';
import { popularSkills } from '../data/mockSkills';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas text-brand-slate font-sans antialiased flex flex-col">
      {/* Top Navbar */}
      <header className="bg-surface border-b border-surface-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand & Left Nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1b2238] dark:bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <Share2 size={18} />
              </div>
              <span className="font-extrabold text-[18px] text-brand-navy tracking-tight">
                ProjectMatch
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-surface-subtle text-brand-navy border border-surface-border">
              v2.5 PRO
            </span>

            <nav className="hidden md:flex items-center gap-1">
              <Link to="/dashboard" className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-surface-subtle hover:text-brand-navy transition-colors">
                Dashboard
              </Link>
              <Link to="/projects" className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-surface-subtle hover:text-brand-navy transition-colors">
                Explore Projects
              </Link>
              <Link to="/find-teammates" className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-surface-subtle hover:text-brand-navy transition-colors">
                Find Teammates
              </Link>
              <a href="#how-it-works" className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-surface-subtle hover:text-brand-navy transition-colors">
                How It Works
              </a>
            </nav>
          </div>

          {/* Right Status & Auth CTAs */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Campus Match Active</span>
            </div>

            <Link
              to="/login"
              className="text-xs sm:text-sm font-semibold text-brand-navy hover:text-blue-600 px-3 py-1.5 transition-colors"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="btn-primary text-xs sm:text-sm font-semibold px-4 py-2 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-16 sm:pt-20 pb-16 flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-surface border border-surface-border text-brand-navy shadow-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="tracking-wide uppercase text-[10px] sm:text-[11px] font-bold">
            SMART STUDENT TEAM FINDER
          </span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-brand-muted font-medium">
            Find Complementary Skills For Your Next Project
          </span>
          <ChevronRight size={13} className="text-brand-muted" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy tracking-tight max-w-4xl leading-[1.15] mb-5">
          Find the Right People for Your Next College Project.
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed mb-8 font-normal">
          Build better capstones, research projects, and hackathon teams with students who have the exact complementary skills you need.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          <Link
            to="/find-teammates"
            className="btn-primary text-sm sm:text-base px-6 py-3 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Find Teammates</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/projects"
            className="btn-secondary text-sm sm:text-base px-6 py-3 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <FolderKanban size={16} className="text-[#1b2238] dark:text-white" />
            <span>Explore Projects</span>
          </Link>
        </div>

        {/* 4-METRIC SOLID SURFACE BAR */}
        <div className="w-full max-w-4xl card p-6 sm:p-7 shadow-xs mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-surface-border">
            
            <div className="pt-2 md:pt-0 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
                2,500+
              </p>
              <p className="text-xs text-brand-muted mt-1 font-semibold">
                Active Students
              </p>
            </div>

            <div className="pt-2 md:pt-0 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                94%
              </p>
              <p className="text-xs text-brand-muted mt-1 font-semibold">
                Average Match Fit
              </p>
            </div>

            <div className="pt-4 md:pt-0 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
                650+
              </p>
              <p className="text-xs text-brand-muted mt-1 font-semibold">
                Indexed Projects
              </p>
            </div>

            <div className="pt-4 md:pt-0 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
                480+
              </p>
              <p className="text-xs text-brand-muted mt-1 font-semibold">
                Teams Formed
              </p>
            </div>

          </div>
        </div>

        {/* INTERACTIVE PREVIEW SHOWCASE */}
        <div className="w-full max-w-4xl card p-6 sm:p-8 text-left shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-surface-border gap-3">
            <div>
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Live Match Engine
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-brand-navy mt-0.5">
                Complementary Skill Matching Demonstration
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                ● Real-Time Scoring
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            
            {/* Card 1: Your Profile */}
            <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1b2238] dark:bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm">Surya Prakash</h4>
                    <p className="text-xs text-brand-muted font-medium">CSE • 3rd Year</p>
                  </div>
                </div>
                <p className="text-xs font-semibold text-brand-navy mb-2">My Core Skills:</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['React', 'Node.js', 'MongoDB', 'Tailwind'].map(s => (
                    <span key={s} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface border border-surface-border text-brand-slate">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2.5 border-t border-surface-border text-xs text-brand-muted">
                Seeking: <strong className="text-brand-navy">ML + Computer Vision</strong>
              </div>
            </div>

            {/* Card 2: Match Engine Center */}
            <div className="p-4 rounded-xl bg-surface border-2 border-emerald-500/40 dark:border-emerald-500/30 flex flex-col justify-center items-center text-center space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">94% Match</span>
                <p className="text-xs font-bold text-brand-navy">
                  High Skill Complementarity
                </p>
              </div>
              <div className="w-full space-y-1 text-xs text-brand-muted pt-2 border-t border-surface-border font-medium">
                <p className="flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <Check size={13} /> 3 Matching Core Requirements
                </p>
                <p className="flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <Check size={13} /> Same Department Cohort
                </p>
              </div>
            </div>

            {/* Card 3: Recommended Teammate */}
            <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1b2238] dark:bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    R
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm">Rahul Kumar</h4>
                    <p className="text-xs text-brand-muted font-medium">CSE • 3rd Year</p>
                  </div>
                </div>
                <p className="text-xs font-semibold text-brand-navy mb-2">Teammate Skills:</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['Python', 'Machine Learning', 'TensorFlow', 'SQL'].map(s => (
                    <span key={s} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2.5 border-t border-surface-border">
                <Link to="/find-teammates" className="btn-primary w-full text-xs py-1.5 font-bold cursor-pointer">
                  Connect With Rahul
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 bg-surface border-t border-surface-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-surface-subtle text-brand-navy border border-surface-border">
              SIMPLE 3-STEP PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3">
              How ProjectMatch Works
            </h2>
            <p className="text-brand-muted mt-2 text-sm sm:text-base font-normal">
              Form high-performing student project teams in three simple, transparent steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                num: '01',
                title: 'Create Your Profile',
                desc: 'Add your skills, tech stack, college department, and the types of projects you love to build.',
                icon: Code2,
              },
              {
                num: '02',
                title: 'Discover Projects & Skills',
                desc: 'Browse active college projects or find peers with skills that complement your own expertise.',
                icon: Sparkles,
              },
              {
                num: '03',
                title: 'Build Your Team',
                desc: 'Send join requests with 1 click, accept incoming teammates, and track milestones collaboratively.',
                icon: Users,
              },
            ].map(({ num, title, desc, icon: Icon }) => (
              <div key={num} className="card p-6 shadow-xs hover:border-slate-400 transition-colors">
                <span className="text-3xl font-black text-slate-300 dark:text-slate-600 font-mono mb-2 block">
                  {num}
                </span>
                <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-surface-border flex items-center justify-center text-brand-navy mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-brand-navy text-base mb-1.5">{title}</h3>
                <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR SKILLS SECTION */}
      <section className="py-14 bg-surface-subtle border-t border-surface-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-brand-navy mb-1.5">
            Popular Technologies & Stacks
          </h3>
          <p className="text-sm text-brand-muted mb-6 font-normal">
            Students across computer science, IT, electronics, and design are collaborating in these skills
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularSkills.map(skill => (
              <span
                key={skill}
                className="px-3.5 py-1.5 rounded-lg bg-surface border border-surface-border text-xs font-semibold text-brand-slate shadow-xs cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 text-center bg-surface border-t border-surface-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-8 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Ready to find your project team?
          </h2>
          <p className="text-brand-muted text-sm sm:text-base font-normal">
            Join thousands of college students building impactful projects together.
          </p>
          <div className="flex justify-center pt-2">
            <Link to="/register" className="btn-primary text-base px-7 py-3 flex items-center gap-2 cursor-pointer shadow-xs">
              <span>Get Started Free</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto py-6 bg-surface border-t border-surface-border text-xs text-brand-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-brand-navy">
            <div className="w-6 h-6 rounded-md bg-[#1b2238] dark:bg-blue-600 flex items-center justify-center text-white text-[11px]">
              P
            </div>
            <span>ProjectMatch</span>
          </div>
          <p>© 2026 ProjectMatch. Built for college students, by students.</p>
        </div>
      </footer>
    </div>
  );
}
