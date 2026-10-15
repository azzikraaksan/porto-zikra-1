import { Database, Layers, ListChecks, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import type { SkillSlug } from "./skills";
import type { Shot } from "./types";

export type CaseStudy = {
  slug: string;
  title: string;
  icon: LucideIcon;
  highlights: string[];
  skills: SkillSlug[];
  challenge: string;
  execution: string;
  impact: string;
  /** Screenshot/diagram untuk halaman studi kasus lengkap */
  image: Shot;
};

export const product = {
  name: "AlurKerja",
  description: "platform SaaS BPM/Workflow enterprise",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-tenant-architecture",
    title: "Multi-Tenant Architecture & Data Isolation",
    icon: ShieldCheck,
    highlights: ["3 lapisan isolasi", "RBAC · 403", "Tenant-scoped state"],
    skills: ["microservices", "nodejs", "typescript", "react"],
    challenge:
      "Mencegah kebocoran data antar-klien di aplikasi SaaS berskala enterprise yang memiliki puluhan modul.",
    execution:
      "Menegakkan isolasi data di tiga lapisan: skema database, kontrak API, dan state klien (mencegah stale workspace data leakage saat user berganti tenant). Mengimplementasikan RBAC ketat (respons 403) dan membatasi akses level admin.",
    impact:
      "Menutup risiko celah keamanan terbesar di arsitektur multi-tenant dan menjamin integritas data lintas klien.",
    image: {
      src: "/images/alurkerja/cs-multi-tenant.png",
      alt: "Isolasi data multi-tenant di AlurKerja",
      idea: "Diagram 3 lapisan isolasi (DB schema → API contract → client state), atau screenshot workspace switcher berdampingan dengan respons 403 di tab Network DevTools.",
    },
  },
  {
    slug: "no-code-schema-builder",
    title: "No-Code Schema Builder & Master Data Engine",
    icon: Database,
    highlights: ["Dynamic columns", "Bulk upload", "Typed transitions"],
    skills: ["react", "typescript", "nodejs"],
    challenge:
      "Membangun antarmuka untuk pengguna non-teknis agar bisa mendefinisikan tabel database secara aman tanpa merusak integritas sistem.",
    execution:
      "Mengembangkan UI schema builder untuk generate tabel, manajemen kolom dinamis, dan fitur hapus dengan konfirmasi nama. Membangun operasi bulk upload dengan filter per-kolom dan transisi tipe data (varchar) yang dikontrol ketat.",
    impact:
      "Menghilangkan kebergantungan pada developer untuk setup data manual, mempercepat siklus onboarding klien baru.",
    image: {
      src: "/images/alurkerja/cs-schema-builder.png",
      alt: "No-code schema builder AlurKerja",
      idea: "Schema builder dengan beberapa kolom dinamis (nama, tipe, wajib) dan dialog konfirmasi hapus yang meminta pengguna mengetik nama tabel.",
    },
  },
  {
    slug: "frontend-state-hardening",
    title: "Frontend State Hardening & Race Condition Resolution",
    icon: Zap,
    highlights: ["Guarded fetch effects", "Aggressive cleanup", "Deterministic UI"],
    skills: ["react", "typescript"],
    challenge:
      "Memperbaiki bug non-deterministik di mana state dari navigasi sebelumnya menimpa respons baru saat pengguna bernavigasi dengan sangat cepat.",
    execution:
      "Mengimplementasikan pola cleanup yang agresif dan mekanisme isolasi fetch (guard fetch effects) untuk mereset state form dan task secara konsisten saat tenant atau antrean tugas berpindah.",
    impact:
      "Menghilangkan sepenuhnya insiden state basi dan pengiriman data ke konteks yang salah, meningkatkan keandalan navigasi UI secara drastis.",
    image: {
      src: "/images/alurkerja/cs-race-condition.png",
      alt: "Penanganan race condition saat navigasi cepat",
      idea: "Tab Network DevTools yang menunjukkan request lama berstatus '(canceled)' saat berpindah task, atau diagram sequence sebelum vs sesudah perbaikan.",
    },
  },
  {
    slug: "shadcn-ui-migration",
    title: "Enterprise UI Architecture Migration (shadcn/ui)",
    icon: Layers,
    highlights: ["10+ modul", "Feature flags", "Shared form-builder"],
    skills: ["react", "tailwind-css", "typescript"],
    challenge:
      "Memigrasi komponen UI di lebih dari 10 modul aplikasi independen ke sistem desain baru tanpa mengganggu operasional sistem production.",
    execution:
      "Memimpin migrasi bertahap menggunakan feature flags untuk fallback ke komponen legacy. Mengintegrasikan submodule form-builder bersama untuk standardisasi rendering rich text, toggle, dan dropdown.",
    impact:
      "Menurunkan beban pemeliharaan teknis (technical debt), memastikan konsistensi tema (dark/light mode), dan memperbaiki berbagai isu aksesibilitas.",
    image: {
      src: "/images/alurkerja/cs-shadcn-migration.png",
      alt: "Migrasi komponen ke shadcn/ui",
      idea: "Before/after modul yang sama: komponen legacy vs shadcn/ui, atau split light/dark mode untuk menonjolkan konsistensi tema.",
    },
  },
  {
    slug: "bulk-task-operations",
    title: "High-Volume Bulk Operations & Task Management",
    icon: ListChecks,
    highlights: ["Bulk claim & complete", "Filtered select-all", "BPMN visibility"],
    skills: ["react", "nodejs", "microservices"],
    challenge:
      "Menangani eksekusi tindakan massal (klaim, penyelesaian tugas) secara konkuren tanpa membuat peramban membeku atau menyebabkan kegagalan parsial di peladen.",
    execution:
      "Mengembangkan bulk task management suite dengan sinkronisasi state massal. Memperbaiki mekanisme select-all saat terfilter dan memisahkan pengurutan berbasis tenggat waktu.",
    impact:
      "Menghemat ribuan klik manual pengguna saat memproses antrean tugas berskala besar, serta memberikan visibilitas langsung terhadap status penyelesaian di diagram BPMN.",
    image: {
      src: "/images/alurkerja/cs-bulk-operations.png",
      alt: "Bulk task management AlurKerja",
      idea: "Task inbox dengan select-all saat filter aktif, toolbar aksi massal (Klaim / Selesaikan) dan progres eksekusi, plus diagram BPMN yang ter-update.",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
