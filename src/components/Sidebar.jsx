import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  UserPlus,
  FolderOpen,
  Mail,
  Bell,
  Sliders,
  Menu,
  X,
  Share2,
  Sun,
  Moon,
  LogOut,
  PanelLeftClose
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useSidebar } from '../context/SidebarContext';

const navItems = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/projects', label: 'Explore Projects', icon: Compass },
  { to: '/find-teammates', label: 'Find Teammates', icon: UserPlus },
  { to: '/my-projects', label: 'My Projects', icon: FolderOpen },
  { to: '/requests', label: 'Requests', icon: Mail, badge: '3' },
];

export default function Sidebar() {
  const { user } = useAuth();
  const { dark, toggle } = useTheme();
  const { collapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-[#251f1a] border-b border-[#e7decb] dark:border-[#42372e] z-50 flex items-center justify-between px-4 transition-colors">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#b46b2b] flex items-center justify-center text-white shadow-xs">
            <Share2 size={16} />
          </div>
          <span className="font-bold text-[16px] text-[#2d231b] dark:text-[#f6efe6] tracking-tight">ProjectMatch</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-1.5 rounded-lg hover:bg-[#f5f0e6] dark:hover:bg-[#302821] text-[#2d231b] dark:text-[#dfd4c5] transition-colors"
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? <Sun size={18} className="text-[#f2cb9b]" /> : <Moon size={18} className="text-[#2d231b]" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-lg text-[#2d231b] dark:text-[#dfd4c5] hover:bg-[#f5f0e6] dark:hover:bg-[#302821] transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Fixed Airy Left Sidebar (Fully Dark-Mode Synchronized & Collapsible) */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-[#251f1a] border-r border-[#e7decb] dark:border-[#42372e] z-40 flex flex-col justify-between py-6 px-4 transition-all duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : collapsed ? '-translate-x-full' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-7">
          {/* Logo Branding & Hide Toggle */}
          <div className="flex items-center justify-between px-2">
            <Link to="/dashboard" className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#b46b2b] flex items-center justify-center text-white shadow-sm shrink-0">
                <Share2 size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-base text-[#2d231b] dark:text-[#f6efe6] tracking-tight leading-tight truncate">
                  ProjectMatch
                </span>
                <span className="text-[11px] text-[#7d6e61] dark:text-[#aa9c8e] uppercase font-semibold tracking-wider">
                  Campus Network
                </span>
              </div>
            </Link>

            {/* Desktop Sidebar Toggle Button */}
            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden lg:flex p-1.5 rounded-lg text-[#7d6e61] hover:text-[#2d231b] dark:text-[#aa9c8e] dark:hover:text-white hover:bg-[#f5f0e6] dark:hover:bg-[#302821] transition-colors cursor-pointer shrink-0 ml-1"
              title="Hide Sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 text-sm font-medium">
            {navItems.map(({ to, label, icon: Icon, badge }) => {
              const isActive = location.pathname === to;
              return (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#b46b2b] hover:bg-[#9c5921] text-white shadow-sm shadow-[#b46b2b]/25 font-semibold'
                      : 'text-[#4a3e35] dark:text-[#dfd4c5] hover:bg-[#f5f0e6] dark:hover:bg-[#302821] hover:text-[#2d231b] dark:hover:text-white font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? 'text-white' : 'text-[#7d6e61] dark:text-[#aa9c8e]'} />
                    <span className={isActive ? 'text-white font-semibold' : 'text-[#2d231b] dark:text-[#f6efe6] font-medium'}>
                      {label}
                    </span>
                  </div>
                  {badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold border transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white border-white/20'
                          : 'bg-[#f5f0e6] dark:bg-[#302821] text-[#2d231b] dark:text-[#f6efe6] border-[#e7decb] dark:border-[#42372e]'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Secondary Links & Profile Card */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5 border-t border-[#e7decb] dark:border-[#42372e] pt-3 text-sm font-medium">
            <Link
              to="/requests"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#4a3e35] dark:text-[#dfd4c5] hover:bg-[#f5f0e6] dark:hover:bg-[#302821] hover:text-[#2d231b] dark:hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-[#7d6e61] dark:text-[#aa9c8e]" />
                <span>Notifications</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            </Link>

            <button
              onClick={toggle}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#4a3e35] dark:text-[#dfd4c5] hover:bg-[#f5f0e6] dark:hover:bg-[#302821] hover:text-[#2d231b] dark:hover:text-white transition-colors w-full text-left cursor-pointer"
              title="Toggle Light/Dark Theme"
            >
              <div className="flex items-center gap-3">
                {dark ? (
                  <Sun size={18} className="text-[#f2cb9b]" />
                ) : (
                  <Moon size={18} className="text-[#7d6e61]" />
                )}
                <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#f5f0e6] dark:bg-[#302821] border border-[#e7decb] dark:border-[#42372e] text-[#2d231b] dark:text-[#dfd4c5]">
                {dark ? 'Dark' : 'Light'}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-between px-3 py-2 rounded-lg text-[#4a3e35] dark:text-[#dfd4c5] hover:bg-[#f5f0e6] dark:hover:bg-[#302821] hover:text-[#2d231b] dark:hover:text-white transition-colors w-full text-left cursor-pointer"
              title="Hide Sidebar"
            >
              <div className="flex items-center gap-3">
                <PanelLeftClose size={18} className="text-[#7d6e61] dark:text-[#aa9c8e]" />
                <span>Hide Sidebar</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface border border-surface-border text-[#7d6e61]">
                Hide
              </span>
            </button>

            <Link
              to="/settings"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4a3e35] dark:text-[#dfd4c5] hover:bg-[#f5f0e6] dark:hover:bg-[#302821] hover:text-[#2d231b] dark:hover:text-white transition-colors"
            >
              <Sliders size={18} className="text-[#7d6e61] dark:text-[#aa9c8e]" />
              <span>Settings</span>
            </Link>

            <Link
              to="/signout"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <LogOut size={18} className="text-rose-500 dark:text-rose-400" />
              <span>Sign Out</span>
            </Link>
          </div>

          {/* Profile Pill Card */}
          <Link
            to="/profile"
            onClick={() => setMobileOpen(false)}
            className="p-2.5 rounded-xl bg-[#f5f0e6] dark:bg-[#302821] border border-[#e7decb] dark:border-[#42372e] hover:border-[#b46b2b] dark:hover:border-[#c97e3c] transition-all flex items-center justify-between gap-2.5"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#b46b2b] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'SP'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-[#2d231b] dark:text-[#f6efe6] truncate leading-tight">
                  {user?.name || 'Surya Prakash'}
                </span>
                <span className="text-xs text-[#7d6e61] dark:text-[#aa9c8e] truncate">
                  {user?.department || 'CSE'} · {user?.year || '3rd'} Year
                </span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800 shrink-0">
              94%
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
}
