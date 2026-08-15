"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface CountdownTimerProps {
  secondsLeft: number;
  totalSeconds?: number;
  size?: "sm" | "md";
}

export function CountdownTimer({
  secondsLeft,
  totalSeconds = 10,
  size = "md",
}: CountdownTimerProps) {
  const radius = size === "sm" ? 14 : 18;
  const stroke = 4;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (secondsLeft / totalSeconds) * circumference;
  const dim = size === "sm" ? 40 : 48;

  return (
    <div
      className="relative flex items-center justify-center rounded-full bg-white text-slate-900 shadow-md border border-slate-200"
      style={{ height: dim, width: dim }}
    >
      <svg
        className="absolute transform -rotate-90"
        width={dim}
        height={dim}
      >
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={normalizedRadius}
          stroke="#e2e8f0"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={normalizedRadius}
          stroke="#f59e0b"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <span className="absolute text-sm font-bold text-amber-600">
        {secondsLeft}
      </span>
    </div>
  );
}

interface SuccessPulseProps {
  show: boolean;
}

export function SuccessPulse({ show }: SuccessPulseProps) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center justify-center"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: 2, duration: 0.4 }}
      >
        <CheckCircle2 className="h-16 w-16 text-emerald-500" />
      </motion.div>
    </motion.div>
  );
}
