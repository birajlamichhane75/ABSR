"use client";

import { useState } from "react";
import { AuthGuard } from "./AuthGuard";
import { Sidebar } from "./Sidebar";
import { ToastContainer } from "./Toast";
import { LiveAnnouncer, ThemeApplier } from "./LiveAnnouncer";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AuthGuard>
      <ThemeApplier />
      <LiveAnnouncer />
      <div className="min-h-screen bg-[#F8FAFC] bg-grid dark:bg-slate-950">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
        <div className="flex min-h-screen flex-col lg:ml-64">
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="focus-ring rounded-lg border border-slate-200 p-2 text-slate-700 dark:border-slate-600 dark:text-slate-200"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="sidebar-nav"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-sm font-bold text-[#0F172A] dark:text-slate-100">VoxLMS</span>
          </header>
          <main id="main-content" className="min-h-0 flex-1 outline-none" tabIndex={-1}>
            {children}
          </main>
        </div>
        <ToastContainer />
      </div>
    </AuthGuard>
  );
}
