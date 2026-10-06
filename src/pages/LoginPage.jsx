import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, Share2, Sparkles, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: 'surya@college.edu', password: 'password123' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(form.email || 'surya@college.edu', form.password || 'demo');
    setLoading(false);
    if (result.success) navigate('/dashboard');
    else setError(result.error || 'Login failed');
  };

  const handleQuickDemo = async (demoEmail) => {
    setForm({ email: demoEmail, password: 'password123' });
    setLoading(true);
    const result = await login(demoEmail, 'password123');
    setLoading(false);
    if (result.success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-canvas p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
      {/* Top Simple Brand Header */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1b2238] flex items-center justify-center text-white shadow-xs">
            <Share2 size={18} />
          </div>
          <span className="font-extrabold text-[17px] text-brand-navy tracking-tight">
            ProjectMatch
          </span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-brand-muted">New student?</span>
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-bold"
          >
            Create Account
          </Link>
        </div>
      </header>

      {/* Main Solid Surface Container */}
      <main className="max-w-4xl w-full mx-auto my-auto py-6">
        <div className="bg-surface border border-surface-border rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Brand Showcase Panel — Solid Midnight Navy */}
          <div className="lg:w-1/2 p-8 sm:p-10 bg-[#1b2238] text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/15">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Fall 2026 Academic Term</span>
              </div>
            </div>

            <div className="py-8 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Find your project squad. Build something real.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                ProjectMatch connects college students by verified skills, department compatibility, and schedule availability.
              </p>

              {/* Quick Feature Checklist */}
              <div className="space-y-2 pt-2 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check size={11} />
                  </div>
                  <span>Academic Affinity Scoring (94% Average Match)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check size={11} />
                  </div>
                  <span>148+ Curated Capstones & Research Teams</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check size={11} />
                  </div>
                  <span>Instant 1-Click Join Applications</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Campus Verified • Department Authenticated</span>
            </div>
          </div>

          {/* Right Form Panel — Clean White Surface */}
          <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center bg-surface">
            <div className="max-w-sm w-full mx-auto space-y-5">
              
              {/* Header Title */}
              <div>
                <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight mb-1">
                  Student Sign In
                </h1>
                <p className="text-xs text-brand-muted font-normal">
                  Enter your credentials or choose a 1-click test student profile
                </p>
              </div>

              {/* Quick Demo Logins Bar */}
              <div className="p-3 bg-surface-subtle border border-surface-border rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-brand-navy">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-500" />
                    <span>Quick Demo Sign-In:</span>
                  </span>
                  <span className="text-[10px] text-brand-muted font-semibold">1-Click</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('surya@college.edu')}
                    className="p-2 rounded-lg bg-surface border border-surface-border hover:border-[#1b2238] text-left transition-all cursor-pointer shadow-xs"
                  >
                    <p className="font-bold text-xs text-brand-navy truncate">Surya (CSE)</p>
                    <p className="text-[10px] text-brand-muted">Full-Stack Dev</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('priya@college.edu')}
                    className="p-2 rounded-lg bg-surface border border-surface-border hover:border-[#1b2238] text-left transition-all cursor-pointer shadow-xs"
                  >
                    <p className="font-bold text-xs text-brand-navy truncate">Priya (CSE)</p>
                    <p className="text-[10px] text-brand-muted">UI/UX Designer</p>
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-brand-navy mb-1.5 block">
                    Campus Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      className="input-field pl-9 text-sm"
                      placeholder="surya@college.edu"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-brand-navy">
                      Password
                    </label>
                    <button type="button" className="text-xs text-blue-600 hover:underline font-semibold">
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      className="input-field pl-9 pr-9 text-sm"
                      placeholder="••••••••••••"
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      onClick={() => setShowPass(s => !s)}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-brand-muted">
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-[#1b2238] focus:ring-[#1b2238]"
                    />
                    <span>Remember this session</span>
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold">SSL Encrypted</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white text-sm font-semibold shadow-xs hover:shadow-[#b46b2b]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Verifying with Backend...' : 'Sign In to Dashboard'}</span>
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>

              <div className="pt-2 text-center space-y-2">
                <p className="text-xs text-brand-muted font-medium">
                  Don't have a profile yet?{' '}
                  <Link to="/register" className="text-[#b46b2b] font-bold hover:underline">
                    Create Student Profile
                  </Link>
                </p>
                <p className="text-xs text-brand-muted font-medium">
                  Need to confirm registration?{' '}
                  <Link to="/verify-otp" className="text-[#b46b2b] font-bold hover:underline">
                    Enter Email OTP Code →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-brand-muted py-3">
        © 2026 ProjectMatch. Built for college student project teams.
      </footer>
    </div>
  );
}
