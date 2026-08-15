"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  MOCK_LEARNING_GRAPH,
  type LearningGraphPoint,
} from "@/store/useStore";

interface StudentGraphProps {
  data?: LearningGraphPoint[];
}

export function StudentGraph({ data = MOCK_LEARNING_GRAPH }: StudentGraphProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Understanding Over Time
        </h3>
        <p className="text-sm text-slate-600">
          Student comprehension score at each checkpoint
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="checkpoint"
              tick={{ fill: "#475569", fontSize: 11 }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#475569", fontSize: 11 }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                color: "#0f172a",
              }}
              formatter={(value) => [`${value}%`, "Understanding"]}
              labelFormatter={(label) => `Checkpoint: ${label}`}
            />
            <ReferenceLine
              y={50}
              stroke="#ef4444"
              strokeDasharray="6 4"
              label={{
                value: "Confusion Alert (50%)",
                fill: "#dc2626",
                fontSize: 11,
                position: "insideTopRight",
              }}
            />
            <Line
              type="monotone"
              dataKey="understanding_score"
              stroke="#4f46e5"
              strokeWidth={2.5}
              dot={{ fill: "#4f46e5", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: "#6366f1" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {data.map((point) => (
          <div
            key={point.checkpoint}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <p className="text-xs font-medium text-indigo-700">
              {point.checkpoint}
            </p>
            <p className="text-lg font-bold text-slate-900">
              {point.understanding_score}%
            </p>
            <p className="text-[10px] text-slate-500">{point.event}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
