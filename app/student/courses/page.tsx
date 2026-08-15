"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, PenLine, Play, CheckCircle2 } from "lucide-react";
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

export default function StudentCoursesPage() {
  const router = useRouter();
  const role = useStore((s) => s.role);
  const studentCourses = useStore((s) => s.studentCourses);
  const selectedCourseId = useStore((s) => s.selectedCourseId);
  const inviteCodeInput = useStore((s) => s.inviteCodeInput);
  const setInviteCodeInput = useStore((s) => s.setInviteCodeInput);
  const joinCourse = useStore((s) => s.joinCourse);
  const setSelectedCourseId = useStore((s) => s.setSelectedCourseId);

  useEffect(() => {
    if (role === "teacher") router.replace("/teacher");
  }, [role, router]);

  const selectedCourse = studentCourses.find((c) => c.id === selectedCourseId);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    joinCourse(inviteCodeInput);
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {selectedCourse ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-5xl">
            <button
              type="button"
              onClick={() => setSelectedCourseId(null)}
              className="focus-ring mb-6 flex items-center gap-2 text-sm text-[#64748B] hover:text-[#4338CA]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to all courses
            </button>
            <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100">
              {selectedCourse.title}
            </h1>
            <p className="mt-1 text-[#64748B]">{selectedCourse.subtitle}</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Assignments">
              {selectedCourse.assignments.map((assignment) => {
                const config = statusConfig[assignment.status];
                const Icon = config.icon;
                return (
                  <li key={assignment.id}>
                    <article className="surface-card p-6 dark:border-slate-700 dark:bg-slate-800">
                      <h2 className="font-semibold text-[#0F172A] dark:text-slate-100">
                        {assignment.title}
                      </h2>
                      <span
                        className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${config.className}`}
                      >
                        <Icon className="h-3 w-3" aria-hidden="true" />
                        {config.label}
                      </span>
                      {(assignment.status === "start" || assignment.status === "resume") && (
                        <Link
                          href="/student/workspace"
                          className="btn-primary focus-ring mt-4 inline-flex rounded-xl px-4 py-2 text-sm font-medium"
                        >
                          Open Workspace
                        </Link>
                      )}
                    </article>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : (
          <div className="mx-auto max-w-5xl">
            <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 sm:text-3xl">
              My Courses
            </h1>
            <p className="mt-2 text-[#64748B]">
              Browse enrolled classes and open writing assignments.
            </p>

            <form
              onSubmit={handleJoin}
              className="surface-card mt-8 flex flex-col gap-3 p-6 sm:flex-row sm:items-end dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex-1">
                <label htmlFor="invite-code" className="mb-2 block text-sm font-medium text-[#0F172A] dark:text-slate-100">
                  Join a Class
                </label>
                <input
                  id="invite-code"
                  type="text"
                  value={inviteCodeInput}
                  onChange={(e) => setInviteCodeInput(e.target.value)}
                  placeholder="Enter invite code (e.g., BIO110X)"
                  className="focus-ring w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
              <button type="submit" className="btn-primary focus-ring rounded-xl px-6 py-3 text-sm font-semibold">
                Join Class
              </button>
            </form>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Enrolled courses">
              {studentCourses.map((course) => (
                <li key={course.id}>
                  <CourseCard
                    title={course.title}
                    subtitle={course.subtitle}
                    assignmentCount={course.assignments.length}
                    onClick={() => setSelectedCourseId(course.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
