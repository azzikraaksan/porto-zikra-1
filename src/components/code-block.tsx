import type { ReactNode } from "react";

/**
 * Syntax highlighter mini yang berjalan di server (React Server Component).
 * Cukup untuk snippet TS/TSX pendek dan tidak menambah satu byte pun ke bundle klien.
 */
const TOKEN =
  /(\/\/.*$)|("(?:[^"\\\n]|\\.)*")|\b(const|let|function|return|export|import|from|type|async|await|for|of|if|else|new|as|extends|readonly|true|false|default|satisfies|typeof|keyof)\b|\b(\d+)\b|(<\/?[A-Za-z][\w.]*)/gm;

const CLASSES = [
  "text-muted-foreground/70 italic", // comment
  "text-brand", // string
  "text-violet-600 dark:text-violet-400", // keyword
  "text-amber-600 dark:text-amber-400", // number
  "text-sky-700 dark:text-sky-300", // jsx tag
];

function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) out.push(code.slice(last, index));
    const group = match.slice(1).findIndex((g) => g !== undefined);
    out.push(
      <span key={index} className={CLASSES[group]}>
        {match[0]}
      </span>,
    );
    last = index + match[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function CodeBlock({ filename, code }: { filename: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2.5">
        <span className="font-mono text-xs text-muted-foreground">{filename}</span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6 sm:p-5 sm:text-[13px]">
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}
