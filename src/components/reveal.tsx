"use client";

import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Satu IntersectionObserver dipakai bersama oleh semua <Reveal>,
 * jadi biaya scroll tetap O(1) berapa pun jumlah elemennya.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.shown = "true";
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );
  return sharedObserver;
}

type RevealProps = {
  as?: "div" | "section" | "article" | "li" | "ul" | "header";
  /** Delay dalam ms — dipakai untuk efek stagger */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children: ReactNode;
};

export function Reveal({ as = "div", delay = 0, className, style, id, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return createElement(
    as,
    {
      ref,
      id,
      className,
      "data-reveal": "",
      style: { "--reveal-delay": `${delay}ms`, ...style } as CSSProperties,
    },
    children,
  );
}
