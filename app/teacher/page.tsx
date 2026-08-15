"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { useStore } from "@/store/useStore";

const studentStatusStyles = {
  unopened: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  writing: "bg-amber-50 text-amber-800 animate-pulse dark:bg-amber-950/40 dark:text-amber-300",
  graded: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
};

const studentStatusLabels = {
  unopened: "Unopened",
  writing: "Writing...",
  graded: "Graded",
};

export default function TeacherDashboard() {
  const router = useRouter();
  const role = useStore((s) => s.role);
  const userName = useStore((s) => s.userName);
  const teacherCourses = useStore((s) => s.teacherCourses);
  const setSelectedStudentId = useStore((s) => s.setSelectedStudentId);

  const course = teacherCourses[0];

  useEffect(() => {
    if (role === "student") router.replace("/student");
  }, [role, router]);

  const handleStudentClick = (
    studentId: string,
    status: "unopened" | "writing" | "graded"
  ) => {
    if (status === "graded") {
      setSelectedStudentId(studentId);
      router.push("/teacher/analytics");
    }
  };

  if (!course) return null;

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-5xl"
        >
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
              Your course
            </p>
            <h1 className="mt-1 text-2xl font-bold text-[#0F172A] dark:text-slate-100 sm:text-3xl">
              {course.title}
            </h1>
            <p className="mt-2 text-[#64748B]">
              {course.description}
              {userName ? ` · Instructor: ${userName}` : ""}
            </p>
            <p className="mt-2 text-sm text-[#64748B]">
              {course.enrollmentCount} students enrolled
            </p>
          </header>

          <section aria-labelledby="students-heading">
            <h2 id="students-heading" className="mb-4 text-lg font-semibold text-[#0F172A] dark:text-slate-100">
              Student Progress Monitor
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {course.students.map((student) => (
                <li key={student.id}>
                  <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    onClick={() => handleStudentClick(student.id, student.status)}
                    disabled={student.status !== "graded"}
                    aria-label={`${student.name}, status ${studentStatusLabels[student.status]}${student.status === "graded" ? ". Click to view analytics." : ""}`}
                    className={`surface-card w-full p-5 text-left transition-all dark:border-slate-700 dark:bg-slate-800 ${
                      student.status === "graded"
                        ? "cursor-pointer hover:border-indigo-300 hover:shadow-md"
                        : "cursor-default opacity-90"
                    }`}
                  >
                    <p className="font-semibold text-[#0F172A] dark:text-slate-100">{student.name}</p>
                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${studentStatusStyles[student.status]}`}
                    >
                      {studentStatusLabels[student.status]}
                    </span>
                    {student.status === "graded" && (
                      <p className="mt-3 text-xs font-medium text-[#4F46E5]">
                        View analytics →
                      </p>
                    )}
                  </motion.button>
                </li>
              ))}
            </ul>
          </section>
        </motion.div>
      </div>
    </AppLayout>
  );
}
