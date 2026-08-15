"use client";

import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Users, FileText } from "lucide-react";

interface CourseCardProps {
  title: string;
  subtitle?: string;
  enrollmentCount?: number;
  assignmentCount?: number;
  onClick?: () => void;
  variant?: "student" | "teacher";
}

export function CourseCard({
  title,
  subtitle,
  enrollmentCount,
  assignmentCount,
  onClick,
  variant = "student",
}: CourseCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      aria-label={`Open course: ${title}`}
      className="focus-ring group w-full rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-shadow hover:border-indigo-200 hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4F46E5]/10 text-[#4F46E5]">
          <BookOpen className="h-6 w-6" aria-hidden="true" />
        </div>
        <ChevronRight
          className="h-5 w-5 text-[#64748B] transition-transform group-hover:translate-x-1 group-hover:text-[#4F46E5]"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-lg font-semibold text-[#0F172A]">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-[#64748B]">{subtitle}</p>}
      {variant === "teacher" && enrollmentCount !== undefined && (
        <div className="mt-4 flex items-center gap-2 text-xs text-[#64748B]">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          {enrollmentCount} students enrolled
        </div>
      )}
      {variant === "student" && assignmentCount !== undefined && (
        <div className="mt-4 flex items-center gap-2 text-xs text-[#64748B]">
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          {assignmentCount} assignment{assignmentCount === 1 ? "" : "s"}
        </div>
      )}
    </motion.button>
  );
}
