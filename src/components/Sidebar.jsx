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
  SlidersHorizontal
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

// Custom 3-hyphens (hamburger) icon with crisp lines
function ThreeHyphensIcon({ className = '', size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export default function Sidebar() {
  const { user } = useAuth();
  const { dark, toggle } = useTheme();
  const { collapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
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
            className="p-1.5 rounded-lg text-[#2d231b] dark:text-[#dfd4c5] hover:bg-[#f5f0e6] dark:hover:bg-[#302821] transition-colors cursor-pointer"
            title="Toggle Menu"
          >
            {mobileOpen ? <X size={20} /> : <ThreeHyphensIcon size={20} />}
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

      {/* Desktop & Mobile Sidebar
          - When expanded: w-64
          - When collapsed (desktop): w-20 (keeps icons visible along the side)
      */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-[#251f1a] border-r border-[#e7decb] dark:border-[#42372e] z-40 flex flex-col justify-between py-5 transition-all duration-300 ease-in-out ${
          collapsed ? 'lg:w-20 px-2.5' : 'lg:w-64 px-4'
        } ${
          mobileOpen ? 'translate-x-0 w-64 px-4' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Logo Branding & 3-Hyphens Collapse Toggle */}
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-1`}>
            {/* Show Logo only when expanded, or icon when collapsed */}
            {!collapsed ? (
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
            ) : (
              <Link to="/dashboard" className="hidden lg:flex" title="ProjectMatch">
                <div className="w-8 h-8 rounded-lg bg-[#b46b2b] flex items-center justify-center text-white shadow-sm shrink-0">
                  <Share2 size={18} />
                </div>
              </Link>
            )}

            {/* Desktop 3-Hyphens Toggle Button */}
            <button
              type="button"
              onClick={toggleSidebar}
              className={`hidden lg:flex p-2 rounded-xl text-[#7d6e61] hover:text-[#2d231b] dark:text-[#aa9c8e] dark:hover:text-white hover:bg-[#f5f0e6] dark:hover:bg-[#302821] transition-colors cursor-pointer shrink-0 ${
                collapsed ? 'mt-2' : 'ml-1'
              }`}
              title={collapsed ? 'Expand Menu' : 'Collapse Menu (3 hyphens)'}
            >
              <ThreeHyphensIcon size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 text-sm font-medium">
            {navItems.map(({ to, label, icon: Icon, badge }) => {
              const isActive = location.pathname === to;
              return (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  title={label}
                  className={`flex items-center rounded-xl transition-all ${
                    collapsed
                      ? 'justify-center p-3 relative group'
                      : 'justify-between px-3.5 py-2.5'
                  } ${
                    isActive
                      ? 'bg-[#b46b2b] hover:bg-[#9c5921] text-white shadow-sm shadow-[#b46b2b]/25 font-semibold'
                      : 'text-[#4a3e35] dark:text-[#dfd4c5] hover:bg-[#f5f0e6] dark:hover:bg-[#302821] hover:text-[#2d231b] dark:hover:text-white font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={isActive ? 'text-white' : 'text-[#7d6e61] dark:text-[#aa9c8e]'} />
                    {!collapsed && (
                      <span className={isActive ? 'text-white font-semibold' : 'text-[#2d231b] dark:text-[#f6efe6] font-medium'}>
                        {label}
                      </span>
                    )}
                  </div>

                  {/* Badge or indicator */}
                  {badge && (
                    !collapsed ? (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold border transition-colors ${
                          isActive
                            ? 'bg-white/20 text-white border-white/20'
                            : 'bg-[#f5f0e6] dark:bg-[#302821] text-[#2d231b] dark:text-[#f6efe6] border-[#e7decb] dark:border-[#42372e]'
                        }`}
                      >
                        {badge}
                      </span>
                    ) : (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500" />
                    )
                  )}

                  {/* Tooltip on hover when collapsed */}
                  {collapsed && (
                    <div className="hidden lg:group-hover:block absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#2d231b] dark:bg-[#3a3028] text-white text-xs font-semibold whitespace-nowrap shadow-lg z-50">
                      {label}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Secondary Links & Profile */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 border-t border-[#e7decb] dark:border-[#42372e] pt-3 text-sm font-medium">
            {/* Notifications */}
            <Link
              to="/requests"
              onClick={() => setMobileOpen(false)}
              title="Notifications"
              className={`flex items-center rounded-xl text-[#4a3e35] dark:text-[#dfd4c5] hover:bg-[#f5f0e6] dark:hover:bg-[#302821] hover:text-[#2d231b] dark:hover:text-white transition-colors relative group ${
                collapsed ? 'justify-center p-3' : 'justify-between px-3 py-2'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-[#7d6e61] dark:text-[#aa9c8e]" />
                {!collapsed && <span>Notifications</span>}
              </div>
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              {collapsed && (
                <div className="hidden lg:group-hover:block absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#2d231b] dark:bg-[#3a3028] text-white text-xs font-semibold whitespace-nowrap shadow-lg z-50">
                  Notifications
                </div>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggle}
              title={dark ? 'Light Mode' : 'Dark Mode'}
              className={`flex items-center rounded-xl text-[#4a3e35] dark:text-[#dfd4c5] hover:bg-[#f5f0e6] dark:hover:bg-[#302821] hover:text-[#2d231b] dark:hover:text-white transition-colors cursor-pointer relative group ${
                collapsed ? 'justify-center p-3' : 'justify-between px-3 py-2 w-full text-left'
              }`}
            >
              <div className="flex items-center gap-3">
                {dark ? (
                  <Sun size={20} className="text-[#f2cb9b]" />
                ) : (
                  <Moon size={20} className="text-[#7d6e61]" />
                )}
                {!collapsed && <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>}
              </div>
              {!collapsed && (
                <span className="text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#f5f0e6] dark:bg-[#302821] border border-[#e7decb] dark:border-[#42372e] text-[#2d231b] dark:text-[#dfd4c5]">
                  {dark ? 'Dark' : 'Light'}
                </span>
              )}
              {collapsed && (
                <div className="hidden lg:group-hover:block absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#2d231b] dark:bg-[#3a3028] text-white text-xs font-semibold whitespace-nowrap shadow-lg z-50">
                  {dark ? 'Switch to Light' : 'Switch to Dark'}
                </div>
              )}
            </button>

            {/* Settings */}
            <Link
              to="/settings"
              onClick={() => setMobileOpen(false)}
              title="Settings"
              className={`flex items-center rounded-xl text-[#4a3e35] dark:text-[#dfd4c5] hover:bg-[#f5f0e6] dark:hover:bg-[#302821] hover:text-[#2d231b] dark:hover:text-white transition-colors relative group ${
                collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2'
              }`}
            >
              <Sliders size={20} className="text-[#7d6e61] dark:text-[#aa9c8e]" />
              {!collapsed && <span>Settings</span>}
              {collapsed && (
                <div className="hidden lg:group-hover:block absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#2d231b] dark:bg-[#3a3028] text-white text-xs font-semibold whitespace-nowrap shadow-lg z-50">
                  Settings
                </div>
              )}
            </Link>

            {/* Sign Out */}
            <Link
              to="/signout"
              onClick={() => setMobileOpen(false)}
              title="Sign Out"
              className={`flex items-center rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors relative group ${
                collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2'
              }`}
            >
              <LogOut size={20} className="text-rose-500 dark:text-rose-400" />
              {!collapsed && <span>Sign Out</span>}
              {collapsed && (
                <div className="hidden lg:group-hover:block absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#2d231b] dark:bg-[#3a3028] text-white text-xs font-semibold whitespace-nowrap shadow-lg z-50">
                  Sign Out
                </div>
              )}
            </Link>
          </div>

          {/* Profile Card */}
          <Link
            to="/profile"
            onClick={() => setMobileOpen(false)}
            title="My Profile"
            className={`rounded-xl bg-[#f5f0e6] dark:bg-[#302821] border border-[#e7decb] dark:border-[#42372e] hover:border-[#b46b2b] dark:hover:border-[#c97e3c] transition-all flex items-center ${
              collapsed ? 'justify-center p-2.5 relative group' : 'justify-between p-2.5 gap-2.5'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#b46b2b] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'SP'}
              </div>
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-[#2d231b] dark:text-[#f6efe6] truncate leading-tight">
                    {user?.name || 'Surya Prakash'}
                  </span>
                  <span className="text-xs text-[#7d6e61] dark:text-[#aa9c8e] truncate">
                    {user?.department || 'CSE'} · {user?.year || '3rd'} Year
                  </span>
                </div>
              )}
            </div>
            {!collapsed && (
              <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800 shrink-0">
                94%
              </span>
            )}
            {collapsed && (
              <div className="hidden lg:group-hover:block absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#2d231b] dark:bg-[#3a3028] text-white text-xs font-semibold whitespace-nowrap shadow-lg z-50">
                {user?.name || 'My Profile'}
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}
