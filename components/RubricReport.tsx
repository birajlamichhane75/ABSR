"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Award } from "lucide-react";
import Link from "next/link";
import { MOCK_RUBRIC } from "@/store/useStore";

interface RubricReportProps {
  essayText: string;
  onBack?: () => void;
}

export function RubricReport({ essayText, onBack }: RubricReportProps) {
  const score = MOCK_RUBRIC.aiScore;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl space-y-8 p-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Graded Report</h1>
          <p className="text-slate-600">AI-assisted rubric evaluation</p>
        </div>
        <Link
          href="/student"
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50 p-8 shadow-sm">
          <div className="relative">
            <svg width="140" height="140" className="-rotate-90">
              <circle
                cx="70"
                cy="70"
                r="54"
                stroke="#e2e8f0"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="70"
                cy="70"
                r="54"
                stroke="#4f46e5"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Award className="mb-1 h-6 w-6 text-indigo-600" />
              <span className="text-3xl font-bold text-slate-900">{score}</span>
              <span className="text-xs text-slate-500">/ 100</span>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-indigo-700">AI Score</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Criterion
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Score
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Feedback
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RUBRIC.criteria.map((row, i) => (
                <tr
                  key={row.name}
                  className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {row.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700">
                      {row.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{row.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Submitted Essay
        </h3>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
          {essayText || "No submission text recorded."}
        </p>
      </div>
    </motion.div>
  );
}
