"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Brain, Target } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { SolveTraceReplay } from "@/components/SolveTraceReplay";
import { StudentGraph } from "@/components/StudentGraph";
import { useStore, MOCK_RUBRIC } from "@/store/useStore";

export default function TeacherAnalyticsPage() {
  const teacherCourses = useStore((s) => s.teacherCourses);
  const selectedTeacherCourseId = useStore((s) => s.selectedTeacherCourseId);
  const selectedStudentId = useStore((s) => s.selectedStudentId);
  const gradeOverride = useStore((s) => s.gradeOverride);
  const instructorNotes = useStore((s) => s.instructorNotes);
  const overrideSaved = useStore((s) => s.overrideSaved);
  const setGradeOverride = useStore((s) => s.setGradeOverride);
  const setInstructorNotes = useStore((s) => s.setInstructorNotes);
  const saveOverride = useStore((s) => s.saveOverride);

  const course = teacherCourses.find((c) => c.id === selectedTeacherCourseId);
  const student = course?.students.find((s) => s.id === selectedStudentId);

  return (
    <AppLayout>
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/teacher"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Student Analytics — {student?.name ?? "Jamie Smith"}
            </h1>
            <p className="mt-1 text-slate-600">
              {course?.title ?? "Physics 101: Mechanics"} · Keystroke replay &
              understanding graph
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <SolveTraceReplay />

            <div className="space-y-6">
              <StudentGraph />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-indigo-700">
                    <Brain className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">
                      AI Expected Score
                    </span>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {MOCK_RUBRIC.aiScore}/100
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Target className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">
                      Checkpoint Answers
                    </span>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-slate-900">0 / 1</p>
                  <p className="text-xs text-slate-500">
                    MCQ incorrect — remediated via tutor
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-semibold text-slate-900">
                  AI Rubric Details
                </h3>
                <div className="space-y-3">
                  {MOCK_RUBRIC.criteria.map((c) => (
                    <div
                      key={c.name}
                      className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {c.name}
                        </p>
                        <p className="text-xs text-slate-500">{c.feedback}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
                        {c.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="mb-4 font-semibold text-slate-900">
                  Teacher Assessment Override
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm text-slate-600">
                      Final Grade (0–100)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={gradeOverride}
                      onChange={(e) =>
                        setGradeOverride(Number(e.target.value))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-600">
                      Instructor Notes
                    </label>
                    <textarea
                      value={instructorNotes}
                      onChange={(e) => setInstructorNotes(e.target.value)}
                      rows={3}
                      placeholder="Add feedback or justification for grade override..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={saveOverride}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
                  >
                    <Save className="h-4 w-4" />
                    {overrideSaved ? "Saved!" : "Save Override"}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
