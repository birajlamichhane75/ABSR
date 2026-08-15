"use client";

import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/AppLayout";
import { useStore } from "@/store/useStore";
import type { TextSize, ThemeMode } from "@/store/useStore";
import { LogOut, Moon, Sun, Type } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const userName = useStore((s) => s.userName);
  const settings = useStore((s) => s.settings);
  const setDisplayName = useStore((s) => s.setDisplayName);
  const updateSettings = useStore((s) => s.updateSettings);
  const logout = useStore((s) => s.logout);
  const addToast = useStore((s) => s.addToast);

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 sm:text-3xl">
            Settings
          </h1>
          <p className="mt-2 text-[#64748B]">Manage your VoxLMS preferences.</p>

          <form
            className="surface-card mt-8 space-y-6 p-6 dark:border-slate-700 dark:bg-slate-800"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const name = (form.elements.namedItem("displayName") as HTMLInputElement).value;
              setDisplayName(name);
              addToast("Display name saved.", "success");
            }}
          >
            <fieldset>
              <legend className="text-sm font-semibold text-[#0F172A] dark:text-slate-100">
                Profile
              </legend>
              <label htmlFor="displayName" className="mt-3 block text-sm text-[#64748B]">
                Display name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                defaultValue={userName}
                className="focus-ring mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              />
              <button type="submit" className="btn-primary focus-ring mt-3 rounded-xl px-4 py-2 text-sm font-semibold">
                Save name
              </button>
            </fieldset>
          </form>

          <section className="surface-card mt-6 space-y-4 p-6 dark:border-slate-700 dark:bg-slate-800" aria-labelledby="appearance-heading">
            <h2 id="appearance-heading" className="flex items-center gap-2 text-sm font-semibold text-[#0F172A] dark:text-slate-100">
              <Sun className="h-4 w-4" aria-hidden="true" /> Appearance
            </h2>

            <div>
              <p className="text-sm text-[#64748B]">Theme</p>
              <div className="mt-2 flex gap-2" role="group" aria-label="Theme selection">
                {(["light", "dark"] as ThemeMode[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={settings.theme === t}
                    onClick={() => updateSettings({ theme: t })}
                    className={`focus-ring flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium capitalize ${
                      settings.theme === t
                        ? "bg-[#4F46E5] text-white"
                        : "border border-slate-200 text-[#64748B] dark:border-slate-600"
                    }`}
                  >
                    {t === "light" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="flex items-center gap-2 text-sm text-[#64748B]">
                <Type className="h-4 w-4" aria-hidden="true" /> Text size
              </p>
              <div className="mt-2 flex gap-2" role="group" aria-label="Text size selection">
                {(
                  [
                    ["sm", "Small"],
                    ["md", "Medium"],
                    ["lg", "Large"],
                  ] as [TextSize, string][]
                ).map(([size, label]) => (
                  <button
                    key={size}
                    type="button"
                    aria-pressed={settings.textSize === size}
                    onClick={() => updateSettings({ textSize: size })}
                    className={`focus-ring rounded-xl px-4 py-2 text-sm font-medium ${
                      settings.textSize === size
                        ? "bg-[#4F46E5] text-white"
                        : "border border-slate-200 text-[#64748B] dark:border-slate-600"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="surface-card mt-6 space-y-4 p-6 dark:border-slate-700 dark:bg-slate-800" aria-labelledby="notifications-heading">
            <h2 id="notifications-heading" className="text-sm font-semibold text-[#0F172A] dark:text-slate-100">
              Notifications (demo)
            </h2>
            {(
              [
                ["notifyCheckpoints", "MCQ checkpoint alerts"],
                ["notifyTutor", "Socratic tutor messages"],
                ["notifyGrades", "Grade and rubric updates"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center justify-between gap-4">
                <span className="text-sm text-[#0F172A] dark:text-slate-100">{label}</span>
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={(e) => updateSettings({ [key]: e.target.checked })}
                  className="focus-ring h-5 w-5 rounded border-slate-300 accent-[#4F46E5]"
                  aria-label={label}
                />
              </label>
            ))}
          </section>

          <button
            type="button"
            onClick={handleSignOut}
            className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 py-3 text-sm font-semibold text-[#F43F5E] hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/30"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
