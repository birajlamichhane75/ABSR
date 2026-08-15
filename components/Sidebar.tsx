"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  LayoutDashboard,
  BookOpen,
  CreditCard,
  BarChart3,
  GraduationCap,
  Users,
  LogOut,
  X,
} from "lucide-react";
import { useStore, type Role } from "@/store/useStore";

const studentLinks = [
  { href: "/student", label: "Dashboard", icon: LayoutDashboard },
  { href: "/student", label: "Courses", icon: BookOpen },
  { href: "/student", label: "Subscriptions", icon: CreditCard },
  { href: "/student", label: "Analytics", icon: BarChart3 },
];

const teacherLinks = [
  { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teacher", label: "Courses", icon: BookOpen },
  { href: "/teacher", label: "Subscriptions", icon: CreditCard },
  { href: "/teacher/analytics", label: "Analytics", icon: BarChart3 },
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
  const setRole = useStore((s) => s.setRole);
  const logout = useStore((s) => s.logout);

  const links = role === "student" ? studentLinks : teacherLinks;

  const handleRoleSwitch = (newRole: Role) => {
    setRole(newRole);
    onMobileClose?.();
    router.push(newRole === "student" ? "/student" : "/teacher");
  };

  const handleLogout = () => {
    logout();
    onMobileClose?.();
    router.push("/login");
  };

  const navContent = (
    <>
      <div className="border-b border-slate-200 p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-[#4F46E5]/20 blur-md animate-pulse-glow" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F46E5] glow-indigo">
                <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-[#0F172A]">
                Nous LMS
              </h1>
              <p className="text-xs text-[#64748B]">Socratic Learning</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onMobileClose}
            className="focus-ring rounded-lg p-2 text-slate-600 lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {userName && (
          <p className="mt-4 text-sm text-[#64748B]">
            Signed in as{" "}
            <span className="font-semibold text-[#0F172A]">{userName}</span>
          </p>
        )}
      </div>

      <div className="border-b border-slate-200 p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#64748B]">
          View Mode
        </p>
        <div className="flex rounded-xl bg-slate-100 p-1" role="group" aria-label="Switch view mode">
          <button
            type="button"
            onClick={() => handleRoleSwitch("student")}
            aria-pressed={role === "student"}
            className={`focus-ring flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
              role === "student"
                ? "bg-[#4F46E5] text-white shadow-md"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            Student
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch("teacher")}
            aria-pressed={role === "teacher"}
            className={`focus-ring flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
              role === "teacher"
                ? "bg-[#4F46E5] text-white shadow-md"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            Teacher
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4" aria-label="Main navigation">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== "/student" &&
              link.href !== "/teacher" &&
              pathname.startsWith(link.href));

          return (
            <Link
              key={`${role}-${link.label}`}
              href={role === "student" ? "/student" : link.href}
              onClick={() => onMobileClose?.()}
              className={`focus-ring group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-[#4338CA]"
                  : "text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl border border-indigo-200 bg-indigo-50/80"
                />
              )}
              <Icon className="relative h-4 w-4" aria-hidden="true" />
              <span className="relative">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-slate-200 p-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-[#64748B]">Prototype v1.0</p>
          <p className="mt-1 text-sm font-medium text-[#0F172A]">
            Real-time Socratic monitoring
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
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
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Sidebar navigation"
      >
        {navContent}
      </aside>
    </>
  );
}
