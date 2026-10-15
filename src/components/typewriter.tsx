"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TypewriterProps = {
  words: readonly string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
};

export function Typewriter({ words, className, typeSpeed = 75, deleteSpeed = 35, pause = 1800 }: TypewriterProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0] ?? "");
      return;
    }

    let wordIndex = 0;
    let length = 0;
    let deleting = false;
    let timer: number;

    const tick = () => {
      const word = words[wordIndex] ?? "";
      length += deleting ? -1 : 1;
      setText(word.slice(0, length));

      let delay = deleting ? deleteSpeed : typeSpeed;
      if (!deleting && length === word.length) {
        deleting = true;
        delay = pause;
      } else if (deleting && length === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timer);
  }, [words, typeSpeed, deleteSpeed, pause]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="whitespace-nowrap">
        {text}
      </span>
      <span aria-hidden="true" className="ml-1 inline-block h-[1em] w-[0.5ch] animate-blink bg-brand" />
    </span>
  );
}
