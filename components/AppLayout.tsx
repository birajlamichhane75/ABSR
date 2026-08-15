"use client";

import { Sidebar } from "./Sidebar";
import { ToastContainer } from "./Toast";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 bg-grid">
      <Sidebar />
      <main className="ml-64 min-h-screen">{children}</main>
      <ToastContainer />
    </div>
  );
}
