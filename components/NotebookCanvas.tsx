"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";
import type { WorkspaceStatus } from "@/store/useStore";

interface NotebookCanvasProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  status: WorkspaceStatus;
  placeholder?: string;
}

const LOCK_COPY: Partial<Record<WorkspaceStatus, { title: string; body: string }>> = {
  EVALUATING: {
    title: "Reviewing Concept Logic",
    body: "AI agents are analyzing your draft...",
  },
  MCQ: {
    title: "Canvas locked",
    body: "Answer the checkpoint question to continue writing.",
  },
  TUTORING: {
    title: "Canvas locked",
    body: "Reflect with the Socratic tutor, then unlock the page.",
  },
};

export function NotebookCanvas({
  value,
  onChange,
  status,
  placeholder,
}: NotebookCanvasProps) {
  const isWriting = status === "WRITING";
  const isLocked = status === "EVALUATING" || status === "MCQ" || status === "TUTORING";
  const lockCopy = LOCK_COPY[status];

  return (
    <div className="notebook-sheet relative overflow-hidden rounded-[4px] shadow-2xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-14 flex-col items-center justify-around py-10">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-4 w-4 rounded-full bg-slate-200/90 shadow-inner ring-1 ring-slate-300/80"
          />
        ))}
      </div>

      <textarea
        value={value}
        onChange={onChange}
        readOnly={!isWriting}
        placeholder={placeholder}
        spellCheck
        className="notebook-lines min-h-[32rem] w-full overflow-y-auto"
        aria-label="Socratic writing canvas"
      />

      <AnimatePresence>
        {isLocked && lockCopy && (
          <motion.div
            key={`paper-lock-${status}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#fdfbf7]/35 backdrop-blur-[6px]"
          >
            <div className="mx-6 flex max-w-sm flex-col items-center rounded-2xl border border-white/60 bg-white/55 px-6 py-5 text-center shadow-lg backdrop-blur-md">
              {status === "EVALUATING" ? (
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Lock className="h-5 w-5" />
                </div>
              )}
              <p className="mt-3 text-sm font-semibold text-slate-900">
                {lockCopy.title}
              </p>
              <p className="mt-1 text-sm text-slate-600">{lockCopy.body}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
