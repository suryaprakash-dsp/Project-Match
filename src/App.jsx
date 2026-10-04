import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SidebarProvider, useSidebar } from './context/SidebarContext';
import { PanelLeftOpen } from 'lucide-react';

import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import DashboardPage from './pages/DashboardPage';
import ExploreProjectsPage from './pages/ExploreProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import FindTeammatesPage from './pages/FindTeammatesPage';
import StudentProfilePage from './pages/StudentProfilePage';
import MyProjectsPage from './pages/MyProjectsPage';
import RequestsPage from './pages/RequestsPage';
import SettingsPage from './pages/SettingsPage';
import SignOutPage from './pages/SignOutPage';

// Layout wrapper for authenticated pages with collapsible left sidebar
function AppLayout() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <div className="bg-canvas min-h-screen text-brand-slate font-sans antialiased flex relative">
      {/* Fixed Airy Left Sidebar */}
      <Sidebar />

      {/* Main Content Area with dynamic padding matching sidebar collapsed state */}
      <div
        className={`flex-1 min-h-screen flex flex-col pt-14 lg:pt-0 transition-all duration-300 ease-in-out ${
          collapsed ? 'lg:pl-0' : 'lg:pl-64'
        }`}
      >
        {/* Floating Desktop Sidebar Reveal Button when collapsed */}
        {collapsed && (
          <div className="hidden lg:flex fixed top-4 left-4 z-50 animate-in fade-in duration-200">
            <button
              onClick={toggleSidebar}
              className="px-3.5 py-2 rounded-xl bg-surface border border-surface-border text-brand-navy shadow-md hover:bg-surface-subtle hover:border-[#b46b2b] transition-all flex items-center gap-2 cursor-pointer group"
              title="Show Sidebar (or click to reopen)"
            >
              <PanelLeftOpen size={18} className="text-[#b46b2b] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-brand-navy">Show Sidebar</span>
            </button>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

// Route guard for authenticated pages
function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas p-4">
        <div className="p-4 rounded-xl bg-surface border border-surface-border shadow-xs flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-brand-navy border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-brand-navy">
            Connecting to Campus Network...
          </span>
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <AppLayout />;
}

// Redirect already-authenticated users away from login/register
function PublicRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />
              <Route path="/verify-otp" element={<VerifyOtpPage />} />

              {/* Protected routes with fixed left sidebar */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/projects" element={<ExploreProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                <Route path="/find-teammates" element={<FindTeammatesPage />} />
                <Route path="/profile" element={<StudentProfilePage />} />
                <Route path="/profile/:id" element={<StudentProfilePage />} />
                <Route path="/my-projects" element={<MyProjectsPage />} />
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Sign Out Routes */}
              <Route path="/signout" element={<SignOutPage />} />
              <Route path="/logout" element={<SignOutPage />} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
