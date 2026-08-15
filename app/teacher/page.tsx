"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Crown,
  Loader2,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { CourseCard } from "@/components/CourseCard";
import { useStore } from "@/store/useStore";

const studentStatusStyles = {
  unopened: "bg-slate-100 text-slate-600",
  writing: "bg-amber-50 text-amber-800 animate-pulse",
  graded: "bg-emerald-50 text-emerald-700",
};

const studentStatusLabels = {
  unopened: "Unopened",
  writing: "Writing...",
  graded: "Graded",
};

export default function TeacherDashboard() {
  const router = useRouter();
  const role = useStore((s) => s.role);
  const teacherCourses = useStore((s) => s.teacherCourses);
  const subscriptionTier = useStore((s) => s.subscriptionTier);
  const selectedTeacherCourseId = useStore((s) => s.selectedTeacherCourseId);
  const newCourseTitle = useStore((s) => s.newCourseTitle);
  const newCourseDescription = useStore((s) => s.newCourseDescription);
  const showLimitModal = useStore((s) => s.showLimitModal);
  const showUpgradeModal = useStore((s) => s.showUpgradeModal);
  const checkoutLoading = useStore((s) => s.checkoutLoading);

  const setSelectedTeacherCourseId = useStore(
    (s) => s.setSelectedTeacherCourseId
  );
  const setSelectedStudentId = useStore((s) => s.setSelectedStudentId);
  const setNewCourseTitle = useStore((s) => s.setNewCourseTitle);
  const setNewCourseDescription = useStore((s) => s.setNewCourseDescription);
  const createCourse = useStore((s) => s.createCourse);
  const upgradeToPro = useStore((s) => s.upgradeToPro);
  const setShowLimitModal = useStore((s) => s.setShowLimitModal);
  const setShowUpgradeModal = useStore((s) => s.setShowUpgradeModal);

  useEffect(() => {
    if (role === "student") router.push("/student");
  }, [role, router]);

  const selectedCourse = teacherCourses.find(
    (c) => c.id === selectedTeacherCourseId
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createCourse();
  };

  const handleStudentClick = (
    studentId: string,
    status: "unopened" | "writing" | "graded"
  ) => {
    if (status === "graded") {
      setSelectedStudentId(studentId);
      router.push("/teacher/analytics");
    }
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
              onClick={() => setSelectedTeacherCourseId(null)}
              className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" /> Back to courses
            </button>
            <h1 className="text-2xl font-bold text-slate-900">
              {selectedCourse.title}
            </h1>
            <p className="mt-1 text-slate-600">{selectedCourse.description}</p>

            <h2 className="mb-4 mt-8 text-lg font-semibold text-slate-900">
              Student Progress Monitor
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedCourse.students.map((student) => (
                <motion.button
                  key={student.id}
                  whileHover={{ y: -2 }}
                  onClick={() => handleStudentClick(student.id, student.status)}
                  disabled={student.status !== "graded"}
                  className={`rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all ${
                    student.status === "graded"
                      ? "cursor-pointer hover:border-indigo-300 hover:shadow-md"
                      : "cursor-default"
                  }`}
                >
                  <p className="font-semibold text-slate-900">{student.name}</p>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${studentStatusStyles[student.status]}`}
                  >
                    {studentStatusLabels[student.status]}
                  </span>
                  {student.status === "graded" && (
                    <p className="mt-3 text-xs font-medium text-indigo-600">
                      Click to view analytics →
                    </p>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-5xl"
          >
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Teacher Dashboard
                </h1>
                <p className="mt-2 text-slate-600">
                  Manage courses and monitor student understanding
                </p>
              </div>

              <div className="min-w-[280px] rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50 p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Crown className="h-4 w-4 text-amber-500" />
                  Current Plan
                </div>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {subscriptionTier === "pro" ? "Pro Tier" : "Free Tier"}
                </p>
                <p className="text-xs text-slate-500">
                  {subscriptionTier === "pro"
                    ? "Unlimited courses"
                    : "Limit: 2 courses"}
                </p>
                {subscriptionTier === "free" && (
                  <button
                    onClick={upgradeToPro}
                    className="mt-3 w-full rounded-xl bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                  >
                    Go Pro
                  </button>
                )}
              </div>
            </div>

            <form
              onSubmit={handleCreate}
              className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Plus className="h-5 w-5 text-indigo-600" />
                Create Course
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="Course Title"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={newCourseDescription}
                  onChange={(e) => setNewCourseDescription(e.target.value)}
                  placeholder="Description (optional)"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-4 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Create Course
              </button>
            </form>

            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Active Courses
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {teacherCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  subtitle={course.description}
                  enrollmentCount={course.enrollmentCount}
                  variant="teacher"
                  onClick={() => setSelectedTeacherCourseId(course.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showLimitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md"
            onClick={() => setShowLimitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-4 max-w-md rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-xl"
            >
              <AlertTriangle className="mx-auto h-12 w-12 text-amber-500" />
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Course Limit Exceeded
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Upgrade to Pro Tier for unlimited courses.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowLimitModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowLimitModal(false);
                    upgradeToPro();
                  }}
                  className="flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Go Pro
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mx-4 max-w-md rounded-3xl border border-indigo-200 bg-white p-8 text-center shadow-xl"
            >
              {checkoutLoading ? (
                <>
                  <Loader2 className="mx-auto h-12 w-12 animate-spin text-indigo-600" />
                  <p className="mt-4 text-sm text-slate-600">
                    Processing Stripe checkout...
                  </p>
                </>
              ) : (
                <>
                  <Crown className="mx-auto h-12 w-12 text-amber-500" />
                  <p className="mt-4 text-lg font-bold text-slate-900">
                    Welcome to Pro!
                  </p>
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="mt-4 rounded-xl bg-indigo-600 px-6 py-2 text-sm text-white"
                  >
                    Continue
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
