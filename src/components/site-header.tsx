"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/#about", label: "About", section: "about" },
  { href: "/skills", label: "Skills", section: "skills" },
  { href: "/#case-studies", label: "Case Studies", section: "case-studies" },
  { href: "/#contact", label: "Contact", section: "contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Border + blur muncul setelah user mulai scroll (listener pasif, setState hanya saat berubah)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sorot menu sesuai section yang sedang terlihat (hanya di halaman utama)
  useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname.startsWith("/skills") ? "skills" : null);
      return;
    }
    const sections = ["about", "case-studies", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-[background-color,border-color] duration-300",
        (scrolled || open) && "border-border/60 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div className="scroll-progress absolute inset-x-0 bottom-[-1px] h-px bg-brand" aria-hidden="true" />

      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground transition-transform group-hover:-rotate-6">
            {site.name.charAt(0)}
          </span>
          <span>
            {site.name.toLowerCase()}
            <span className="text-brand">.dev</span>
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                active === item.section && "text-foreground",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "mx-auto mt-0.5 block h-px w-0 bg-brand transition-all duration-300",
                  active === item.section && "w-4",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div id="mobile-nav" className="collapsible md:hidden" data-open={open}>
        <div inert={!open}>
          <nav aria-label="Navigasi mobile" className="container flex flex-col gap-1 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                  active === item.section && "bg-accent text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
