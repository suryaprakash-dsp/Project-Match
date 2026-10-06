import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, Users, Briefcase,
  LogOut, Settings, UserCircle, Menu, X, PlusCircle, ChevronDown, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import NotificationDropdown from './NotificationDropdown';

const navLinks = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/projects', label: 'Explore Projects', icon: FolderKanban },
  { to: '/find-teammates', label: 'Find Teammates', icon: Users },
  { to: '/my-projects', label: 'My Projects', icon: Briefcase },
  { to: '/requests', label: 'Join Requests', icon: Bell },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 transition-all">
        <div className="flex items-center justify-between">
          
          {/* LEFT OF THE PAGE: Brand Logo + Primary Navigations grouped cleanly together */}
          <div className="flex items-center gap-3 lg:gap-5 min-w-0">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 flex items-center justify-center shadow-md p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-indigo-400 to-cyan-300 animate-pulse" />
                </div>
              </div>
              <span className="font-extrabold tracking-tight text-brand-navy text-base sm:text-lg">
                PROJECT<span className="text-indigo-600 dark:text-indigo-400">MATCH</span>
              </span>
            </Link>

            {/* Version Badge */}
            <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80">
              v2.5 PRO
            </span>

            {/* Navigations positioned to the LEFT: Home, Explore Projects, Find Teammates, My Projects, Join Requests */}
            <nav className="hidden lg:flex items-center gap-1 ml-2">
              {navLinks.map(({ to, label }) => {
                const isActive = location.pathname === to;
                return (
                  <NavLink
                    key={to}
                    to={to}
                    className={isActive ? 'nav-pill-active' : 'nav-pill'}
                  >
                    {label}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* RIGHT ACTIONS: Status, Theme, Notifications, Deploy CTA, Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Status Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Live Match:</span>
              <span className="font-bold text-emerald-900 dark:text-emerald-200">Active</span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-sm"
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark ? '☀️' : '🌙'}
            </button>

            {/* Notifications */}
            <NotificationDropdown />

            {/* Quick Action: New Project CTA */}
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 btn-primary text-xs font-semibold px-3.5 py-1.5"
            >
              <PlusCircle size={14} className="shrink-0" />
              <span>New Project</span>
            </Link>

            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(o => !o)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-indigo-500/30 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs font-bold">
                    {user?.name?.charAt(0) || 'S'}
                  </span>
                </div>
                <ChevronDown size={13} className="text-slate-500 dark:text-slate-400 hidden sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-11 w-56 card p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 border border-slate-200 dark:border-slate-800">
                  <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 mb-1">
                    <p className="text-xs font-bold text-brand-navy truncate">{user?.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <UserCircle size={15} /> My Profile
                    </Link>
                    <Link
                      to="/my-projects"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <Briefcase size={15} /> My Projects
                    </Link>
                    <Link
                      to="/requests"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <Bell size={15} /> Join Requests
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <Settings size={15} /> Settings
                    </Link>
                    <div className="border-t border-slate-200 dark:border-slate-800 my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors w-full text-left font-medium"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-1.5 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {menuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 pt-3 mt-3 space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {Icon && <Icon size={16} />}
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
