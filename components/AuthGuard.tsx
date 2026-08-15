"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const hydrateAuth = useStore((s) => s.hydrateAuth);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    hydrateAuth();
    setReady(true);
  }, [hydrateAuth]);

  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated && pathname !== "/login") {
      router.replace("/login");
    }
  }, [ready, isAuthenticated, pathname, router]);

  if (!ready) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#F8FAFC]"
        role="status"
        aria-live="polite"
      >
        <p className="text-secondary text-sm">Loading VoxLMS…</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
