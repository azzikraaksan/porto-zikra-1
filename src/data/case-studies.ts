import { Bot, Database, ListChecks, ShieldCheck, Table, Workflow, Zap, type LucideIcon } from "lucide-react";
import type { SkillSlug } from "./skills";
import type { Shot } from "./types";

export type CaseCategory = {
  slug: string;
  title: string;
};

export type CaseStudy = {
  slug: string;
  category: CaseCategory["slug"];
  title: string;
  icon: LucideIcon;
  highlights: string[];
  skills: SkillSlug[];
  /** Repo/service yang terlibat */
  repos: string[];
  challenge: string;
  /** Poin-poin eksekusi teknis */
  execution: string[];
  impact: string;
  /** Screenshot/diagram untuk halaman studi kasus lengkap */
  image: Shot;
};

export const product = {
  name: "AlurKerja",
  description: "platform SaaS BPM/Workflow enterprise",
};

export const categories: CaseCategory[] = [
  { slug: "platform-data", title: "Platform & Data Engine" },
  { slug: "security", title: "Security & Data Isolation" },
  { slug: "frontend-ux", title: "Advanced Frontend & Workflow UX" },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "schema-builder",
    category: "platform-data",
    title: "Schema Builder: Tabel Dinamis Per Tenant",
    icon: Table,
    highlights: ["Dynamic DDL", "varchar(N) aman", "Quality gate SonarQube"],
    skills: ["react", "typescript", "laravel-go"],
    repos: ["report-service", "studio-react"],
    challenge:
      "Tenant bisa membuat tabel database sendiri. DDL dinamis berisiko: perubahan tipe bisa merusak data, nama tabel bisa bentrok, dan semuanya harus terisolasi per tenant.",
    execution: [
      "Mendukung varchar(N) dengan transisi tipe yang aman.",
      "Memperbaiki penggunaan ulang nama tabel yang sudah dihapus.",
      "Menambah endpoint table references.",
      "Menjadikan tabel database sebagai sumber data question.",
      "Merefaktor repository tenant schema untuk menurunkan cognitive complexity sesuai gate SonarQube.",
      "Di UI: kelola kolom (tambah, rename, ubah tipe, required, hapus), hapus tabel dengan konfirmasi mengetik nama, dan tab data read-only di belakang feature flag.",
    ],
    impact:
      "Tenant bisa memodelkan data sendiri tanpa campur tangan engineer, dengan guard terhadap perubahan destruktif. Kode barunya lolos quality gate.",
    image: {
      src: "/images/alurkerja/cs-schema-builder.png",
      alt: "Schema builder tabel dinamis per tenant di AlurKerja",
      idea: "Schema builder dengan beberapa kolom dinamis (nama, tipe, wajib) dan dialog konfirmasi hapus yang meminta pengguna mengetik nama tabel.",
    },
  },
  {
    slug: "master-data-engine",
    category: "platform-data",
    title: "Master Data Engine: Integritas di Level Database",
    icon: Database,
    highlights: ["Unique di DB", "Bulk upload", "Upload dua langkah"],
    skills: ["laravel-go", "typescript", "react"],
    repos: ["bpm-service", "studio-react", "app-react-1"],
    challenge:
      "Master data adalah tabel buatan user dengan definisi kolom yang dinamis. Keunikan dan pencarian harus tetap cepat dan benar walau skemanya tidak tetap.",
    execution: [
      "Membuat index untuk kolom searchable/unique dan memaksa keunikan di DB, bukan hanya di aplikasi.",
      "Mem-parse definisi tabel (SQL) menjadi kolom.",
      "Menambah bulk upload yang menerima kunci nama atau slug kolom, serta filter per kolom.",
      "Menambah endpoint upload/download file record.",
      "Membuat alur upload dua langkah untuk kolom bertipe file.",
      "Mengecualikan record yang sedang diedit dari cek unique.",
    ],
    impact:
      "Integritas data tidak bergantung pada validasi klien. Import massal dan file attachment menjadi fitur kelas satu, dengan hasil upload yang dilaporkan apa adanya.",
    image: {
      src: "/images/alurkerja/cs-master-data.png",
      alt: "Master data engine dengan bulk upload dan filter per kolom",
      idea: "Tabel master data dengan filter per kolom, dialog bulk upload yang menampilkan hasil per baris (berhasil/gagal), dan kolom bertipe file.",
    },
  },
  {
    slug: "ai-agent-integration",
    category: "platform-data",
    title: "Lapisan Integrasi Agen AI: MCP Tools dan AI Gateway",
    icon: Bot,
    highlights: ["Puluhan tool MCP", "TEST/LIVE selector", "Fallback antar-vendor"],
    skills: ["laravel-go", "typescript", "database"],
    repos: ["integration-service", "bpm-service", "helpdesk"],
    challenge:
      "Platform perlu bisa dioperasikan oleh agen AI secara aman: lintas environment, dengan batasan role, dan tidak bergantung pada satu vendor LLM.",
    execution: [
      "Membangun puluhan tool MCP: metrics/KPI, dashboard SBG, master data (baca/tulis), instance history, attachment, pencarian variabel, activity log, dan external page.",
      "Menambah selector environment TEST/LIVE di tool tasklist.",
      "Membuat tool admin-only di helpdesk (lihat semua tiket, baca tiket requestor mana pun).",
      "Menjadikan gateway AI Merapi sebagai default dengan fallback ke OpenAI.",
    ],
    impact:
      "Seluruh fitur inti menjadi bisa diakses lewat protokol standar. Ketergantungan pada satu vendor AI berkurang berkat fallback.",
    image: {
      src: "/images/alurkerja/cs-mcp-ai.png",
      alt: "Lapisan integrasi agen AI dengan MCP tools dan AI gateway",
      idea: "Diagram agen AI → MCP server → layanan (bpm, helpdesk), dengan AI gateway Merapi dan jalur fallback OpenAI; atau daftar tool MCP yang terdaftar.",
    },
  },
  {
    slug: "multi-tenant-rbac",
    category: "security",
    title: "Isolasi Multi-Tenant dan RBAC End-to-End",
    icon: ShieldCheck,
    highlights: ["Slug unik per tenant", "RBAC · 403", "Lintas repo"],
    skills: ["database", "laravel-go", "typescript", "react"],
    repos: ["lintas repo"],
    challenge:
      "Kebocoran antar tenant biasanya muncul di detail kecil seperti slug, header, dan guard route. Satu celah saja sudah cukup untuk bocor.",
    execution: [
      "Memperbaiki kebocoran slug master data lintas tenant, sehingga slug hanya unik per tenant.",
      "Membatasi pembuatan workspace hanya untuk superadmin di mode SaaS.",
      "Memblokir role member dari Studio dan Company Profile dengan respons 403 dan redirect.",
      "Membuat pembatasan start proses per user (TKT-2609-00101).",
      "Memberi fallback x-active-tenant pada upload avatar, dan menghapus keharusan header itu di upload media WYSIWYG.",
      "Memakai tenant id, bukan slug, untuk master data select.",
    ],
    impact:
      "Batas tenant dan role ditegakkan di backend dan frontend sekaligus. Ini menutup kelas bug kebocoran data yang paling mahal di produk SaaS.",
    image: {
      src: "/images/alurkerja/cs-multi-tenant.png",
      alt: "Isolasi data multi-tenant dan RBAC di AlurKerja",
      idea: "Respons 403 di tab Network DevTools saat role member membuka Studio, atau diagram batas tenant di backend dan frontend.",
    },
  },
  {
    slug: "stale-state-race-condition",
    category: "security",
    title: "Pencegahan Stale State dan Race Condition Antar Workspace",
    icon: Zap,
    highlights: ["Guarded fetch effects", "Reset saat ganti tenant", "Deterministic UI"],
    skills: ["react", "typescript"],
    repos: ["app-react-1"],
    challenge:
      "Saat user berpindah workspace atau task dengan cepat, respons lama bisa menimpa state baru. Akibatnya data tenant A tampil di tenant B, yang secara fungsional adalah kebocoran data di sisi klien.",
    execution: [
      "Menambah guard pada effect fetch terhadap respons basi saat navigasi cepat.",
      "Menghentikan data workspace lama yang bocor setelah pindah workspace.",
      "Menghentikan form/state task lama yang terbawa saat pindah task.",
      "Menyinkronkan loading state sidebar dan home saat inisialisasi workspace.",
    ],
    impact:
      "UI menjadi konsisten secara deterministik pada navigasi cepat. Ini menghapus kelas bug yang sulit direproduksi.",
    image: {
      src: "/images/alurkerja/cs-race-condition.png",
      alt: "Pencegahan stale state dan race condition saat navigasi cepat",
      idea: "Tab Network DevTools yang menunjukkan request lama berstatus '(canceled)' saat berpindah task, atau diagram sequence sebelum vs sesudah perbaikan.",
    },
  },
  {
    slug: "bulk-claim-complete",
    category: "frontend-ux",
    title: "Bulk Claim dan Bulk Complete Task",
    icon: ListChecks,
    highlights: ["Filtered select-all", "Bulk claim", "Dark mode"],
    skills: ["react", "typescript", "testing"],
    repos: ["app-react-1"],
    challenge:
      'Operasi massal atas ratusan task menimbulkan masalah konsistensi: sebagian bisa gagal, seleksi harus akurat, dan filter harus ikut memengaruhi "select all".',
    execution: [
      "Menambah bulk claim di group tasks.",
      "Memperbaiki filtering dan perilaku select-all pada bulk complete.",
      "Menjaga form bulk complete tetap terbaca di dark mode.",
      "Menambah filter berdasarkan variabel di My Requests.",
      "Merender field dari form schema saat tipe variabel null.",
      "Menutup panel setelah claim.",
    ],
    impact:
      "Operator bisa memproses banyak task sekaligus dengan hasil yang dapat dipercaya. Ini mengurangi kerja manual berulang.",
    image: {
      src: "/images/alurkerja/cs-bulk-operations.png",
      alt: "Bulk claim dan bulk complete task di AlurKerja",
      idea: "Task inbox dengan select-all saat filter aktif, toolbar aksi massal (Klaim / Selesaikan), dan form bulk complete di dark mode.",
    },
  },
  {
    slug: "lane-sync",
    category: "frontend-ux",
    title: "Lane Sync: Wizard Sinkronisasi SOP dengan Struktur Organisasi",
    icon: Workflow,
    highlights: ["Wizard 4 langkah", "Lane bersarang", "Feature flag"],
    skills: ["react", "typescript"],
    repos: ["studio-react"],
    challenge:
      "Lane di diagram BPMN harus dipetakan ke role organisasi. Ini alur multi-langkah dengan efek tulis, dan lane bersarang membuat pemetaan ambigu.",
    execution: [
      "Membangun dialog bertahap (Scope, Scan, Review, Apply).",
      "Menambah layar hasil dan penanda di struktur organisasi.",
      "Memprioritaskan lane terdalam di findLaneByFlowNode.",
      "Mencocokkan lane berdasarkan nama di Drive dan menampilkan info role lane.",
      "Mengunci fitur di belakang feature flag, dengan test default-nya mati.",
    ],
    impact:
      "SOP dan struktur organisasi tetap sinkron tanpa edit manual. Pemetaan lane bersarang jadi lebih tepat.",
    image: {
      src: "/images/alurkerja/cs-lane-sync.png",
      alt: "Wizard sinkronisasi lane BPMN dengan struktur organisasi",
      idea: "Dialog wizard empat langkah (Scope → Scan → Review → Apply), dan diagram BPMN dengan lane bersarang yang sudah terpetakan ke role.",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
