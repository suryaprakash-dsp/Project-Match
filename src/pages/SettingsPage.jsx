import React, { useState } from 'react';
import { User, Code2, Heart, Palette, Save, Sliders } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import SkillBadge from '../components/SkillBadge';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { allSkills, departments } from '../data/mockSkills';

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'PG'];
const categories = ['AI & Education', 'Smart Education', 'Health Tech', 'Environmental Tech', 'Career Tech', 'IoT & Smart Systems', 'Cybersecurity', 'EdTech'];

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { dark, toggle } = useTheme();
  const { toast, toasts, removeToast } = useToast();
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({
    name: user?.name || '',
    department: user?.department || 'CSE',
    year: user?.year?.toString() || '3',
    bio: user?.bio || '',
    role: user?.role || '',
  });
  const [skills, setSkills] = useState(user?.skills || []);
  const [skillInput, setSkillInput] = useState('');
  const [prefs, setPrefs] = useState(user?.interests || []);
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateUser({ ...profile, year: parseInt(profile.year) || 3 });
    setSaving(false);
    toast.success('Profile saved successfully!');
  };

  const handleSaveSkills = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateUser({ skills });
    setSaving(false);
    toast.success('Skills updated!');
  };

  const handleSavePrefs = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateUser({ interests: prefs });
    setSaving(false);
    toast.success('Preferences saved!');
  };

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) setSkills(prev => [...prev, skill]);
    setSkillInput('');
  };

  const removeSkill = (skill) => setSkills(prev => prev.filter(s => s !== skill));

  const togglePref = (cat) =>
    setPrefs(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'preferences', label: 'Preferences', icon: Heart },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Toast toasts={toasts} removeToast={removeToast} />
      
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>CONFIGURATIONS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b2238] tracking-tight">
          System Settings
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-0.5 font-normal">
          Customize your student credentials, verified skills, and UI display mode.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="card h-fit lg:col-span-1 p-2 space-y-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all text-left ${
                activeSection === id
                  ? 'bg-[#1b2238] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-[#f8f6f0]'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === 'profile' && (
            <div className="card space-y-5">
              <h2 className="text-lg font-bold text-brand-navy">Profile Settings</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Full Name</label>
                  <input className="input-field" value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Role / Title</label>
                  <input className="input-field" value={profile.role}
                    onChange={e => setProfile(p => ({ ...p, role: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Department</label>
                  <select className="input-field" value={profile.department}
                    onChange={e => setProfile(p => ({ ...p, department: e.target.value }))}>
                    {departments.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Year</label>
                  <select className="input-field" value={profile.year}
                    onChange={e => setProfile(p => ({ ...p, year: e.target.value }))}>
                    {['1', '2', '3', '4'].map(y => <option key={y} value={y}>{y}{y === '1' ? 'st' : y === '2' ? 'nd' : y === '3' ? 'rd' : 'th'} Year</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Bio</label>
                <textarea className="input-field resize-none h-24 text-sm" value={profile.bio}
                  onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                  placeholder="Tell others about yourself..." />
              </div>
              <Button variant="primary" icon={Save} loading={saving} onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          )}

          {activeSection === 'skills' && (
            <div className="card space-y-5">
              <h2 className="text-lg font-bold text-brand-navy">Your Skills & Capabilities</h2>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">Active Skills</label>
                <div className="flex flex-wrap gap-2 mb-4 min-h-12 p-3 bg-slate-100/70 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  {skills.length === 0 && <span className="text-xs text-slate-500">No skills added yet</span>}
                  {skills.map(skill => (
                    <SkillBadge key={skill} skill={skill} removable onRemove={removeSkill} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">Add New Skills</label>
                <div className="flex gap-2 mb-3">
                  <input
                    className="input-field"
                    placeholder="Type a skill and press Enter..."
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput.trim()); } }}
                  />
                  <Button variant="outline" onClick={() => addSkill(skillInput.trim())}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allSkills.filter(s => !skills.includes(s)).slice(0, 16).map(skill => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
              <Button variant="primary" icon={Save} loading={saving} onClick={handleSaveSkills}>Save Skills</Button>
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="card space-y-5">
              <h2 className="text-lg font-bold text-brand-navy">Project Domain Preferences</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Select project categories you are most passionate about.</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => togglePref(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      prefs.includes(cat)
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <Button variant="primary" icon={Save} loading={saving} onClick={handleSavePrefs}>Save Preferences</Button>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="card space-y-6">
              <h2 className="text-lg font-bold text-brand-navy">Appearance & Theme</h2>
              <div className="flex items-center justify-between p-4 bg-slate-100/70 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="font-bold text-brand-navy text-sm">Theme Mode</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Toggle between Light and Dark interface styles</p>
                </div>
                <button
                  onClick={toggle}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    dark ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    dark ? 'translate-x-6' : ''
                  }`} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => dark && toggle()}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    !dark ? 'border-indigo-600 bg-indigo-50/60' : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="text-2xl mb-1">☀️</div>
                  <p className="font-bold text-brand-navy text-sm">Light Theme</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Crisp, clean, and bright</p>
                </div>
                <div
                  onClick={() => !dark && toggle()}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    dark ? 'border-indigo-500 bg-indigo-950/40' : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="text-2xl mb-1">🌙</div>
                  <p className="font-bold text-brand-navy text-sm">Dark Theme</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">High contrast and sleek</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
