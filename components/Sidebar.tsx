"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  LayoutDashboard,
  BookOpen,
  CreditCard,
  BarChart3,
  GraduationCap,
  Users,
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

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const role = useStore((s) => s.role);
  const setRole = useStore((s) => s.setRole);

  const links = role === "student" ? studentLinks : teacherLinks;

  const handleRoleSwitch = (newRole: Role) => {
    setRole(newRole);
    router.push(newRole === "student" ? "/student" : "/teacher");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-gradient-to-b from-white to-indigo-50/40 shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-indigo-400/25 blur-md animate-pulse-glow" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 glow-indigo">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              Nous LMS
            </h1>
            <p className="text-xs text-slate-500">Socratic Learning</p>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
          View Mode
        </p>
        <div className="flex rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => handleRoleSwitch("student")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
              role === "student"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            Student
          </button>
          <button
            onClick={() => handleRoleSwitch("teacher")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
              role === "teacher"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            Teacher
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
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
              onClick={() => {
                if (role === "student" && link.href.startsWith("/teacher")) {
                  handleRoleSwitch("teacher");
                }
              }}
              className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl border border-indigo-200 bg-indigo-50/80"
                />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-indigo-50/60 p-4">
          <p className="text-xs text-slate-500">Prototype v1.0</p>
          <p className="mt-1 text-sm font-medium text-slate-700">
            Real-time Socratic monitoring
          </p>
        </div>
      </div>
    </aside>
  );
}
