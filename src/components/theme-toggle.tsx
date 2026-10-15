"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  // Matikan semua transisi sesaat agar pergantian tema instan (tanpa repaint berantai / lag)
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(style);

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;

  // Paksa style recalculation, lalu hapus override di frame berikutnya
  void window.getComputedStyle(document.body).opacity;
  requestAnimationFrame(() => requestAnimationFrame(() => style.remove()));
}

/**
 * Ikon dipilih murni lewat CSS (dark:hidden / dark:block), jadi komponen ini
 * tidak butuh state dan tidak ada hydration mismatch.
 */
export function ThemeToggle() {
  // Ikuti perubahan tema sistem selama user belum memilih manual
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {}
      if (!stored) applyTheme(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Ganti tema terang/gelap" title="Ganti tema">
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </Button>
  );
}
