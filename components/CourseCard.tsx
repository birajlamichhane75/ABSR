"use client";

import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Users } from "lucide-react";

interface CourseCardProps {
  title: string;
  subtitle?: string;
  enrollmentCount?: number;
  onClick?: () => void;
  variant?: "student" | "teacher";
}

export function CourseCard({
  title,
  subtitle,
  enrollmentCount,
  onClick,
  variant = "student",
}: CourseCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group w-full rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-indigo-50/40 p-6 text-left shadow-sm transition-shadow hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/10"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <BookOpen className="h-6 w-6" />
        </div>
        <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {subtitle && (
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      )}
      {variant === "teacher" && enrollmentCount !== undefined && (
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <Users className="h-3.5 w-3.5" />
          {enrollmentCount} students enrolled
        </div>
      )}
    </motion.button>
  );
}
