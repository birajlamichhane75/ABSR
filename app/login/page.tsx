"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Brain,
  TrendingUp,
  CheckCircle2,
  Mail,
  Lock,
  User,
  Globe,
  Code2,
} from "lucide-react";
import {
  useStore,
  DEMO_EMAIL,
  DEMO_PASSWORD,
  type Role,
} from "@/store/useStore";

type AuthMode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);
  const register = useStore((s) => s.register);
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const role = useStore((s) => s.role);

  const [mode, setMode] = useState<AuthMode>("login");
  const [authRole, setAuthRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(role === "teacher" ? "/teacher" : "/student");
    }
  }, [isAuthenticated, role, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      const ok = login(email, password, authRole);
      if (!ok) {
        setError("Invalid credentials. Use the demo email and password shown below.");
        return;
      }
      router.push(authRole === "teacher" ? "/teacher" : "/student");
      return;
    }

    const ok = register(name, authRole, email, password);
    if (!ok) {
      setError("Please enter your name, email, and a password (4+ characters).");
      return;
    }
    router.push(authRole === "teacher" ? "/teacher" : "/student");
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Branding panel */}
      <section
        className="relative flex min-h-[42vh] flex-1 flex-col justify-between overflow-hidden bg-[#070B14] px-6 py-10 text-white lg:min-h-screen lg:px-12 lg:py-14"
        aria-label="Nous LMS product preview"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-purple-600/30 blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[90px]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/30">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">Nous LMS</p>
              <p className="text-sm text-slate-400">Socratic AI learning platform</p>
            </div>
          </div>
          <h1 className="mt-10 max-w-lg text-3xl font-bold leading-tight lg:text-4xl">
            Learn by thinking, not by copying answers.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
            Real-time writing checkpoints, Socratic tutoring, and teacher analytics
            that reveal how understanding develops over time.
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-10 w-full max-w-md lg:mt-0">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300">
              Live workspace
            </p>
            <p className="mt-2 text-sm text-slate-200">
              Explain circular motion using frame of reference…
            </p>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-2 top-8 w-44 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3 backdrop-blur-md lg:-right-16"
          >
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs font-semibold">Checkpoint passed</span>
            </div>
            <p className="mt-1 text-[11px] text-emerald-100/80">Inertia concept clarified</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            className="absolute -left-2 bottom-0 w-48 rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 backdrop-blur-md lg:-left-14"
          >
            <div className="flex items-center gap-2 text-blue-300">
              <Brain className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs font-semibold">Socratic tutor</span>
            </div>
            <p className="mt-1 text-[11px] text-blue-100/80">Guiding with analogy, not answers</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.2 }}
            className="absolute bottom-[-3rem] right-8 w-40 rounded-xl border border-violet-400/20 bg-violet-500/10 p-3 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-violet-300">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs font-semibold">Understanding +18%</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Login panel */}
      <section className="flex flex-1 items-center justify-center bg-[#F4F6FA] px-4 py-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/60 transition-shadow hover:shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-slate-900">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {mode === "login"
              ? "Sign in to continue your Socratic learning session."
              : "Register for the demo — no backend required."}
          </p>

          <div
            className="mt-6 flex rounded-xl bg-slate-100 p-1"
            role="tablist"
            aria-label="Select role"
          >
            {(["student", "teacher"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={authRole === r}
                onClick={() => setAuthRole(r)}
                className={`focus-ring flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold capitalize transition-all ${
                  authRole === r
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-2 border-b border-slate-200">
            {(["login", "register"] as AuthMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                className={`focus-ring border-b-2 px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  mode === m
                    ? "border-violet-600 text-violet-700"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <AnimatePresence mode="wait">
              {mode === "register" && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="focus-ring w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-900 transition-shadow focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                      placeholder="Alex Rivera"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="focus-ring w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-900 transition-shadow focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                  placeholder="you@school.edu"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  required
                  className="focus-ring w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-900 transition-shadow focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-error text-sm" role="alert">
                {error}
              </p>
            )}

            {mode === "login" && (
              <div className="rounded-xl border border-violet-100 bg-violet-50/60 px-4 py-3 text-sm text-slate-600">
                <p className="font-medium text-violet-800">Demo credentials</p>
                <p className="mt-1">
                  Email: <span className="font-mono text-slate-800">{DEMO_EMAIL}</span>
                </p>
                <p>
                  Password: <span className="font-mono text-slate-800">{DEMO_PASSWORD}</span>
                </p>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="focus-ring mt-2 text-sm font-medium text-violet-700 underline-offset-2 hover:underline"
                >
                  Fill demo credentials
                </button>
              </div>
            )}

            <button
              type="submit"
              className="focus-ring w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-blue-500 hover:shadow-xl"
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-xs text-slate-400">Or continue with (demo only)</p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                disabled
                aria-label="Continue with Google (demo only, not functional)"
                className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm text-slate-500"
              >
                <Globe className="h-4 w-4" aria-hidden="true" /> Google
              </button>
              <button
                type="button"
                disabled
                aria-label="Continue with GitHub (demo only, not functional)"
                className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm text-slate-500"
              >
                <Code2 className="h-4 w-4" aria-hidden="true" /> GitHub
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
