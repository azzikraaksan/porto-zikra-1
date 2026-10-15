import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { site } from "@/data/site";
import { FeaturedProject } from "@/components/sections/featured-project";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Typewriter } from "@/components/typewriter";

/** Animasi masuk hero memakai CSS keyframes — tampil tanpa menunggu hydration. */
const fadeUp = (delay: number) => ({ animationDelay: `${delay}ms` });

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="container grid items-center gap-12 pb-20 pt-14 sm:pt-24 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-28 [&>*]:min-w-0">
        <div>
          <div
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
            style={fadeUp(0)}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            Open to Full Stack Developer roles
          </div>

          <h1 className="mt-6 animate-fade-up" style={fadeUp(80)}>
            <span className="block text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">Hi, saya {site.name}.</span>
            </span>
            <span className="mt-4 block h-9 font-mono text-2xl font-medium text-muted-foreground sm:h-11 sm:text-4xl">
              <span className="text-brand">&gt;</span> <Typewriter words={site.typedRoles} />
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl animate-fade-up text-pretty text-base text-muted-foreground sm:text-lg"
            style={fadeUp(160)}
          >
            {site.tagline}
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3" style={fadeUp(240)}>
            <ButtonLink href={site.cvUrl} download size="lg">
              <Download />
              Download CV
            </ButtonLink>
            <Link href="/#case-studies" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Lihat Case Studies
              <ArrowRight />
            </Link>
            <div className="flex items-center gap-1 sm:ml-1">
              <ButtonLink
                href={site.github}
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="icon"
                aria-label="GitHub"
                className="size-11"
              >
                <GitHubIcon className="!size-5" />
              </ButtonLink>
              <ButtonLink
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="icon"
                aria-label="LinkedIn"
                className="size-11"
              >
                <LinkedInIcon className="!size-5" />
              </ButtonLink>
            </div>
          </div>
        </div>

        <FeaturedProject />
      </div>
    </section>
  );
}
