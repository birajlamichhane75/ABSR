"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  GraduationCap,
  Users,
  LogOut,
  X,
} from "lucide-react";
import { useStore } from "@/store/useStore";

const studentLinks = [
  { href: "/student", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/student/courses", label: "Courses", icon: BookOpen },
  { href: "/student/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

const teacherLinks = [
  { href: "/teacher", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/teacher/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const role = useStore((s) => s.role);
  const userName = useStore((s) => s.userName);
  const logout = useStore((s) => s.logout);

  const links = role === "student" ? studentLinks : teacherLinks;

  const handleLogout = () => {
    logout();
    onMobileClose?.();
    router.push("/login");
  };

  const navContent = (
    <>
      <div className="border-b border-slate-200 p-6 dark:border-slate-700">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-[#4F46E5]/20 blur-md animate-pulse-glow" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F46E5] glow-indigo">
                <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-[#0F172A] dark:text-slate-100">
                VoxLMS
              </p>
              <p className="text-xs text-[#64748B]">Teach, don&apos;t punish</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onMobileClose}
            className="focus-ring rounded-lg p-2 text-slate-600 lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {userName && (
          <p className="mt-4 text-sm text-[#64748B]">
            Signed in as{" "}
            <span className="font-semibold text-[#0F172A] dark:text-slate-100">
              {userName}
            </span>
          </p>
        )}
      </div>

      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <div
          className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-[#64748B] dark:bg-slate-800 dark:text-slate-300"
          aria-label={`${role} account`}
        >
          {role === "student" ? (
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          <span className="capitalize">{role} account</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4" aria-label="Main navigation">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = link.exact
            ? pathname === link.href
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => onMobileClose?.()}
              className={`focus-ring group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-[#4338CA] dark:bg-indigo-950/40 dark:text-indigo-300"
                  : "text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] dark:hover:bg-slate-800 dark:hover:text-slate-100"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl border border-indigo-200 bg-indigo-50/80 dark:border-indigo-800 dark:bg-indigo-950/30"
                />
              )}
              <Icon className="relative h-4 w-4" aria-hidden="true" />
              <span className="relative">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4 dark:border-slate-700">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-xs text-[#64748B]">VoxLMS Demo</p>
          <p className="mt-1 text-sm font-medium text-[#0F172A] dark:text-slate-100">
            Step-by-step reasoning, not just final answers
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="focus-ring mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] dark:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            aria-label="Close menu overlay"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 dark:border-slate-700 dark:bg-slate-900 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Sidebar navigation"
        id="sidebar-nav"
      >
        {navContent}
      </aside>
    </>
  );
}
