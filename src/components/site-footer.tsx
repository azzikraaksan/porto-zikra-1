import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { CopyEmail } from "@/components/copy-email";
import { Reveal } from "@/components/reveal";

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-16 border-t">
      <div className="container py-20 sm:py-28">
        <Reveal className="relative overflow-hidden rounded-2xl border bg-card px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
          />
          <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-brand">Contact</p>
          <h2 className="relative mx-auto mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Sedang membangun sesuatu yang kompleks? Mari berdiskusi.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
            Terbuka untuk peran Full Stack Developer, terutama di produk SaaS, platform workflow, dan sistem
            multi-tenant.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={`mailto:${site.email}?subject=Halo%20${encodeURIComponent(site.name)}`} size="lg">
              <Mail />
              {site.email}
            </ButtonLink>
            <CopyEmail email={site.email} />
          </div>
        </Reveal>
      </div>

      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Dibangun dengan Next.js & Tailwind CSS.
          </p>
          <div className="flex items-center gap-1">
            <ButtonLink href={site.github} target="_blank" rel="noreferrer" variant="ghost" size="sm">
              <GitHubIcon />
              GitHub
            </ButtonLink>
            <ButtonLink href={site.linkedin} target="_blank" rel="noreferrer" variant="ghost" size="sm">
              <LinkedInIcon />
              LinkedIn
              <ArrowUpRight className="opacity-50" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
