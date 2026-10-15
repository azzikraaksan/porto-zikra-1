import { Boxes, Database, Layers, ListChecks, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import type { SkillSlug } from "./skills";
import type { Shot } from "./types";

export type Feature = {
  title: string;
  icon: LucideIcon;
  description: string;
  points: string[];
  image: Shot;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  hook: string;
  overview: string[];
  /** Isi sendiri, misalnya "2023 — Sekarang". Tidak ditampilkan jika kosong. */
  period?: string;
  /** Isi sendiri, misalnya "8 engineer, 2 QA". Tidak ditampilkan jika kosong. */
  team?: string;
  platform: string;
  liveUrl?: string;
  role: {
    title: string;
    summary: string;
    highlights: string[];
    responsibilities: string[];
  };
  cover: Shot;
  coverDetail: Shot;
  skills: SkillSlug[];
  tools: string[];
  features: Feature[];
  outcomes: { value: string; label: string }[];
  lessons: { title: string; body: string }[];
};

const IMG = "/images/alurkerja";

export const projects: Project[] = [
  {
    slug: "alurkerja",
    name: "AlurKerja",
    category: "BPM / Workflow Automation · SaaS",
    hook: "Platform SaaS BPM & Workflow untuk enterprise: memodelkan proses bisnis, mengotomasi alur persetujuan, dan mengelola antrean tugas berskala besar dalam satu workspace multi-tenant yang aman.",
    overview: [
      "AlurKerja membantu organisasi mengubah proses manual — persetujuan, pengajuan, verifikasi — menjadi alur kerja digital yang terukur. Setiap klien (tenant) memiliki workspace sendiri yang berisi puluhan modul: dari pemodelan proses BPMN, inbox tugas, hingga master data yang bisa didefinisikan sendiri oleh pengguna non-teknis.",
      "Tantangan utamanya bukan sekadar membangun fitur, tetapi menjaga agar platform tetap aman dan andal ketika jumlah tenant, modul, dan volume tugas terus bertambah: data antar-klien tidak boleh bocor, UI harus tetap deterministik walau pengguna bernavigasi sangat cepat, dan operasi massal tidak boleh membekukan browser.",
    ],
    platform: "Web App (SaaS, multi-tenant)",
    role: {
      title: "Full Stack Developer — Frontend & Platform",
      summary:
        "Saya bertanggung jawab atas fondasi teknis yang menyentuh hampir semua modul: isolasi data multi-tenant, keandalan state di frontend, sistem desain, serta fitur berat seperti schema builder dan operasi tugas massal.",
      highlights: ["Arsitektur multi-tenant", "Migrasi design system", "Bulk operations"],
      responsibilities: [
        "Menegakkan isolasi data tenant di tiga lapisan — skema database, kontrak API, dan state klien — termasuk RBAC ketat dengan respons 403.",
        "Membangun no-code schema builder & master data engine agar pengguna non-teknis bisa mendefinisikan tabel secara aman.",
        "Mendiagnosis dan menghilangkan race condition pada navigasi cepat dengan guard fetch effects dan pola cleanup agresif.",
        "Memimpin migrasi UI ke shadcn/ui di lebih dari 10 modul secara bertahap menggunakan feature flags.",
        "Mengembangkan bulk task management suite dengan sinkronisasi state massal dan visibilitas status di diagram BPMN.",
      ],
    },
    cover: {
      src: `${IMG}/cover.png`,
      alt: "Dashboard utama AlurKerja",
      idea: "Dashboard utama (light mode, ±1600×1000): sidebar modul + task inbox berisi data dummy yang realistis. Samarkan semua data klien.",
    },
    coverDetail: {
      src: `${IMG}/cover-detail.png`,
      alt: "Potongan diagram BPMN AlurKerja",
      idea: "Close-up diagram BPMN (4:3)",
    },
    skills: ["react", "typescript", "testing", "database", "laravel-go"],
    tools: ["shadcn/ui", "BPMN", "Feature Flags", "RBAC", "Form Builder"],
    features: [
      {
        title: "Workflow & Visibilitas BPMN",
        icon: Workflow,
        description:
          "Proses bisnis dimodelkan sebagai diagram BPMN. Status penyelesaian setiap tugas tampil langsung di diagram sehingga pengguna tahu persis di mana sebuah proses sedang berjalan.",
        points: ["Status tugas tersinkron ke node diagram", "Jejak proses yang mudah diaudit"],
        image: {
          src: `${IMG}/feature-bpmn.png`,
          alt: "Diagram BPMN dengan status penyelesaian tugas",
          idea: "Diagram BPMN dengan node selesai disorot hijau dan node aktif ditandai, plus panel samping berisi detail status.",
        },
      },
      {
        title: "Task Inbox & Aksi Massal",
        icon: ListChecks,
        description:
          "Inbox tugas untuk mengklaim dan menyelesaikan pekerjaan dalam jumlah besar sekaligus, tanpa membekukan browser dan tanpa kegagalan parsial yang tersembunyi.",
        points: ["Select-all yang sadar filter", "Pengurutan berbasis tenggat waktu", "Hasil per item yang transparan"],
        image: {
          src: `${IMG}/feature-task-inbox.png`,
          alt: "Task inbox dengan aksi massal",
          idea: "Daftar antrean tugas dengan beberapa baris tercentang, toolbar aksi massal (Klaim / Selesaikan) di atas, dan chip filter aktif.",
        },
      },
      {
        title: "No-Code Schema Builder",
        icon: Database,
        description:
          "Pengguna non-teknis bisa membuat tabel dan mengelola kolom secara dinamis tanpa bantuan developer — dengan pagar pengaman untuk menjaga integritas data.",
        points: ["Manajemen kolom dinamis", "Hapus dengan konfirmasi nama tabel", "Transisi tipe data yang terkontrol"],
        image: {
          src: `${IMG}/feature-schema-builder.png`,
          alt: "No-code schema builder",
          idea: "Form pembuatan tabel dengan 4–5 kolom (nama, tipe, wajib) dan tombol tambah kolom; opsional dialog konfirmasi hapus di atasnya.",
        },
      },
      {
        title: "Master Data & Bulk Upload",
        icon: Boxes,
        description:
          "Data referensi diimpor dalam jumlah besar dengan filter per-kolom dan validasi tipe sebelum ditulis, mempercepat onboarding klien baru.",
        points: ["Filter per-kolom", "Validasi sebelum tulis", "Onboarding tanpa setup manual"],
        image: {
          src: `${IMG}/feature-master-data.png`,
          alt: "Master data dan bulk upload",
          idea: "Tabel master data dengan filter kolom terbuka dan modal upload massal yang menampilkan preview baris + hasil validasi.",
        },
      },
      {
        title: "Workspace Multi-Tenant & RBAC",
        icon: ShieldCheck,
        description:
          "Setiap klien bekerja di workspace terisolasi. Pergantian tenant mereset state klien sepenuhnya, dan akses yang tidak sah ditolak secara konsisten.",
        points: ["Isolasi di 3 lapisan", "RBAC ketat (403)", "Akses admin yang dibatasi"],
        image: {
          src: `${IMG}/feature-workspace.png`,
          alt: "Workspace switcher dan RBAC",
          idea: "Dropdown pergantian workspace/tenant dalam keadaan terbuka; opsional halaman 403 yang rapi di sampingnya.",
        },
      },
      {
        title: "Design System (shadcn/ui)",
        icon: Layers,
        description:
          "Komponen di seluruh modul distandarkan ke shadcn/ui dan form-builder bersama, menghasilkan tema dark/light yang konsisten dan aksesibilitas yang lebih baik.",
        points: ["10+ modul dimigrasi", "Fallback via feature flags", "Dark/light mode konsisten"],
        image: {
          src: `${IMG}/feature-design-system.png`,
          alt: "Modul AlurKerja dalam light dan dark mode",
          idea: "Split screen modul yang sama dalam light & dark mode, atau before/after komponen legacy vs shadcn/ui.",
        },
      },
    ],
    outcomes: [
      { value: "3", label: "Lapisan isolasi data antar-tenant" },
      { value: "10+", label: "Modul dimigrasi tanpa downtime" },
      { value: "0", label: "Insiden state basi setelah perbaikan" },
      { value: "1000+", label: "Klik manual dihemat lewat aksi massal" },
    ],
    lessons: [
      {
        title: "Keamanan adalah properti sistem, bukan fitur",
        body: "Isolasi tenant hanya efektif jika ditegakkan di setiap lapisan. Satu lapisan yang 'percaya' lapisan lain sudah cukup untuk membuka celah.",
      },
      {
        title: "Migrasi besar butuh jalan mundur",
        body: "Feature flags membuat migrasi 10+ modul bisa dilakukan bertahap di production — setiap langkah bisa di-rollback tanpa drama.",
      },
      {
        title: "Bug non-deterministik butuh pola, bukan tambalan",
        body: "Race condition tidak selesai dengan memperbaiki satu halaman; ia selesai ketika pola fetch dan cleanup distandarkan untuk semua halaman.",
      },
    ],
  },
];

export const featuredProject = projects[0]!;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
