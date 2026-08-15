"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Unlock, Bot } from "lucide-react";
import { useStore, MOCK_ASSIGNMENT } from "@/store/useStore";

const TUTOR_FULL_MESSAGE = `I notice you're thinking about centrifugal force as a real outward push. Let's explore that together.

${MOCK_ASSIGNMENT.tutor_context.socratic_analogy}

In the road's frame of reference, is there actually a force pulling the passenger outward? What does Newton's first law tell us about objects that want to keep moving straight?

I'll never write your essay for you — but I'll help you discover the physics yourself. After reflecting on this, tell me in your own words why the passenger feels pushed to the side.`;

const SOCRATIC_FOLLOWUP =
  "What would you say is really happening to the passenger's body when the car turns — is something pulling them out, or is something else moving underneath them?";

export function SocraticTutorPanel() {
  const workspaceStatus = useStore((s) => s.workspaceStatus);
  const tutorPhase = useStore((s) => s.tutorPhase);
  const tutorMessages = useStore((s) => s.tutorMessages);
  const tutorStreamComplete = useStore((s) => s.tutorStreamComplete);
  const canUnlockCanvas = useStore((s) => s.canUnlockCanvas);
  const addTutorMessage = useStore((s) => s.addTutorMessage);
  const completeTutorStream = useStore((s) => s.completeTutorStream);
  const sendStudentChat = useStore((s) => s.sendStudentChat);
  const unlockCanvas = useStore((s) => s.unlockCanvas);

  const [streamedText, setStreamedText] = useState("");
  const [reflectionSeconds, setReflectionSeconds] = useState(10);
  const [chatInput, setChatInput] = useState("");
  const streamStarted = useRef(false);

  const isOpen = workspaceStatus === "TUTORING";

  useEffect(() => {
    if (!isOpen) {
      setStreamedText("");
      setReflectionSeconds(10);
      setChatInput("");
      streamStarted.current = false;
      return;
    }

    if (!streamStarted.current) {
      streamStarted.current = true;
      let index = 0;
      const interval = setInterval(() => {
        index += 3;
        if (index >= TUTOR_FULL_MESSAGE.length) {
          setStreamedText(TUTOR_FULL_MESSAGE);
          clearInterval(interval);
          addTutorMessage({
            id: "tutor-main",
            role: "tutor",
            content: TUTOR_FULL_MESSAGE,
          });
        } else {
          setStreamedText(TUTOR_FULL_MESSAGE.slice(0, index));
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [isOpen, addTutorMessage]);

  useEffect(() => {
    if (!isOpen || tutorStreamComplete) return;
    if (streamedText.length >= TUTOR_FULL_MESSAGE.length) {
      const timer = setInterval(() => {
        setReflectionSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            completeTutorStream();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, streamedText, tutorStreamComplete, completeTutorStream]);

  const handleSend = () => {
    if (!chatInput.trim() || tutorPhase === "REFLECTION_LOCK") return;
    sendStudentChat(chatInput.trim());
    setChatInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="tutor-panel"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="flex w-full flex-col border-l border-slate-200 bg-white lg:fixed lg:right-0 lg:top-0 lg:z-20 lg:h-screen lg:w-[420px]"
        >
          <div className="border-b border-slate-200 bg-amber-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <Bot className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Socratic AI Tutor</h3>
                <p className="text-xs text-slate-600">
                  Guiding, never giving direct answers
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-xs font-medium uppercase text-amber-700">
                Misconception Detected
              </p>
              <p className="text-sm text-amber-900">
                {MOCK_ASSIGNMENT.tutor_context.confusion_point}
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-indigo-600" />
                <span className="text-xs font-medium text-indigo-700">
                  Socratic Guidance
                </span>
                {tutorPhase === "REFLECTION_LOCK" && (
                  <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                    Read & reflect: {reflectionSeconds}s
                  </span>
                )}
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {streamedText}
                {streamedText.length < TUTOR_FULL_MESSAGE.length && (
                  <span className="animate-pulse text-indigo-500">▊</span>
                )}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <p className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
                Remedial Video — Physics of Circular Motion
              </p>
              <div className="aspect-video w-full">
                <iframe
                  src={MOCK_ASSIGNMENT.tutor_context.youtube_url}
                  title="Physics of Circular Motion"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {tutorMessages
              .filter((m) => m.id !== "tutor-main")
              .map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-2xl p-4 text-sm ${
                    msg.role === "tutor"
                      ? "border border-indigo-200 bg-indigo-50 text-indigo-900"
                      : "ml-4 border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {msg.content}
                </div>
              ))}

            {tutorStreamComplete && tutorMessages.length <= 1 && (
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
                {SOCRATIC_FOLLOWUP}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-white p-4">
            {canUnlockCanvas && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={unlockCanvas}
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                <Unlock className="h-4 w-4" />
                Unlock Canvas
              </motion.button>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={tutorPhase === "REFLECTION_LOCK"}
                placeholder={
                  tutorPhase === "REFLECTION_LOCK"
                    ? "Reflect on the guidance above..."
                    : "Ask a question or explain your understanding..."
                }
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70"
              />
              <button
                onClick={handleSend}
                disabled={tutorPhase === "REFLECTION_LOCK" || !chatInput.trim()}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
