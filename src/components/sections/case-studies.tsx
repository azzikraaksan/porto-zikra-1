"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Target, TrendingUp, Wrench, type LucideIcon } from "lucide-react";
import { caseStudies, categories, product, type CaseStudy } from "@/data/case-studies";
import { getSkill } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const HASH_PREFIX = "#cs-";

export function CaseStudies() {
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(() => new Set([caseStudies[0]!.slug]));
  const allOpen = openSlugs.size === caseStudies.length;

  const toggle = useCallback((slug: string) => {
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  // Deep link: /#cs-<slug> (dipakai oleh halaman skill) langsung membuka item terkait
  useEffect(() => {
    const openFromHash = () => {
      const { hash } = window.location;
      if (!hash.startsWith(HASH_PREFIX)) return;
      const slug = hash.slice(HASH_PREFIX.length);
      if (!caseStudies.some((c) => c.slug === slug)) return;
      setOpenSlugs((prev) => new Set(prev).add(slug));
      requestAnimationFrame(() => document.getElementById(`cs-${slug}`)?.scrollIntoView({ block: "start" }));
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section id="case-studies" className="scroll-mt-16 border-t bg-muted/30 py-20 sm:py-28">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Technical Case Studies"
            title={`${caseStudies.length} tantangan enterprise di ${product.name}.`}
            description={`Bukan daftar proyek — ini adalah masalah teknis nyata yang saya selesaikan saat membangun ${product.description}, lengkap dengan konteks, eksekusi, dan dampaknya.`}
          />
          <Reveal className="shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenSlugs(allOpen ? new Set() : new Set(caseStudies.map((c) => c.slug)))}
            >
              {allOpen ? "Tutup semua" : "Buka semua"}
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 space-y-12">
          {categories.map((category, c) => (
            <div key={category.slug}>
              <Reveal className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs text-brand">Kategori {c + 1}</span>
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{category.title}</h3>
                <span aria-hidden="true" className="h-px flex-1 bg-border" />
              </Reveal>
              <ol className="space-y-4">
                {caseStudies
                  .filter((study) => study.category === category.slug)
                  .map((study) => {
                    const i = caseStudies.indexOf(study);
                    return (
                      <Reveal as="li" key={study.slug}>
                        <CaseStudyItem
                          study={study}
                          index={i}
                          open={openSlugs.has(study.slug)}
                          onToggle={() => toggle(study.slug)}
                        />
                      </Reveal>
                    );
                  })}
              </ol>
            </div>
          ))}
        </div>

        <Reveal className="mt-8 flex justify-center">
          <Link href="/projects/alurkerja" className={buttonVariants({ variant: "outline", className: "group" })}>
            Baca Studi Kasus Lengkap {product.name}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

type CaseStudyItemProps = {
  study: CaseStudy;
  index: number;
  open: boolean;
  onToggle: () => void;
};

function CaseStudyItem({ study, index, open, onToggle }: CaseStudyItemProps) {
  const panelId = `cs-panel-${study.slug}`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      id={`cs-${study.slug}`}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-xl border bg-card transition-[border-color,box-shadow] duration-300",
        open ? "border-foreground/15 shadow-lg shadow-black/[0.03] dark:shadow-black/30" : "hover:border-foreground/15",
      )}
    >
      <h4>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:items-center sm:gap-5 sm:p-6"
        >
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-lg border transition-colors",
              open ? "border-brand/30 bg-brand/10 text-brand" : "bg-background text-muted-foreground",
            )}
          >
            <study.icon className="size-5" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="font-mono text-xs text-muted-foreground">Case {number}</span>
            <span className="mt-0.5 block text-base font-semibold leading-snug tracking-tight sm:text-lg">
              {study.title}
            </span>
            <span className="mt-2.5 flex flex-wrap gap-1.5">
              {study.highlights.map((h) => (
                <Badge key={h} variant="outline" className="font-normal text-muted-foreground">
                  {h}
                </Badge>
              ))}
            </span>
          </span>

          <ChevronDown
            className={cn(
              "mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-foreground sm:mt-0",
              open && "rotate-180",
            )}
          />
        </button>
      </h4>

      <div id={panelId} role="region" aria-label={study.title} className="collapsible" data-open={open}>
        <div inert={!open}>
          <div className="border-t px-5 pb-6 pt-5 sm:px-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Block icon={Target} label="Tantangan" text={study.challenge} />
              <Block icon={Wrench} label="Eksekusi Teknis" items={study.execution} />
              <Block icon={TrendingUp} label="Dampak" text={study.impact} highlight />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">Stack</span>
              {study.skills.map((slug) => {
                const skill = getSkill(slug);
                if (!skill) return null;
                return (
                  <Link
                    key={slug}
                    href={`/skills/${slug}`}
                    className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2 py-1 text-xs font-medium transition-colors hover:border-foreground/20 hover:bg-accent"
                  >
                    <skill.icon className="size-3.5" />
                    {skill.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
              <p className="font-mono text-xs text-muted-foreground">{study.repos.join(" · ")}</p>
              <Link href={`/case-studies/${study.slug}`} className={buttonVariants({ size: "sm", className: "group" })}>
                Baca studi kasus lengkap
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Block({
  icon: Icon,
  label,
  text,
  items,
  highlight,
}: {
  icon: LucideIcon;
  label: string;
  text?: string;
  items?: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        highlight ? "border-brand/25 bg-brand/[0.06]" : "bg-background/60",
      )}
    >
      <p
        className={cn(
          "flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider",
          highlight ? "text-brand" : "text-muted-foreground",
        )}
      >
        <Icon className="size-3.5" />
        {label}
      </p>
      {text ? <p className="mt-2.5 text-pretty text-sm leading-relaxed text-foreground/90">{text}</p> : null}
      {items ? (
        <ul className="mt-2.5 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-foreground/90 marker:text-muted-foreground">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
