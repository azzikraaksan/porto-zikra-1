import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Shot } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * Server component: jika file ada di /public, tampilkan gambarnya (next/image, otomatis
 * dioptimasi & lazy-load). Jika belum ada, tampilkan placeholder berisi path + ide mockup,
 * jadi kamu tinggal menaruh file di path tersebut.
 */
function fileExists(src: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

type ScreenshotProps = {
  shot: Shot;
  /** CSS aspect-ratio, mis. "16/10" */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Placeholder ringkas (tanpa teks ide) untuk slot kecil */
  compact?: boolean;
  className?: string;
};

export function Screenshot({
  shot,
  aspect = "16/10",
  sizes = "100vw",
  priority,
  compact,
  className,
}: ScreenshotProps) {
  const exists = fileExists(shot.src);

  return (
    <div className={cn("relative w-full overflow-hidden bg-muted", className)} style={{ aspectRatio: aspect }}>
      {exists ? (
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder: ${shot.alt}`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,transparent_0_12px,hsl(var(--border)/0.6)_12px_13px)] p-4 text-center"
        >
          <span className="grid size-9 place-items-center rounded-lg border bg-background text-muted-foreground">
            <ImageIcon className="size-4" />
          </span>
          <code className="break-all rounded bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:text-[11px]">
            public{shot.src}
          </code>
          {!compact ? (
            <p className="max-w-sm text-pretty text-xs leading-relaxed text-muted-foreground">{shot.idea}</p>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function BrowserFrame({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-2xl shadow-black/10 dark:shadow-black/50",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b bg-muted/40 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </span>
        <span className="mx-auto max-w-[70%] truncate rounded-md border bg-background px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
          {label}
        </span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}
