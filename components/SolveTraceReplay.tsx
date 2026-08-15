"use client";

import { useEffect, useState, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { MOCK_SOLVE_TRACE, type SolveTraceEvent } from "@/store/useStore";

const SPEED_OPTIONS = [
  { label: "0.5x", ms: 2000 },
  { label: "1x", ms: 1000 },
  { label: "2.5x", ms: 400 },
];

const EVENT_BADGES: Record<string, { label: string; color: string }> = {
  "Session Started": {
    label: "Session Started",
    color: "bg-slate-100 text-slate-700",
  },
  Typing: { label: "Typing...", color: "bg-indigo-50 text-indigo-700" },
  "Checkpoint Triggered": {
    label: "MCQ Checkpoint Triggered",
    color: "bg-amber-50 text-amber-800",
  },
  "MCQ Incorrect: Selected Choice A": {
    label: "MCQ Answered Incorrectly",
    color: "bg-red-50 text-red-700",
  },
  "Socratic Tutor Chat Opened & YouTube Video Suggested": {
    label: "Socratic Analogy Streamed / YouTube Video Loaded",
    color: "bg-purple-50 text-purple-700",
  },
  "Socratic Tutor Complete (Editor Unlocked)": {
    label: "Tutor Session Complete",
    color: "bg-emerald-50 text-emerald-700",
  },
  "Submission Finalized": {
    label: "Submission Completed",
    color: "bg-emerald-50 text-emerald-700",
  },
};

interface SolveTraceReplayProps {
  trace?: SolveTraceEvent[];
}

export function SolveTraceReplay({
  trace = MOCK_SOLVE_TRACE,
}: SolveTraceReplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1000);

  const maxIndex = trace.length - 1;
  const current = trace[currentIndex];
  const badge = EVENT_BADGES[current?.event] ?? EVENT_BADGES["Typing"];

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= maxIndex) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, speedMs, maxIndex]);

  const handleSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentIndex(Number(e.target.value));
      setIsPlaying(false);
    },
    []
  );

  const reset = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Solve Trace Replay
        </h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${badge.color}`}
        >
          Tick {current?.tick ?? 0}: {badge.label}
        </span>
      </div>

      <div className="mb-4 min-h-[200px] flex-1 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
          Reconstructed Essay
        </p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
          {current?.text_state || (
            <span className="italic text-slate-400">Session not started...</span>
          )}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-2 flex justify-between text-xs text-slate-500">
            <span>Timeline</span>
            <span>
              Tick {current?.tick ?? 0} / {trace[maxIndex]?.tick ?? 0}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={maxIndex}
            value={currentIndex}
            onChange={handleSlider}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Play
              </>
            )}
          </button>

          <div className="flex rounded-xl bg-slate-100 p-1">
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setSpeedMs(opt.ms)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  speedMs === opt.ms
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        <p className="text-xs text-slate-500">Event: {current?.event ?? "—"}</p>
      </div>
    </div>
  );
}
