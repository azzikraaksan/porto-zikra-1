import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { skills } from "@/data/skills";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const stats = [
  {
    value: "10+",
    label: "Fitur Full Stack",
    description: "Fitur React + Go yang dikembangkan pada platform workflow.",
  },
  {
    value: "20+",
    label: "Bug Diperbaiki",
    description: "Bug yang ditangani selama magang di PT Javan Cipta Solusi.",
  },
  {
    value: "3.96",
    label: "IPK / 4.00",
    description: "Pencapaian akademik pada program studi Sistem Informasi.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="About & Skills"
          title="Full Stack Developer yang berfokus pada pengembangan aplikasi web."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 [&>*]:min-w-0">
          <Reveal className="space-y-5 text-pretty text-muted-foreground sm:text-lg">
            <p>
              Saya adalah Full Stack Developer dengan pengalaman lebih dari 1
              tahun dalam pengembangan aplikasi web menggunakan React,
              TypeScript, Laravel, dan Go. Saat ini, saya terlibat dalam
              pengembangan fitur frontend dan backend pada platform SaaS
              workflow, termasuk pengembangan API, pengelolaan data, dan kontrol
              akses pengguna.
            </p>
            <p>
              Saya terbiasa mengembangkan fitur aplikasi, memperbaiki bug,
              melakukan debugging, serta menjaga kualitas dan kemudahan
              pemeliharaan kode. Saya senang memecahkan masalah teknis dan
              berkolaborasi dengan tim untuk membangun aplikasi yang andal dan
              mudah dikembangkan.
            </p>

            <dl className="grid grid-cols-3 gap-3 pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse rounded-lg border bg-card p-4"
                >
                  <dt className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                    <span className="block font-medium text-foreground">
                      {stat.label}
                    </span>
                    <span className="mt-1 block text-[11px] sm:text-xs">
                      {stat.description}
                    </span>
                  </dt>
                  <dd className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {skills.map((skill, i) => (
                <Reveal
                  as="li"
                  key={skill.slug}
                  delay={i * 70}
                  className={i === 0 ? "sm:col-span-2" : undefined}
                >
                  <Link
                    href={`/skills/${skill.slug}`}
                    className="group flex h-full items-start gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg border bg-background text-foreground transition-colors group-hover:text-brand">
                      <skill.icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-medium">{skill.name}</span>
                        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {skill.category}
                      </span>
                      <span className="mt-2 line-clamp-2 block text-sm text-muted-foreground">
                        {skill.summary}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={skills.length * 70} className="mt-4">
              <Link
                href="/skills"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Lihat detail semua skill
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
