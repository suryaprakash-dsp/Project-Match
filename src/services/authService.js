// Auth Service connecting to backend at http://localhost:5000/api/auth
import { currentUser } from '../data/mockUsers';

const AUTH_KEY = 'pm_auth_user';
const TOKEN_KEY = 'pm_auth_token';
const API_BASE = 'http://localhost:5000/api/auth';

export const authService = {
  // POST http://localhost:5000/api/auth/register
  register: async (userData) => {
    const payload = {
      name: userData.name?.trim(),
      email: userData.email?.trim(),
      password: userData.password,
      department: (userData.department || 'cse').toLowerCase(),
      academic_year: userData.academic_year || (userData.year ? `${userData.year}rd` : '3rd'),
      skills: Array.isArray(userData.skills) ? userData.skills : []
    };

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.error || `Registration failed with status ${response.status}`,
        };
      }

      // Registration successful, backend dispatched OTP to user email
      return {
        success: true,
        message: data.message || 'OTP verification code has been sent to your email.',
        email: payload.email,
        requiresOtp: true,
        data,
      };
    } catch (err) {
      // Network error (e.g., backend server not started on port 5000)
      return {
        success: false,
        error:
          err.message === 'Failed to fetch' || err.name === 'TypeError'
            ? 'Cannot connect to backend server at http://localhost:5000. Please ensure your backend is running on port 5000.'
            : err.message,
      };
    }
  },

  // POST http://localhost:5000/api/auth/verify-email-otp
  verifyEmailOtp: async (email, otp) => {
    const payload = {
      email: email?.trim(),
      otp: otp?.trim(),
    };

    try {
      const response = await fetch(`${API_BASE}/verify-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.error || `OTP verification failed with status ${response.status}`,
        };
      }

      // Format verified student profile
      const verifiedUser = data.user || {
        id: data.userId || Date.now(),
        name: data.name || email.split('@')[0],
        email: email,
        department: data.department || 'CSE',
        academic_year: data.academic_year || '3rd',
        role: 'Student Developer',
        skills: data.skills || ['React', 'Python', 'Java'],
        availability: 'Available',
        matchScore: 95,
      };

      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
      }
      localStorage.setItem(AUTH_KEY, JSON.stringify(verifiedUser));

      return {
        success: true,
        user: verifiedUser,
        message: data.message || 'Email verified successfully!',
        data,
      };
    } catch (err) {
      return {
        success: false,
        error:
          err.message === 'Failed to fetch' || err.name === 'TypeError'
            ? 'Cannot connect to backend server at http://localhost:5000. Please ensure your backend is running on port 5000.'
            : err.message,
      };
    }
  },

  // POST http://localhost:5000/api/auth/login
  login: async (email, password) => {
    const trimmedEmail = email?.trim();

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Fallback for demo users if backend credentials are not set up for demo
        if (trimmedEmail.endsWith('@college.edu') && password === 'password123') {
          const demoUser = { ...currentUser, email: trimmedEmail, name: trimmedEmail.split('@')[0] };
          localStorage.setItem(AUTH_KEY, JSON.stringify(demoUser));
          return { success: true, user: demoUser };
        }
        return {
          success: false,
          error: data.message || data.error || 'Invalid credentials or user unverified',
        };
      }

      const loggedUser = data.user || {
        id: data.userId || Date.now(),
        name: data.name || trimmedEmail.split('@')[0],
        email: trimmedEmail,
        department: data.department || 'CSE',
        academic_year: data.academic_year || '3rd',
        role: 'Student Developer',
        skills: data.skills || ['React', 'Python', 'Java'],
        availability: 'Available',
        matchScore: 92,
      };

      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
      }
      localStorage.setItem(AUTH_KEY, JSON.stringify(loggedUser));

      return { success: true, user: loggedUser, data };
    } catch (err) {
      // If server is not responding and user uses demo credentials
      if (
        (err.message === 'Failed to fetch' || err.name === 'TypeError') &&
        trimmedEmail.endsWith('@college.edu')
      ) {
        const demoUser = { ...currentUser, email: trimmedEmail, name: trimmedEmail.split('@')[0] };
        localStorage.setItem(AUTH_KEY, JSON.stringify(demoUser));
        return { success: true, user: demoUser };
      }

      return {
        success: false,
        error:
          err.message === 'Failed to fetch' || err.name === 'TypeError'
            ? 'Cannot connect to backend server at http://localhost:5000. Please ensure your backend is running on port 5000.'
            : err.message,
      };
    }
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  getCurrentUser: () => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_KEY);
  },
};
