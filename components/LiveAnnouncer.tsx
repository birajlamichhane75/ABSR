"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";

export function LiveAnnouncer() {
  const pathname = usePathname();
  const announcement = useStore((s) => s.liveAnnouncement);

  useEffect(() => {
    const titles: Record<string, string> = {
      "/login": "Sign in — VoxLMS",
      "/student": "Dashboard — VoxLMS",
      "/student/courses": "My courses — VoxLMS",
      "/student/analytics": "Your analytics — VoxLMS",
      "/student/workspace": "Socratic workspace — VoxLMS",
      "/teacher": "Teacher dashboard — VoxLMS",
      "/teacher/analytics": "Student analytics — VoxLMS",
      "/settings": "Settings — VoxLMS",
    };
    const pageName = titles[pathname] ?? "VoxLMS";
    document.title = pageName;
    useStore.getState().announce(`Navigated to ${pageName.replace(" — VoxLMS", "")}`);
  }, [pathname]);

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="additions text"
        className="sr-only"
      >
        {announcement}
      </div>
    </>
  );
}

export function ThemeApplier() {
  const theme = useStore((s) => s.settings.theme);
  const textSize = useStore((s) => s.settings.textSize);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    root.dataset.textSize = textSize;
  }, [theme, textSize]);

  return null;
}
