import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";
import { featuredProject as project } from "@/data/projects";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrowserFrame, Screenshot } from "@/components/screenshot";

/**
 * Kartu "Featured Project" di hero: mockup browser + cuplikan detail yang melayang,
 * lalu judul, hook, peran, dan CTA ke halaman studi kasus lengkap.
 */
export function FeaturedProject() {
  const href = `/projects/${project.slug}`;

  return (
    <div className="relative animate-fade-up" style={{ animationDelay: "320ms" }}>
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand/20 via-transparent to-transparent blur-2xl"
      />

      {/* Mockup */}
      <Link href={href} aria-label={`Buka studi kasus ${project.name}`} className="group relative block">
        <BrowserFrame
          label={`${project.name.toLowerCase()} — dashboard`}
          className="transition-transform duration-500 group-hover:-translate-y-1"
        >
          <Screenshot shot={project.cover} priority sizes="(min-width: 1024px) 540px, 100vw" />
        </BrowserFrame>

        <div className="absolute -bottom-6 -left-3 hidden w-40 overflow-hidden rounded-lg border bg-card shadow-xl shadow-black/10 transition-transform duration-500 group-hover:translate-y-1 sm:block lg:-left-8 lg:w-44 dark:shadow-black/50">
          <Screenshot shot={project.coverDetail} aspect="4/3" compact sizes="176px" />
        </div>
      </Link>

      {/* Info */}
      <div className="mt-6 rounded-xl border bg-card/80 p-5 backdrop-blur sm:mt-10 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Featured Project</p>
          <span className="font-mono text-[11px] text-muted-foreground">{project.category}</span>
        </div>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight">{project.name}</h2>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{project.hook}</p>

        <div className="mt-4 flex items-start gap-3 rounded-lg border bg-background/60 p-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-brand/10 text-brand">
            <UserRound className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Peran saya</p>
            <p className="text-sm font-medium">{project.role.title}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.role.highlights.map((h) => (
                <Badge key={h} variant="outline" className="font-normal text-muted-foreground">
                  {h}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Link href={href} className={buttonVariants({ className: "group mt-5 w-full sm:w-auto" })}>
          Baca Studi Kasus Lengkap
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
