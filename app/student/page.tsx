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
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
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

export default function StudentDashboard() {
  const router = useRouter();
  const role = useStore((s) => s.role);
  const studentCourses = useStore((s) => s.studentCourses);
  const selectedCourseId = useStore((s) => s.selectedCourseId);
  const inviteCodeInput = useStore((s) => s.inviteCodeInput);
  const setInviteCodeInput = useStore((s) => s.setInviteCodeInput);
  const joinCourse = useStore((s) => s.joinCourse);
  const setSelectedCourseId = useStore((s) => s.setSelectedCourseId);

  useEffect(() => {
    if (role === "teacher") router.push("/teacher");
  }, [role, router]);

  const selectedCourse = studentCourses.find((c) => c.id === selectedCourseId);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    joinCourse(inviteCodeInput);
  };

  return (
    <AppLayout>
      <div className="p-8">
        {selectedCourse ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-5xl"
          >
            <button
              onClick={() => setSelectedCourseId(null)}
              className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" /> Back to courses
            </button>
            <h1 className="text-2xl font-bold text-slate-900">
              {selectedCourse.title}
            </h1>
            <p className="mt-1 text-slate-600">{selectedCourse.subtitle}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {selectedCourse.assignments.map((assignment) => {
                const config = statusConfig[assignment.status];
                const Icon = config.icon;
                return (
                  <motion.div
                    key={assignment.id}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {assignment.title}
                        </h3>
                        <span
                          className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${config.className}`}
                        >
                          <Icon className="h-3 w-3" />
                          {config.label}
                        </span>
                      </div>
                    </div>
                    {(assignment.status === "start" ||
                      assignment.status === "resume") && (
                      <Link
                        href="/student/workspace"
                        className="mt-4 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                      >
                        Open Workspace
                      </Link>
                    )}
                  </motion.div>
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Student Dashboard
              </h1>
              <p className="mt-2 text-slate-600">
                Your enrolled classes and writing assignments
              </p>
            </div>

            <form
              onSubmit={handleJoin}
              className="mb-10 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end"
            >
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Join a Class
                </label>
                <input
                  type="text"
                  value={inviteCodeInput}
                  onChange={(e) => setInviteCodeInput(e.target.value)}
                  placeholder="Enter invite code (e.g., PHY101AB)"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Join Class
              </button>
            </form>

            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              My Courses
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {studentCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  subtitle={course.subtitle}
                  onClick={() => setSelectedCourseId(course.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
