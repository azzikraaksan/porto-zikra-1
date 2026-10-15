import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { skills } from "@/data/skills";
import { caseStudies, product } from "@/data/case-studies";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const stats = [
  { value: "10+", label: "Modul dimigrasi ke design system baru" },
  { value: "3", label: "Lapisan isolasi data multi-tenant" },
  { value: String(caseStudies.length), label: "Studi kasus teknis enterprise" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="About & Skills"
          title="Engineer di balik sistem yang tidak boleh salah."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 [&>*]:min-w-0">
          <Reveal className="space-y-5 text-pretty text-muted-foreground sm:text-lg">
            <p>
              Saya adalah Software Engineer yang berfokus pada platform SaaS enterprise. Di{" "}
              <span className="font-medium text-foreground">{product.name}</span> — {product.description}{" "}
              multi-tenant — saya bekerja di persimpangan arsitektur frontend dan kontrak layanan: memastikan data setiap
              klien terisolasi, UI tetap deterministik di bawah navigasi cepat, dan operasi massal berjalan tanpa
              membekukan browser.
            </p>
            <p>
              Saya menikmati masalah yang tidak terlihat oleh pengguna sampai ada yang salah — race condition, kebocoran
              tenant, technical debt — dan menyelesaikannya dengan solusi yang bisa dirawat tim dalam jangka panjang.
            </p>

            <dl className="grid grid-cols-3 gap-3 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse rounded-lg border bg-card p-4">
                  <dt className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">{stat.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {skills.map((skill, i) => (
                <Reveal as="li" key={skill.slug} delay={i * 70} className={i === 0 ? "sm:col-span-2" : undefined}>
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
                      <span className="mt-2 line-clamp-2 block text-sm text-muted-foreground">{skill.summary}</span>
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
