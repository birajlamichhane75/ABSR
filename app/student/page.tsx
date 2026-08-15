"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PenLine, BookOpen, BarChart3, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { useStore } from "@/store/useStore";

export default function StudentDashboard() {
  const router = useRouter();
  const role = useStore((s) => s.role);
  const userName = useStore((s) => s.userName);
  const studentCourses = useStore((s) => s.studentCourses);

  useEffect(() => {
    if (role === "teacher") router.replace("/teacher");
  }, [role, router]);

  const activeAssignment = studentCourses
    .flatMap((c) => c.assignments.map((a) => ({ ...a, courseTitle: c.title })))
    .find((a) => a.status === "resume" || a.status === "start");

  const inProgressCount = studentCourses.filter((c) =>
    c.assignments.some((a) => a.status === "start" || a.status === "resume")
  ).length;

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-5xl"
        >
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 sm:text-3xl">
              Welcome back{userName ? `, ${userName}` : ""}
            </h1>
            <p className="mt-2 text-[#64748B]">
              VoxLMS grades your reasoning step by step — and teaches instead of punishing.
            </p>
          </header>

          <section
            className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Quick actions"
          >
            <Link
              href="/student/workspace"
              className="focus-ring surface-card flex items-start gap-4 p-5 transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F46E5]/10 text-[#4F46E5]">
                <PenLine className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-[#0F172A] dark:text-slate-100">Continue Writing</p>
                <p className="mt-1 text-sm text-[#64748B]">
                  {activeAssignment
                    ? `Resume: ${activeAssignment.title}`
                    : "Open the Socratic workspace"}
                </p>
              </div>
            </Link>

            <Link
              href="/student/courses"
              className="focus-ring surface-card flex items-start gap-4 p-5 transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10B981]/10 text-[#10B981]">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-[#0F172A] dark:text-slate-100">Browse Courses</p>
                <p className="mt-1 text-sm text-[#64748B]">
                  {studentCourses.length} enrolled · {inProgressCount} in progress
                </p>
              </div>
            </Link>

            <Link
              href="/student/analytics"
              className="focus-ring surface-card flex items-start gap-4 p-5 transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B] dark:bg-amber-950/40">
                <BarChart3 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-[#0F172A] dark:text-slate-100">Your Analytics</p>
                <p className="mt-1 text-sm text-[#64748B]">
                  Effort trends, hints used, and strengths by course
                </p>
              </div>
            </Link>
          </section>

          <section className="surface-card p-6 dark:border-slate-700 dark:bg-slate-800" aria-label="Getting started">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-[#4F46E5]" aria-hidden="true" />
              <div>
                <h2 className="font-semibold text-[#0F172A] dark:text-slate-100">Try the demo flow</h2>
                <p className="mt-1 text-sm text-[#64748B]">
                  Open <strong className="text-[#0F172A] dark:text-slate-100">Physics 101</strong> from
                  Courses, start the Circular Motion assignment, and experience live MCQ checkpoints
                  with the Socratic AI tutor.
                </p>
                <Link
                  href="/student/workspace"
                  className="btn-primary focus-ring mt-4 inline-flex rounded-xl px-4 py-2 text-sm font-semibold"
                >
                  Try the AI Tutor
                </Link>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </AppLayout>
  );
}
