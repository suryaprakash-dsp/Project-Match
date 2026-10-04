import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Home, LogIn, Share2, ShieldCheck, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignOutPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Perform logout when navigating to this page
  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Simple Brand Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1b2238] flex items-center justify-center text-white shadow-xs">
            <Share2 size={18} />
          </div>
          <span className="font-extrabold text-[17px] text-brand-navy tracking-tight">
            ProjectMatch
          </span>
        </Link>
        <Link
          to="/login"
          className="text-xs sm:text-sm font-semibold text-brand-navy hover:text-blue-600 transition-colors"
        >
          Sign In
        </Link>
      </header>

      {/* Main Sign Out Confirmation Card */}
      <main className="max-w-md w-full mx-auto my-auto py-8">
        <div className="card p-8 text-center space-y-6 shadow-sm border border-surface-border">
          {/* Success Check Icon */}
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 size={32} />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-surface-subtle border border-surface-border text-brand-muted uppercase tracking-wider">
              <Lock size={12} />
              <span>Session Closed</span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">
              You Have Signed Out
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-normal">
              Your session has ended securely. All your student profile preferences, bookmarks, and team requests are safely synced.
            </p>
          </div>

          {/* Session Overview Box */}
          <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border text-left space-y-2.5 text-xs">
            <div className="flex items-center justify-between font-semibold">
              <span className="text-brand-muted">Account</span>
              <span className="text-brand-navy font-bold">{user?.email || 'surya@college.edu'}</span>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <span className="text-brand-muted">Active Capstones</span>
              <span className="text-brand-navy font-bold">3 saved</span>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <span className="text-brand-muted">Security Status</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck size={13} /> Token Revoked
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <Link
              to="/login"
              className="btn-primary w-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <LogIn size={16} />
              <span>Sign In Again</span>
            </Link>

            <Link
              to="/"
              className="btn-secondary w-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home size={16} />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-brand-muted py-4">
        © 2026 ProjectMatch. Built for college project collaboration.
      </footer>
    </div>
  );
}
