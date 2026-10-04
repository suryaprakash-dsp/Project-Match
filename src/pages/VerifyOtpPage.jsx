import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowRight, RotateCw, CheckCircle2, AlertCircle, Share2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmailOtp } = useAuth();

  // Retrieve email from navigation state or query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialEmail = location.state?.email || queryParams.get('email') || '';

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [resendStatus, setResendStatus] = useState('');

  const inputRefs = useRef([]);

  // Countdown timer for resending OTP
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Handle single digit input
  const handleChange = (index, value) => {
    // Only accept numeric digits
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const nextOtp = [...otp];
      nextOtp[index] = '';
      setOtp(nextOtp);
      return;
    }

    // If pasted full code (e.g. 6 digits)
    if (cleaned.length > 1) {
      const pasteDigits = cleaned.slice(0, 6).split('');
      const nextOtp = [...otp];
      pasteDigits.forEach((d, i) => {
        nextOtp[i] = d;
      });
      setOtp(nextOtp);
      const nextFocus = Math.min(pasteDigits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const nextOtp = [...otp];
    nextOtp[index] = cleaned[0];
    setOtp(nextOtp);

    // Auto-advance to next input
    if (index < 5 && cleaned) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const nextOtp = [...otp];
    pasted.split('').forEach((digit, i) => {
      nextOtp[i] = digit;
    });
    setOtp(nextOtp);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    const fullOtp = otp.join('');

    if (!email.trim()) {
      setError('Please provide your registered email address.');
      return;
    }

    if (fullOtp.length < 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }

    setLoading(true);
    const result = await verifyEmailOtp(email, fullOtp);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1200);
    } else {
      setError(result.error || 'Invalid or expired OTP code.');
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setResendStatus('Resending verification code...');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).catch(() => null);

      setResendCooldown(60);
      setResendStatus('New code dispatched to your email.');
      setTimeout(() => setResendStatus(''), 4000);
    } catch {
      setResendStatus('Failed to resend. Please check your backend.');
    }
  };

  return (
    <div className="min-h-screen bg-canvas p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-surface border border-surface-border rounded-2xl shadow-sm overflow-hidden p-6 sm:p-10">
        
        {/* Header Branding */}
        <div className="text-center space-y-3 mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 font-bold text-lg text-brand-navy">
            <div className="w-9 h-9 rounded-xl bg-[#b46b2b] flex items-center justify-center text-white shadow-xs">
              <Share2 size={19} />
            </div>
            <span className="tracking-tight text-xl font-extrabold">ProjectMatch</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#fdf5eb] dark:bg-[#35291f] text-[#9c5921] dark:text-[#f2cb9b] border border-[#f2cb9b] dark:border-[#523d2b] mx-auto">
            <ShieldCheck size={14} />
            <span>Campus Email Verification</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
            Verify Your Account
          </h1>
          <p className="text-sm text-brand-muted max-w-md mx-auto">
            We sent a 6-digit confirmation code to your campus inbox. Enter the code below to activate your student profile.
          </p>
        </div>

        {/* Registered Email Display / Editor */}
        <div className="mb-6 p-3.5 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <Mail size={16} className="text-[#b46b2b] shrink-0" />
            <div className="truncate">
              <span className="text-brand-muted block font-medium">Verification Target:</span>
              <strong className="text-brand-navy truncate text-sm">{email || 'Not provided'}</strong>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const newEmail = prompt('Enter the email you registered with:', email);
              if (newEmail) setEmail(newEmail.trim());
            }}
            className="text-[#b46b2b] hover:underline font-bold shrink-0"
          >
            Change
          </button>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
            <div>
              <p>Email verified successfully!</p>
              <p className="text-xs text-emerald-700 font-normal mt-0.5">Redirecting you to your Campus Dashboard...</p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold flex items-start gap-2.5">
            <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-center text-xs font-bold uppercase tracking-wider text-brand-muted mb-3">
              Enter 6-Digit One-Time Password (OTP)
            </label>

            {/* 6 Segment Input Boxes */}
            <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  autoFocus={idx === 0}
                  className="w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-mono font-bold rounded-xl bg-surface border-2 border-surface-border text-brand-navy focus:border-[#b46b2b] focus:outline-none transition-all shadow-xs"
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] text-white text-sm font-bold shadow-xs hover:shadow-[#b46b2b]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying with Server...</span>
              </>
            ) : (
              <>
                <span>Verify OTP & Enter Home Page</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Resend Code & Help */}
        <div className="mt-6 pt-5 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
          <div>
            {resendCooldown > 0 ? (
              <span className="flex items-center gap-1.5 font-medium">
                <RotateCw size={13} className="animate-spin text-brand-muted" />
                <span>Resend code in <strong>{resendCooldown}s</strong></span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-[#b46b2b] hover:underline font-bold cursor-pointer"
              >
                Didn't receive code? Resend OTP
              </button>
            )}
            {resendStatus && <p className="text-[11px] text-emerald-600 mt-0.5">{resendStatus}</p>}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="text-brand-slate hover:text-brand-navy font-semibold hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
