"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain } from "lucide-react";
import { CountdownTimer, SuccessPulse } from "./CountdownTimer";
import { useStore, MOCK_ASSIGNMENT } from "@/store/useStore";

export function MCQModal() {
  const workspaceStatus = useStore((s) => s.workspaceStatus);
  const answerMcq = useStore((s) => s.answerMcq);
  const mcqTimeout = useStore((s) => s.mcqTimeout);
  const selectedMcqKey = useStore((s) => s.selectedMcqKey);
  const mcqAnswered = useStore((s) => s.mcqAnswered);

  const [secondsLeft, setSecondsLeft] = useState(10);
  const [showSuccess, setShowSuccess] = useState(false);
  const [locked, setLocked] = useState(false);

  const isOpen = workspaceStatus === "MCQ";
  const mcq = MOCK_ASSIGNMENT.mcq_checkpoint;
  const correctKey = mcq.correct_key;

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(10);
      setShowSuccess(false);
      setLocked(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!mcqAnswered) mcqTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, mcqAnswered, mcqTimeout]);

  const handleAnswer = (key: string) => {
    if (mcqAnswered || locked) return;

    if (key === correctKey) {
      setShowSuccess(true);
      setTimeout(() => {
        answerMcq(key);
        setShowSuccess(false);
      }, 1200);
    } else {
      setLocked(true);
      answerMcq(key);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mcq-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md"
        >
          <motion.div
            key="mcq-modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative mx-4 w-full max-w-xl rounded-3xl border border-amber-200 bg-gradient-to-br from-white to-amber-50/60 p-8 shadow-2xl glow-amber"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <Brain className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-amber-600">
                    Cross-Question Checkpoint
                  </p>
                  <h2 className="text-lg font-bold text-slate-900">
                    Concept Logic Check
                  </h2>
                </div>
              </div>
              <CountdownTimer secondsLeft={secondsLeft} />
            </div>

            {showSuccess ? (
              <div className="flex flex-col items-center py-8">
                <SuccessPulse show={showSuccess} />
                <p className="mt-4 font-medium text-emerald-600">
                  Correct! Unlocking editor...
                </p>
              </div>
            ) : locked ? (
              <div className="flex flex-col items-center py-8">
                <p className="font-medium text-amber-700">
                  Incorrect — opening Socratic Tutor...
                </p>
              </div>
            ) : (
              <>
                <p className="mb-6 text-base leading-relaxed text-slate-700">
                  {mcq.question}
                </p>
                <div className="space-y-3">
                  {mcq.choices.map((choice) => {
                    const isSelected = selectedMcqKey === choice.key;
                    const isCorrect =
                      isSelected && choice.key === correctKey;

                    return (
                      <button
                        key={choice.key}
                        onClick={() => handleAnswer(choice.key)}
                        disabled={mcqAnswered}
                        className={`w-full rounded-2xl border px-5 py-4 text-left text-sm transition-all ${
                          isCorrect
                            ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                            : isSelected
                              ? "border-red-300 bg-red-50 text-red-900"
                              : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50"
                        }`}
                      >
                        <span className="mr-3 font-bold text-indigo-600">
                          {choice.key}.
                        </span>
                        {choice.text}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function EvaluatingOverlay() {
  const status = useStore((s) => s.workspaceStatus);
  const isVisible = status === "EVALUATING";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="evaluating-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm"
        >
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <p className="mt-4 max-w-xs text-center text-sm font-medium text-slate-600">
            Reviewing Concept Logic: AI agents are analyzing your draft...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
