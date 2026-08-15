"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PenLine,
  Play,
  CheckCircle2,
  BookOpen,
  TrendingUp,
  Clock,
} from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { CourseCard } from "@/components/CourseCard";
import { useStore } from "@/store/useStore";

const statusConfig = {
  start: {
    label: "Start Writing",
    className: "bg-indigo-50 text-[#4338CA] border-indigo-200",
    icon: PenLine,
  },
  resume: {
    label: "Resume",
    className: "bg-amber-50 text-amber-800 border-amber-200",
    icon: Play,
  },
  graded: {
    label: "Graded",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
};

type FilterTab = "all" | "active" | "graded";

export default function StudentDashboard() {
  const router = useRouter();
  const role = useStore((s) => s.role);
  const userName = useStore((s) => s.userName);
  const studentCourses = useStore((s) => s.studentCourses);
  const selectedCourseId = useStore((s) => s.selectedCourseId);
  const inviteCodeInput = useStore((s) => s.inviteCodeInput);
  const setInviteCodeInput = useStore((s) => s.setInviteCodeInput);
  const joinCourse = useStore((s) => s.joinCourse);
  const setSelectedCourseId = useStore((s) => s.setSelectedCourseId);
  const addToast = useStore((s) => s.addToast);

  const [filter, setFilter] = useState<FilterTab>("all");

  useEffect(() => {
    if (role === "teacher") router.push("/teacher");
  }, [role, router]);

  const selectedCourse = studentCourses.find((c) => c.id === selectedCourseId);

  const filteredCourses = useMemo(() => {
    if (filter === "all") return studentCourses;
    return studentCourses.filter((course) => {
      const statuses = course.assignments.map((a) => a.status);
      if (filter === "graded") return statuses.every((s) => s === "graded");
      return statuses.some((s) => s === "start" || s === "resume");
    });
  }, [studentCourses, filter]);

  const activeAssignment = studentCourses
    .flatMap((c) => c.assignments.map((a) => ({ ...a, courseTitle: c.title })))
    .find((a) => a.status === "resume" || a.status === "start");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    joinCourse(inviteCodeInput);
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {selectedCourse ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-5xl"
          >
            <button
              type="button"
              onClick={() => setSelectedCourseId(null)}
              className="focus-ring mb-6 flex items-center gap-2 text-sm text-[#64748B] hover:text-[#4338CA]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to courses
            </button>
            <h1 className="text-2xl font-bold text-[#0F172A]">
              {selectedCourse.title}
            </h1>
            <p className="mt-1 text-[#64748B]">{selectedCourse.subtitle}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {selectedCourse.assignments.map((assignment) => {
                const config = statusConfig[assignment.status];
                const Icon = config.icon;
                return (
                  <motion.article
                    key={assignment.id}
                    whileHover={{ y: -2 }}
                    className="surface-card p-6"
                  >
                    <h3 className="font-semibold text-[#0F172A]">
                      {assignment.title}
                    </h3>
                    <span
                      className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${config.className}`}
                    >
                      <Icon className="h-3 w-3" aria-hidden="true" />
                      {config.label}
                    </span>
                    {(assignment.status === "start" ||
                      assignment.status === "resume") && (
                      <Link
                        href="/student/workspace"
                        className="btn-primary focus-ring mt-4 inline-flex rounded-xl px-4 py-2 text-sm font-medium"
                      >
                        Open Workspace
                      </Link>
                    )}
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-5xl"
          >
            <header className="mb-8">
              <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">
                Welcome back{userName ? `, ${userName}` : ""}
              </h1>
              <p className="mt-2 text-[#64748B]">
                Your enrolled classes and Socratic writing assignments
              </p>
            </header>

            <section
              className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              aria-label="Quick actions"
            >
              <Link
                href="/student/workspace"
                className="focus-ring surface-card flex items-start gap-4 p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F46E5]/10 text-[#4F46E5]">
                  <PenLine className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A]">Continue Writing</p>
                  <p className="mt-1 text-sm text-[#64748B]">
                    {activeAssignment
                      ? `Resume: ${activeAssignment.title}`
                      : "Open the Socratic workspace"}
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setFilter("active");
                  addToast("Showing courses with active assignments", "info");
                }}
                className="focus-ring surface-card flex items-start gap-4 p-5 text-left transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10B981]/10 text-[#10B981]">
                  <TrendingUp className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A]">View Progress</p>
                  <p className="mt-1 text-sm text-[#64748B]">
                    Filter courses in progress
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => addToast("Analytics preview — full charts in workspace flow", "info")}
                className="focus-ring surface-card flex items-start gap-4 p-5 text-left transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B]">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A]">Recent Activity</p>
                  <p className="mt-1 text-sm text-[#64748B]">
                    Last checkpoint: Circular Motion essay
                  </p>
                </div>
              </button>
            </section>

            <form
              onSubmit={handleJoin}
              className="surface-card mb-8 flex flex-col gap-3 p-6 sm:flex-row sm:items-end"
            >
              <div className="flex-1">
                <label htmlFor="invite-code" className="mb-2 block text-sm font-medium text-[#0F172A]">
                  Join a Class
                </label>
                <input
                  id="invite-code"
                  type="text"
                  value={inviteCodeInput}
                  onChange={(e) => setInviteCodeInput(e.target.value)}
                  placeholder="Enter invite code (e.g., BIO110X)"
                  className="focus-ring w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#64748B]"
                />
              </div>
              <button type="submit" className="btn-primary focus-ring rounded-xl px-6 py-3 text-sm font-semibold">
                Join Class
              </button>
            </form>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-[#0F172A]">My Courses</h2>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter courses">
                {(
                  [
                    ["all", "All"],
                    ["active", "In Progress"],
                    ["graded", "Completed"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={filter === key}
                    onClick={() => setFilter(key)}
                    className={`focus-ring rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      filter === key
                        ? "bg-[#4F46E5] text-white"
                        : "bg-white text-[#64748B] ring-1 ring-slate-200 hover:text-[#0F172A]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  subtitle={course.subtitle}
                  assignmentCount={course.assignments.length}
                  onClick={() => setSelectedCourseId(course.id)}
                />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <p className="mt-6 text-center text-sm text-[#64748B]" role="status">
                No courses match this filter.
              </p>
            )}

            <section className="mt-10 surface-card p-6" aria-label="Learning tips">
              <div className="flex items-start gap-3">
                <BookOpen className="mt-0.5 h-5 w-5 text-[#4F46E5]" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-[#0F172A]">Demo tip</h3>
                  <p className="mt-1 text-sm text-[#64748B]">
                    Open <strong className="text-[#0F172A]">Physics 101</strong> and start the
                    Circular Motion assignment to experience MCQ checkpoints and Socratic tutoring.
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
