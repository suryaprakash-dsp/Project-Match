import React from 'react';
import { ShieldCheck, CheckCircle2, GraduationCap, FileCheck, X } from 'lucide-react';

export default function ValidationPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1e1c19] rounded-2xl border border-surface-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-subtle/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent-emeraldBg flex items-center justify-center text-accent-emerald border border-accent-emeraldBorder">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-navy">Academic Match Guarantee</h3>
              <p className="text-xs text-brand-muted">Candidate verification and credentialing policy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-surface transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-4 text-xs text-brand-slate dark:text-slate-300">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-subtle border border-surface-border">
            <CheckCircle2 size={18} className="text-accent-emerald shrink-0 mt-0.5" />
            <div>
              <strong className="text-brand-navy block font-semibold mb-0.5">Automated Transcript Verification</strong>
              <p className="text-brand-muted leading-relaxed">
                Candidate department, cumulative GPA, and completed prerequisite courses are cross-verified directly with campus academic registrars.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-subtle border border-surface-border">
            <GraduationCap size={18} className="text-accent-emerald shrink-0 mt-0.5" />
            <div>
              <strong className="text-brand-navy block font-semibold mb-0.5">Faculty Endorsement Badge</strong>
              <p className="text-brand-muted leading-relaxed">
                Profiles featuring verified checkmarks have completed prior capstones or received written commendation from academic advisors.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-subtle border border-surface-border">
            <FileCheck size={18} className="text-accent-emerald shrink-0 mt-0.5" />
            <div>
              <strong className="text-brand-navy block font-semibold mb-0.5">Fair Teammate Commitment Guarantee</strong>
              <p className="text-brand-muted leading-relaxed">
                Candidates agree to adhere to academic integrity guidelines and pledge 10-15 weekly hours to their chosen capstone partners.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-surface-border bg-surface-subtle/50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
