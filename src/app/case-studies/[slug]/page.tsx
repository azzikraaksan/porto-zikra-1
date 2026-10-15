import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Hash, Target, TrendingUp, Wrench, type LucideIcon } from "lucide-react";
import { caseStudies, getCaseStudy, getCategory, product } from "@/data/case-studies";
import { getSkill } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { BrowserFrame, Screenshot } from "@/components/screenshot";
import { Toc } from "@/components/toc";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return { title: study.title, description: study.challenge };
}

const sections: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "tantangan", label: "Tantangan", icon: Target },
  { id: "eksekusi", label: "Eksekusi Teknis", icon: Wrench },
  { id: "dampak", label: "Dampak", icon: TrendingUp },
];

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length]!;
  const next = caseStudies[(index + 1) % caseStudies.length]!;
  const category = getCategory(study.category);
  const toc = [...sections.map(({ id, label }) => ({ id, label })), { id: "stack", label: "Stack & repo" }];

  return (
    <article className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 -z-10 h-[28rem] opacity-50" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />

      {/* ---------- Header ---------- */}
      <header className="container pb-12 pt-10 sm:pt-16">
        <Link
          href="/#case-studies"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Semua case studies
        </Link>

        <div className="mt-8 max-w-3xl animate-fade-up">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand">
            <study.icon className="size-4" />
            Case {String(index + 1).padStart(2, "0")} · {category?.title}
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">{study.title}</h1>
          <p className="mt-5 text-pretty text-lg text-muted-foreground">
            Studi kasus teknis dari {product.name}, {product.description}.
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {study.highlights.map((h) => (
              <Badge key={h} variant="outline" className="font-normal text-muted-foreground">
                {h}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tombol URL per section */}
        <nav
          aria-label="Lompat ke section"
          className="mt-8 flex animate-fade-up flex-wrap gap-3"
          style={{ animationDelay: "120ms" }}
        >
          {sections.map(({ id, label, icon: Icon }) => (
            <a key={id} href={`#${id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Icon />
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* ---------- Cover ---------- */}
      <div className="container">
        <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
          <BrowserFrame label={`${product.name.toLowerCase()} — ${study.slug}`}>
            <Screenshot shot={study.image} priority sizes="(min-width: 1120px) 1088px, 100vw" />
          </BrowserFrame>
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="container grid gap-12 py-20 lg:grid-cols-[180px_1fr] lg:gap-16 [&>*]:min-w-0">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Toc items={toc} />
          </div>
        </aside>

        <div className="space-y-20">
          <Section id="tantangan" eyebrow="01" title="Konteks & Tantangan">
            <Reveal className="max-w-3xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              {study.challenge}
            </Reveal>
          </Section>

          <Section id="eksekusi" eyebrow="02" title="Eksekusi Teknis">
            <ol className="space-y-3">
              {study.execution.map((step, i) => (
                <Reveal as="li" key={step} delay={i * 50} className="flex gap-4 rounded-lg border bg-card p-4">
                  <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed sm:text-base">{step}</span>
                </Reveal>
              ))}
            </ol>
          </Section>

          <Section id="dampak" eyebrow="03" title="Dampak Sistem">
            <Reveal className="max-w-3xl rounded-xl border border-brand/25 bg-brand/[0.06] p-5 sm:p-6">
              <p className="text-pretty leading-relaxed sm:text-lg">{study.impact}</p>
            </Reveal>
          </Section>

          <Section id="stack" eyebrow="04" title="Stack & repo">
            <Reveal className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">Skill</span>
                {study.skills.map((s) => {
                  const skill = getSkill(s);
                  if (!skill) return null;
                  return (
                    <Link
                      key={s}
                      href={`/skills/${s}`}
                      className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2 py-1 text-xs font-medium transition-colors hover:bg-accent"
                    >
                      <skill.icon className="size-3.5" />
                      {skill.name}
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">Repo</span>
                {study.repos.map((r) => (
                  <Badge key={r} variant="secondary" className="font-mono font-normal">
                    {r}
                  </Badge>
                ))}
              </div>
            </Reveal>
          </Section>

          {/* Prev / next */}
          <nav aria-label="Navigasi case study" className="grid gap-3 border-t pt-8 sm:grid-cols-2">
            <Link
              href={`/case-studies/${prev.slug}`}
              className="group rounded-lg border p-4 transition-colors hover:bg-accent/40"
            >
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Sebelumnya
              </span>
              <span className="mt-1 block font-medium">{prev.title}</span>
            </Link>
            <Link
              href={`/case-studies/${next.slug}`}
              className="group rounded-lg border p-4 text-right transition-colors hover:bg-accent/40"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                Berikutnya
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block font-medium">{next.title}</span>
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("group scroll-mt-24")}>
      <Reveal className="mb-6">
        <p className="font-mono text-xs text-brand">{eyebrow}</p>
        <h2 className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
          <a
            href={`#${id}`}
            aria-label={`Tautan ke section ${title}`}
            className="rounded p-1 text-muted-foreground/0 transition-colors hover:text-foreground focus-visible:text-foreground group-hover:text-muted-foreground"
          >
            <Hash className="size-4" />
          </a>
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
