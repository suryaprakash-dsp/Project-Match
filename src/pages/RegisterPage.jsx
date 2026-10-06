import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { departments } from '../data/mockSkills';

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'PG'];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', department: 'CSE', year: '3rd Year' });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields (Name, Email, Password)');
      return;
    }
    setLoading(true);

    // Format academic_year e.g. "3rd", "2nd", "1st", "4th"
    const yrNum = form.year ? form.year.split(' ')[0].replace(/\D/g, '') : '3';
    const suffix = yrNum === '1' ? '1st' : yrNum === '2' ? '2nd' : yrNum === '3' ? '3rd' : `${yrNum}th`;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      department: (form.department || 'cse').toLowerCase(),
      academic_year: suffix,
      skills: selectedSkills.length > 0 ? selectedSkills : ['java', 'python']
    };

    const result = await register(payload);
    setLoading(false);

    if (result.success) {
      // Direct immediately to OTP verification screen
      navigate(`/verify-otp?email=${encodeURIComponent(form.email.trim())}`, {
        state: { email: form.email.trim() }
      });
    } else {
      setError(result.error || 'Registration failed. Please check your backend connection.');
    }
  };

  const previewSkills = ['java', 'python', 'React', 'C++', 'Node.js', 'MongoDB', 'UI/UX', 'Machine Learning', 'Cybersecurity', 'Flutter', 'TypeScript', 'Docker'];

  return (
    <div className="min-h-screen bg-canvas p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Clean Solid Surface Container */}
      <div className="w-full max-w-4xl bg-surface border border-surface-border rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Brand Panel — Solid Midnight Navy */}
        <div className="lg:w-5/12 p-8 sm:p-10 bg-[#1b2238] text-white flex flex-col justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-white">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                <Share2 size={18} />
              </div>
              <span className="tracking-tight">PROJECTMATCH</span>
            </Link>
          </div>

          <div className="py-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/15">
              <span>Student Registration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Start building your project team.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              Create your profile and get matched with the perfect teammates for your next big project.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Campus Network • Zero Hassle</span>
          </div>
        </div>

        {/* Right Form Panel — Clean White Surface */}
        <div className="lg:w-7/12 p-6 sm:p-10 flex flex-col justify-center bg-surface overflow-y-auto">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-brand-navy tracking-tight mb-1">
              Create Student Profile
            </h1>
            <p className="text-xs text-brand-muted mb-5 font-normal">
              Select your skills to activate automatic compatibility recommendations
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-brand-navy mb-1 block">Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input className="input-field pl-9 text-xs sm:text-sm py-2" placeholder="Surya Prakash" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-navy mb-1 block">Campus Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" className="input-field pl-9 text-xs sm:text-sm py-2" placeholder="you@college.edu" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-navy mb-1 block">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type={showPass ? 'text' : 'password'} className="input-field pl-9 pr-9 text-xs sm:text-sm py-2" placeholder="Choose a secure password" value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" onClick={() => setShowPass(s => !s)}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-brand-navy mb-1 block">Department</label>
                  <select className="input-field text-xs sm:text-sm py-2 cursor-pointer" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}>
                    {departments.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-brand-navy mb-1 block">Academic Year</label>
                  <select className="input-field text-xs sm:text-sm py-2 cursor-pointer" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}>
                    {years.map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Skills Tags */}
              <div>
                <label className="text-xs font-semibold text-brand-navy mb-1.5 block">Select Technical Skills</label>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1 bg-surface-subtle border border-surface-border rounded-lg">
                  {previewSkills.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                        selectedSkills.includes(skill)
                          ? 'bg-[#b46b2b] border-[#b46b2b] text-white'
                          : 'bg-surface border-surface-border text-brand-slate hover:border-slate-400'
                      }`}
                    >
                      {selectedSkills.includes(skill) ? '✓ ' : ''}{skill}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-[#b46b2b]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Submitting to Campus Registry...' : 'Register & Receive OTP'}</span>
                {!loading && <ArrowRight size={15} />}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-surface-border text-center">
              <p className="text-xs text-brand-muted">
                Already registered?{' '}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
