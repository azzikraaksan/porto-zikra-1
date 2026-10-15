import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getSkill, skills } from "@/data/skills";
import { caseStudies, product } from "@/data/case-studies";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { CodeBlock } from "@/components/code-block";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return skills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const skill = getSkill((await params).slug);
  if (!skill) return {};
  return { title: skill.name, description: skill.summary };
}

export default async function SkillPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const index = skills.findIndex((s) => s.slug === skill.slug);
  const prev = skills[(index - 1 + skills.length) % skills.length]!;
  const next = skills[(index + 1) % skills.length]!;
  const related = caseStudies.filter((c) => c.skills.includes(skill.slug));

  return (
    <article className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 -z-10 h-96 opacity-50" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="container py-12 sm:py-20">
        <Link
          href="/skills"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Semua skill
        </Link>

        {/* Header */}
        <header className="mt-8 flex animate-fade-up flex-col gap-6 sm:flex-row sm:items-center">
          <span className="grid size-16 shrink-0 place-items-center rounded-2xl border bg-card text-brand shadow-sm sm:size-20">
            <skill.icon className="size-8 sm:size-10" />
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{skill.category}</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{skill.name}</h1>
          </div>
        </header>
        <p
          className="mt-6 max-w-3xl animate-fade-up text-pretty text-muted-foreground sm:text-lg"
          style={{ animationDelay: "80ms" }}
        >
          {skill.description}
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          <div className="min-w-0 space-y-16">
            {/* Penerapan */}
            <section>
              <Reveal>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Penerapan di {product.name}</h2>
              </Reveal>
              <ul className="mt-6 space-y-3">
                {skill.inPractice.map((item, i) => (
                  <Reveal as="li" key={item} delay={i * 60} className="flex gap-3 rounded-lg border bg-card p-4">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                      <Check className="size-3" />
                    </span>
                    <span className="text-sm leading-relaxed sm:text-base">{item}</span>
                  </Reveal>
                ))}
              </ul>
            </section>

            {/* Prinsip */}
            <section>
              <Reveal>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Prinsip yang saya pegang</h2>
              </Reveal>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {skill.principles.map((p, i) => (
                  <Reveal key={p.title} delay={i * 80} className="rounded-xl border bg-card p-5">
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-medium">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Snippet */}
            <section>
              <Reveal>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Contoh pola</h2>
                <p className="mt-2 text-sm text-muted-foreground">{skill.snippet.caption}</p>
              </Reveal>
              <Reveal className="mt-6">
                <CodeBlock filename={skill.snippet.filename} code={skill.snippet.code} />
              </Reveal>
            </section>

            {/* Case studies terkait */}
            <section>
              <Reveal>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Case studies terkait</h2>
              </Reveal>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {related.map((study, i) => (
                  <Reveal as="li" key={study.slug} delay={i * 60}>
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="group flex h-full items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-accent/40"
                    >
                      <study.icon className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium leading-snug">{study.title}</span>
                        <span className="mt-1 line-clamp-2 block text-xs text-muted-foreground">{study.impact}</span>
                      </span>
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal className="rounded-xl border bg-card p-5">
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Ekosistem</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {skill.ecosystem.map((tool) => (
                  <Badge key={tool} variant="secondary" className="font-normal">
                    {tool}
                  </Badge>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80} className="rounded-xl border bg-card p-2">
              <h2 className="px-3 pb-1 pt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Skill lainnya
              </h2>
              <nav aria-label="Skill lainnya" className="flex flex-col">
                {skills.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/skills/${s.slug}`}
                    aria-current={s.slug === skill.slug ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                      s.slug === skill.slug && "bg-accent font-medium text-foreground",
                    )}
                  >
                    <s.icon className="size-4" />
                    {s.name}
                  </Link>
                ))}
              </nav>
            </Reveal>
          </aside>
        </div>

        {/* Prev / next */}
        <nav aria-label="Navigasi skill" className="mt-20 grid gap-3 border-t pt-8 sm:grid-cols-2">
          <Link
            href={`/skills/${prev.slug}`}
            className="group rounded-lg border p-4 transition-colors hover:bg-accent/40"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              Sebelumnya
            </span>
            <span className="mt-1 block font-medium">{prev.name}</span>
          </Link>
          <Link
            href={`/skills/${next.slug}`}
            className="group rounded-lg border p-4 text-right transition-colors hover:bg-accent/40"
          >
            <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              Berikutnya
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-1 block font-medium">{next.name}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
