import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-muted-foreground">Mungkin tautannya sudah berpindah tenant 😉</p>
      <Link href="/" className={buttonVariants({ variant: "outline", className: "mt-8" })}>
        <ArrowLeft />
        Kembali ke beranda
      </Link>
    </section>
  );
}
