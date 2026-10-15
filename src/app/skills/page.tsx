import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { skills } from "@/data/skills";
import { caseStudies } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Skills",
  description: "Detail keahlian teknis: React, TypeScript, Tailwind CSS, Microservices, dan Node.js.",
};

export default function SkillsPage() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 -z-10 h-80 opacity-50" />
      <div className="container py-16 sm:py-24">
        <div className="max-w-2xl animate-fade-up">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Skills</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Toolkit & cara saya memakainya.</h1>
          <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
            Setiap skill di bawah ini punya halaman sendiri: bagaimana saya menerapkannya di production, prinsip yang
            saya pegang, contoh pola kode, dan case study yang terkait.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => {
            const related = caseStudies.filter((c) => c.skills.includes(skill.slug)).length;
            return (
              <Reveal as="li" key={skill.slug} delay={i * 70}>
                <Link
                  href={`/skills/${skill.slug}`}
                  className="group flex h-full flex-col rounded-xl border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-lg border bg-background transition-colors group-hover:text-brand">
                      <skill.icon className="size-6" />
                    </span>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <h2 className="mt-5 text-lg font-semibold tracking-tight">{skill.name}</h2>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {skill.category}
                  </p>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{skill.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {skill.ecosystem.slice(0, 3).map((tool) => (
                      <Badge key={tool} variant="outline" className="font-normal text-muted-foreground">
                        {tool}
                      </Badge>
                    ))}
                    <Badge variant="brand">{related} case studies</Badge>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
