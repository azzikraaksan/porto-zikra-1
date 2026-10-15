import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Database,
  Monitor,
  Server,
  Target,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import { getSkill } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { BrowserFrame, Screenshot } from "@/components/screenshot";
import { Toc } from "@/components/toc";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: `Studi Kasus ${project.name}`, description: project.hook };
}

const toc = [
  { id: "ringkasan", label: "Ringkasan" },
  { id: "peran", label: "Peran saya" },
  { id: "fitur", label: "Fitur utama" },
  { id: "arsitektur", label: "Arsitektur" },
  { id: "detail-teknis", label: "Detail teknis" },
  { id: "dampak", label: "Dampak" },
  { id: "pelajaran", label: "Pelajaran" },
];

const layers: { icon: LucideIcon; title: string; subtitle: string; points: string[] }[] = [
  {
    icon: Monitor,
    title: "Client State",
    subtitle: "React · TypeScript",
    points: ["State di-scope per tenant", "Reset total saat ganti tenant", "Guard fetch effects"],
  },
  {
    icon: Server,
    title: "Kontrak API",
    subtitle: "Microservices · Node.js",
    points: ["Tenant guard di setiap boundary", "RBAC ketat (403)", "Akses admin dibatasi"],
  },
  {
    icon: Database,
    title: "Skema Database",
    subtitle: "Data layer",
    points: ["Isolasi di level skema", "Transisi tipe kolom terkontrol", "Validasi sebelum tulis"],
  },
];

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const meta = [
    { label: "Peran", value: project.role.title },
    { label: "Kategori", value: project.category },
    { label: "Platform", value: project.platform },
    project.period ? { label: "Periode", value: project.period } : null,
    project.team ? { label: "Tim", value: project.team } : null,
  ].filter((m): m is { label: string; value: string } => m !== null);

  return (
    <article className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 -z-10 h-[32rem] opacity-50" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />

      {/* ---------- Header ---------- */}
      <header className="container pb-12 pt-10 sm:pt-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Beranda
        </Link>

        <div className="mt-8 max-w-3xl animate-fade-up">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Studi Kasus</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
            <span className="text-gradient">{project.name}</span>
          </h1>
          <p className="mt-5 text-pretty text-lg text-muted-foreground sm:text-xl">{project.hook}</p>
        </div>

        <dl
          className="mt-10 grid animate-fade-up grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3"
          style={{ animationDelay: "100ms" }}
        >
          {meta.map((m) => (
            <div key={m.label} className="bg-card p-4">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{m.label}</dt>
              <dd className="mt-1 text-sm font-medium">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex animate-fade-up flex-wrap items-center gap-2" style={{ animationDelay: "160ms" }}>
          {project.skills.map((s) => {
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
          {project.tools.map((t) => (
            <Badge key={t} variant="secondary" className="font-normal">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-8 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: "220ms" }}>
          <a href="#detail-teknis" className={buttonVariants({ size: "lg" })}>
            Lihat detail teknis
            <ArrowDown />
          </a>
          {project.liveUrl ? (
            <ButtonLink href={project.liveUrl} target="_blank" rel="noreferrer" variant="outline" size="lg">
              Kunjungi aplikasi
              <ArrowUpRight />
            </ButtonLink>
          ) : null}
        </div>
      </header>

      {/* ---------- Cover ---------- */}
      <div className="container">
        <div className="animate-fade-up" style={{ animationDelay: "280ms" }}>
          <BrowserFrame label={`${project.name.toLowerCase()} — dashboard`}>
            <Screenshot shot={project.cover} priority sizes="(min-width: 1120px) 1088px, 100vw" />
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

        <div className="space-y-24">
          {/* Ringkasan */}
          <Section id="ringkasan" eyebrow="01" title="Ringkasan">
            <Reveal className="max-w-3xl space-y-4 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              {project.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>
          </Section>

          {/* Peran */}
          <Section id="peran" eyebrow="02" title="Peran saya">
            <Reveal className="rounded-xl border bg-card p-5 sm:p-6">
              <p className="font-medium">{project.role.title}</p>
              <p className="mt-2 text-pretty text-muted-foreground">{project.role.summary}</p>
            </Reveal>
            <ol className="mt-4 space-y-3">
              {project.role.responsibilities.map((r, i) => (
                <Reveal as="li" key={r} delay={i * 60} className="flex gap-4 rounded-lg border bg-card p-4">
                  <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed sm:text-base">{r}</span>
                </Reveal>
              ))}
            </ol>
          </Section>

          {/* Fitur */}
          <Section id="fitur" eyebrow="03" title="Fitur utama">
            <div className="grid gap-5 md:grid-cols-2">
              {project.features.map((f, i) => (
                <Reveal
                  key={f.title}
                  delay={(i % 2) * 80}
                  className="group flex flex-col overflow-hidden rounded-xl border bg-card"
                >
                  <div className="border-b">
                    <Screenshot shot={f.image} sizes="(min-width: 768px) 440px, 100vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-lg border bg-background text-brand">
                        <f.icon className="size-4" />
                      </span>
                      <h3 className="font-semibold tracking-tight">{f.title}</h3>
                    </div>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {f.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2 text-sm">
                          <Check className="size-3.5 shrink-0 text-brand" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* Arsitektur */}
          <Section
            id="arsitektur"
            eyebrow="04"
            title="Arsitektur isolasi tiga lapis"
            description="Setiap request melewati tiga lapisan yang masing-masing menegakkan batas tenant — tidak ada lapisan yang mempercayai lapisan lain begitu saja."
          >
            <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {layers.map((layer, i) => (
                <LayerCard key={layer.title} layer={layer} index={i} last={i === layers.length - 1} />
              ))}
            </div>
          </Section>

          {/* Detail teknis */}
          <Section
            id="detail-teknis"
            eyebrow="05"
            title="Detail teknis"
            description={`${caseStudies.length} tantangan teknis paling berdampak selama membangun platform ini.`}
          >
            <div className="space-y-16">
              {caseStudies.map((cs, i) => (
                <Reveal
                  as="article"
                  key={cs.slug}
                  id={`detail-${cs.slug}`}
                  className="grid scroll-mt-24 items-start gap-6 lg:grid-cols-2 lg:gap-10 [&>*]:min-w-0"
                >
                  <div className={cn("overflow-hidden rounded-xl border bg-card", i % 2 === 1 && "lg:order-2")}>
                    <Screenshot shot={cs.image} sizes="(min-width: 1024px) 420px, 100vw" />
                  </div>
                  <div>
                    <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      <cs.icon className="size-4 text-brand" />
                      Case {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">{cs.title}</h3>
                    <dl className="mt-5 space-y-4">
                      <DetailRow icon={Target} label="Tantangan" text={cs.challenge} />
                      <DetailRow icon={Wrench} label="Eksekusi Teknis" items={cs.execution} />
                      <DetailRow icon={TrendingUp} label="Dampak" text={cs.impact} highlight />
                    </dl>
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className={buttonVariants({ variant: "outline", size: "sm", className: "group mt-5" })}
                    >
                      Baca studi kasus lengkap
                      <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* Dampak */}
          <Section id="dampak" eyebrow="06" title="Dampak">
            <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {project.outcomes.map((o, i) => (
                <Reveal key={o.label} delay={i * 60} className="flex flex-col-reverse rounded-xl border bg-card p-5">
                  <dt className="mt-1 text-sm text-muted-foreground">{o.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">{o.value}</dd>
                </Reveal>
              ))}
            </dl>
          </Section>

          {/* Pelajaran */}
          <Section id="pelajaran" eyebrow="07" title="Pelajaran">
            <div className="grid gap-4 md:grid-cols-3">
              {project.lessons.map((l, i) => (
                <Reveal key={l.title} delay={i * 80} className="rounded-xl border bg-card p-5">
                  <h3 className="font-medium">{l.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                </Reveal>
              ))}
            </div>
          </Section>

          <Reveal className="flex flex-col items-start justify-between gap-4 rounded-xl border bg-muted/40 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-medium">Ingin membahas detail implementasinya?</p>
              <p className="text-sm text-muted-foreground">Saya senang menjelaskan trade-off di balik setiap keputusan.</p>
            </div>
            <Link href="#contact" className={buttonVariants()}>
              Hubungi saya
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <Reveal className="mb-8 max-w-2xl">
        <p className="font-mono text-xs text-brand">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {description ? <p className="mt-3 text-pretty text-muted-foreground">{description}</p> : null}
      </Reveal>
      {children}
    </section>
  );
}

function LayerCard({ layer, index, last }: { layer: (typeof layers)[number]; index: number; last: boolean }) {
  return (
    <>
      <Reveal delay={index * 100} className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
            <layer.icon className="size-5" />
          </span>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Lapisan {index + 1}
            </p>
            <p className="font-semibold leading-tight">{layer.title}</p>
          </div>
        </div>
        <p className="mt-3 font-mono text-xs text-muted-foreground">{layer.subtitle}</p>
        <ul className="mt-3 space-y-1.5">
          {layer.points.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm">
              <Check className="size-3.5 shrink-0 text-brand" />
              {p}
            </li>
          ))}
        </ul>
      </Reveal>
      {!last ? (
        <div aria-hidden="true" className="flex items-center justify-center text-muted-foreground">
          <ArrowDown className="size-4 lg:hidden" />
          <ArrowRight className="hidden size-4 lg:block" />
        </div>
      ) : null}
    </>
  );
}

function DetailRow({
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
    <div className={cn("rounded-lg border p-4", highlight ? "border-brand/25 bg-brand/[0.06]" : "bg-card")}>
      <dt
        className={cn(
          "flex items-center gap-2 font-mono text-xs uppercase tracking-wider",
          highlight ? "text-brand" : "text-muted-foreground",
        )}
      >
        <Icon className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-2 text-pretty text-sm leading-relaxed">
        {text}
        {items ? (
          <ul className="list-disc space-y-1.5 pl-4 marker:text-muted-foreground">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </dd>
    </div>
  );
}
