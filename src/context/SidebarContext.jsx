import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('pm_sidebar_collapsed') === 'true';
  });

  const toggleSidebar = () => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('pm_sidebar_collapsed', String(next));
      return next;
    });
  };

  const hideSidebar = () => {
    setCollapsed(true);
    localStorage.setItem('pm_sidebar_collapsed', 'true');
  };

  const showSidebar = () => {
    setCollapsed(false);
    localStorage.setItem('pm_sidebar_collapsed', 'false');
  };

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar, hideSidebar, showSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
};
