"use client";

import { useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { MCQModal } from "@/components/MCQModal";
import { NotebookCanvas } from "@/components/NotebookCanvas";
import { SocraticTutorPanel } from "@/components/SocraticTutorPanel";
import { RubricReport } from "@/components/RubricReport";
import { useStore, MOCK_ASSIGNMENT } from "@/store/useStore";

function countSentenceEndings(text: string): number {
  const matches = text.match(/[.!?]/g);
  return matches ? matches.length : 0;
}

export default function StudentWorkspace() {
  const workspaceStatus = useStore((s) => s.workspaceStatus);
  const essayText = useStore((s) => s.essayText);
  const mcqTriggered = useStore((s) => s.mcqTriggered);
  const checkpointScore = useStore((s) => s.checkpointScore);
  const setEssayText = useStore((s) => s.setEssayText);
  const triggerMcqCheckpoint = useStore((s) => s.triggerMcqCheckpoint);
  const submitEssay = useStore((s) => s.submitEssay);

  const isWriting = workspaceStatus === "WRITING";
  const isSubmitted = workspaceStatus === "SUBMITTED";
  const isTutoring = workspaceStatus === "TUTORING";

  const handleEssayTyping = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const currentText = e.target.value;
      setEssayText(currentText);

      if (mcqTriggered || workspaceStatus !== "WRITING") return;

      const punctuationCount = countSentenceEndings(currentText);
      if (currentText.length >= 80 || punctuationCount >= 2) {
        triggerMcqCheckpoint();
      }
    },
    [mcqTriggered, workspaceStatus, setEssayText, triggerMcqCheckpoint]
  );

  const canSubmit =
    isWriting && essayText.trim().length > 100 && mcqTriggered;

  if (isSubmitted) {
    return (
      <AppLayout>
        <RubricReport essayText={essayText} />
        <MCQModal />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-[#F8FAFC] lg:min-h-screen lg:flex-row">
        <div
          className={`flex flex-1 flex-col bg-white transition-all ${isTutoring ? "lg:max-w-[calc(100%-420px)]" : ""}`}
        >
          <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
            <Link
              href="/student"
              className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#4F46E5]">
                  {MOCK_ASSIGNMENT.topic}
                </p>
                <h1 className="text-lg font-bold text-[#0F172A] sm:text-xl">
                  Socratic Writing Canvas
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs text-slate-600">
                  Status:{" "}
                  <span className="font-semibold text-indigo-700">
                    {workspaceStatus}
                  </span>
                </span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Checkpoints: {checkpointScore}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-4 rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Assignment prompt
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">
                  {MOCK_ASSIGNMENT.prompt}
                </p>
              </div>

              <NotebookCanvas
                value={essayText}
                onChange={handleEssayTyping}
                status={workspaceStatus}
                placeholder="Begin writing on the first line. A concept checkpoint will pause you as your explanation develops..."
              />

              <div className="mt-5 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  {essayText.length} characters
                  {!mcqTriggered &&
                    " · Checkpoint at 80 chars or 2nd punctuation"}
                </p>
                <motion.button
                  whileHover={{ scale: canSubmit ? 1.02 : 1 }}
                  whileTap={{ scale: canSubmit ? 0.98 : 1 }}
                  onClick={() => canSubmit && submitEssay()}
                  disabled={!canSubmit}
                  className="btn-primary focus-ring flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 sm:px-6"
                >
                  <Send className="h-4 w-4" />
                  Submit Essay
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <SocraticTutorPanel />
      </div>

      <MCQModal />
    </AppLayout>
  );
}
