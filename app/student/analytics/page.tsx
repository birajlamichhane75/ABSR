"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/AppLayout";
import { STUDENT_COURSE_ANALYTICS } from "@/store/useStore";
import { useStore } from "@/store/useStore";

export default function StudentAnalyticsPage() {
  const router = useRouter();
  const role = useStore((s) => s.role);
  const userName = useStore((s) => s.userName);

  useEffect(() => {
    if (role === "teacher") router.replace("/teacher");
  }, [role, router]);

  const enrolled = STUDENT_COURSE_ANALYTICS;
  const avgEffort = Math.round(
    enrolled.reduce((s, c) => s + c.effortScore, 0) / enrolled.length
  );
  const totalHints = enrolled.reduce((s, c) => s + c.hintsUsed, 0);

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 sm:text-3xl">
              Your Analytics
            </h1>
            <p className="mt-2 text-[#64748B]">
              Reasoning and effort across your enrolled courses
              {userName ? ` — ${userName}` : ""}
            </p>
          </header>

          <section
            className="mb-8 grid gap-4 sm:grid-cols-3"
            aria-label="Summary statistics"
          >
            <div className="surface-card p-5 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs font-medium uppercase text-[#64748B]">Avg effort score</p>
              <p className="mt-1 text-3xl font-bold text-[#10B981]">{avgEffort}%</p>
            </div>
            <div className="surface-card p-5 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs font-medium uppercase text-[#64748B]">Courses enrolled</p>
              <p className="mt-1 text-3xl font-bold text-[#4F46E5]">{enrolled.length}</p>
            </div>
            <div className="surface-card p-5 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs font-medium uppercase text-[#64748B]">Tutor hints used</p>
              <p className="mt-1 text-3xl font-bold text-[#F59E0B]">{totalHints}</p>
            </div>
          </section>

          <ul className="space-y-6" aria-label="Per-course analytics">
            {enrolled.map((course) => (
              <li key={course.courseId}>
                <article className="surface-card p-6 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-[#0F172A] dark:text-slate-100">
                        {course.courseTitle}
                      </h2>
                      <p className="mt-1 text-sm text-[#64748B]">
                        Checkpoints: {course.checkpointsPassed}/{course.checkpointsTotal} passed ·{" "}
                        {course.hintsUsed} hint{course.hintsUsed === 1 ? "" : "s"} used
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#64748B]">Effort score</p>
                      <p className="text-2xl font-bold text-[#10B981]">{course.effortScore}%</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-1 flex justify-between text-xs text-[#64748B]">
                      <span>Course progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div
                      className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"
                      role="progressbar"
                      aria-valuenow={course.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${course.courseTitle} progress`}
                    >
                      <div
                        className="h-full rounded-full bg-[#4F46E5] transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="mb-2 text-xs font-medium uppercase text-[#64748B]">
                      Reasoning trend (recent sessions)
                    </p>
                    <div className="flex h-16 items-end gap-1" role="img" aria-label={`Effort trend for ${course.courseTitle}`}>
                      {course.trend.map((val, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-[#4F46E5]/70 dark:bg-indigo-400/70"
                          style={{ height: `${val}%` }}
                          title={`Session ${i + 1}: ${val}%`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-emerald-50 px-4 py-3 dark:bg-emerald-950/30">
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Strength</p>
                      <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">{course.strength}</p>
                    </div>
                    <div className="rounded-xl bg-amber-50 px-4 py-3 dark:bg-amber-950/30">
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Area to grow</p>
                      <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">{course.struggle}</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
