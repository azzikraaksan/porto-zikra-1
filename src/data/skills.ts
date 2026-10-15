import type { ComponentType, SVGProps } from "react";
import { MicroservicesIcon, NodeIcon, ReactIcon, TailwindIcon, TypeScriptIcon } from "@/components/icons";

export type SkillSlug = "react" | "typescript" | "tailwind-css" | "microservices" | "nodejs";

export type Skill = {
  slug: SkillSlug;
  name: string;
  category: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  summary: string;
  description: string;
  inPractice: string[];
  principles: { title: string; body: string }[];
  ecosystem: string[];
  snippet: { filename: string; caption: string; code: string };
};

export const skills: Skill[] = [
  {
    slug: "react",
    name: "React",
    category: "Frontend",
    icon: ReactIcon,
    summary: "Arsitektur UI enterprise yang deterministik, aman dari race condition, dan mudah dirawat.",
    description:
      "React adalah fondasi utama antarmuka AlurKerja. Fokus saya bukan sekadar membuat komponen, tetapi memastikan state tetap benar di bawah kondisi nyata: navigasi super cepat, pergantian tenant, dan ribuan item tugas yang diperbarui sekaligus.",
    inPractice: [
      "Merancang guard fetch effects dan pola cleanup agresif untuk menghilangkan state basi saat tenant atau antrean tugas berpindah.",
      "Membangun UI no-code schema builder dengan manajemen kolom dinamis dan konfirmasi destruktif berbasis nama tabel.",
      "Mengembangkan bulk task management suite dengan sinkronisasi state massal dan select-all yang sadar filter.",
      "Memimpin migrasi komponen ke shadcn/ui di 10+ modul dengan feature flags sebagai jalur fallback.",
    ],
    principles: [
      {
        title: "State mengikuti konteks",
        body: "Setiap state yang bergantung pada tenant atau task di-reset secara eksplisit saat konteksnya berubah — tidak ada data yang 'menumpang' ke layar berikutnya.",
      },
      {
        title: "Efek yang bisa dibatalkan",
        body: "Setiap request di dalam effect memiliki AbortController dan guard, sehingga respons lama tidak pernah menimpa respons baru.",
      },
      {
        title: "Komponen berlapis",
        body: "Primitive UI → komponen domain → halaman. Lapisan bawah tidak tahu soal bisnis, lapisan atas tidak tahu soal styling.",
      },
    ],
    ecosystem: ["Next.js", "React Hooks", "Context", "React Hook Form", "shadcn/ui", "Radix UI", "BPMN viewer"],
    snippet: {
      filename: "use-task-detail.ts",
      caption: "Pola guard fetch effect (disederhanakan) — respons lama tidak boleh menimpa konteks baru.",
      code: `export function useTaskDetail(tenantId: TenantId, taskId: string) {
  const [state, setState] = useState<TaskState>({ status: "idle" });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setState({ status: "loading" }); // reset agresif saat konteks berpindah

    fetchTask(tenantId, taskId, { signal: controller.signal })
      .then((data) => active && setState({ status: "success", data }))
      .catch((error) => {
        if (active && error.name !== "AbortError") {
          setState({ status: "error", error });
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [tenantId, taskId]);

  return state;
}`,
    },
  },
  {
    slug: "typescript",
    name: "TypeScript",
    category: "Language",
    icon: TypeScriptIcon,
    summary: "Kontrak tipe yang ketat sebagai garis pertahanan pertama untuk isolasi data dan integritas skema.",
    description:
      "Di sistem multi-tenant, bug paling mahal adalah bug yang lolos ke production tanpa error. Saya memakai TypeScript untuk mengubah aturan bisnis penting — seperti 'setiap query wajib membawa tenant' — menjadi error di waktu kompilasi.",
    inPractice: [
      "Mendefinisikan kontrak API bertipe yang dibagi antara frontend dan service untuk lapisan isolasi kedua di arsitektur multi-tenant.",
      "Memodelkan tipe kolom dinamis di schema builder sehingga transisi tipe data (misalnya varchar) hanya bisa terjadi lewat jalur yang dikontrol.",
      "Menyusun tipe props bersama untuk submodule form-builder agar rich text, toggle, dan dropdown dirender konsisten di semua modul.",
    ],
    principles: [
      {
        title: "Make illegal states unrepresentable",
        body: "Discriminated union untuk status async (idle/loading/success/error) mencegah kombinasi state yang mustahil.",
      },
      {
        title: "Branded types untuk ID",
        body: "TenantId dan TaskId bukan sekadar string — tipe yang berbeda membuat argumen tertukar langsung ketahuan.",
      },
      {
        title: "Strict by default",
        body: "strict mode, noUncheckedIndexedAccess, dan validasi runtime di boundary API agar tipe tetap jujur.",
      },
    ],
    ecosystem: ["Strict mode", "Zod", "Discriminated unions", "Generics", "Type-safe API contracts"],
    snippet: {
      filename: "tenant.ts",
      caption: "Branded type (disederhanakan) — query tanpa tenant tidak akan lolos kompilasi.",
      code: `type Brand<T, B extends string> = T & { readonly __brand: B };
export type TenantId = Brand<string, "TenantId">;

export type TenantScoped<T> = { tenantId: TenantId } & T;

export function scopedKey<T extends readonly unknown[]>(
  tenantId: TenantId,
  ...parts: T
) {
  return ["tenant", tenantId, ...parts] as const;
}

// Lupa menyertakan tenantId? Compile error, bukan kebocoran data.
export function listTasks(params: TenantScoped<{ queue: string }>) {
  return api.get("/tasks", { params });
}`,
    },
  },
  {
    slug: "tailwind-css",
    name: "Tailwind CSS",
    category: "Styling & Design System",
    icon: TailwindIcon,
    summary: "Design system berbasis token yang konsisten di dark/light mode dan mudah dimigrasi.",
    description:
      "Tailwind bersama shadcn/ui menjadi tulang punggung sistem desain baru AlurKerja. Kuncinya ada di token CSS variable: satu sumber kebenaran untuk warna, radius, dan spacing sehingga dark mode dan konsistensi visual didapat 'gratis'.",
    inPractice: [
      "Menstandarkan token tema (CSS variables) sehingga dark/light mode konsisten di seluruh modul yang dimigrasi.",
      "Menyusun komponen berbasis varian agar tim bisa berpindah dari komponen legacy tanpa menulis ulang styling.",
      "Memperbaiki isu aksesibilitas (focus ring, kontras, state disabled) sebagai bagian dari migrasi ke shadcn/ui.",
    ],
    principles: [
      {
        title: "Token, bukan warna",
        body: "Komponen hanya mengenal bg-primary atau text-muted-foreground — nilai warnanya diatur oleh tema.",
      },
      {
        title: "Varian yang eksplisit",
        body: "Variasi komponen didefinisikan di satu tempat, bukan disebar sebagai className ad-hoc di setiap halaman.",
      },
      {
        title: "Aksesibilitas bawaan",
        body: "focus-visible, aria-*, dan prefers-reduced-motion adalah bagian dari komponen dasar, bukan tambahan.",
      },
    ],
    ecosystem: ["shadcn/ui", "Radix UI", "CSS Variables", "tailwind-merge", "class-variance-authority", "Dark mode"],
    snippet: {
      filename: "button.tsx",
      caption: "Komponen berbasis token & varian (disederhanakan) — dark mode tanpa duplikasi kelas.",
      code: `const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-input bg-background hover:bg-accent",
  ghost: "hover:bg-accent hover:text-accent-foreground",
} as const;

export function Button({ variant = "default", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}`,
    },
  },
  {
    slug: "microservices",
    name: "Microservices",
    category: "Architecture",
    icon: MicroservicesIcon,
    summary: "Batas layanan yang jelas, kontrak API yang tegas, dan otorisasi yang ditegakkan di setiap boundary.",
    description:
      "AlurKerja terdiri dari puluhan modul yang harus tetap terisolasi per tenant. Saya bekerja di level kontrak antar-layanan: memastikan setiap service menegakkan aturan tenant dan RBAC yang sama, serta operasi massal tidak meninggalkan sistem dalam kondisi setengah jadi.",
    inPractice: [
      "Menegakkan isolasi tenant di kontrak API dan skema database, dengan RBAC ketat yang mengembalikan 403 secara konsisten.",
      "Membatasi akses level admin agar operasi lintas-tenant hanya bisa dilakukan lewat jalur yang terkontrol.",
      "Merancang alur bulk claim & complete yang aman terhadap kegagalan parsial dan tetap tersinkron dengan status di diagram BPMN.",
    ],
    principles: [
      {
        title: "Zero trust antar-service",
        body: "Tenant dan peran diverifikasi di setiap boundary — tidak ada service yang mengandalkan pemeriksaan service lain.",
      },
      {
        title: "Kontrak sebelum implementasi",
        body: "Bentuk request/response dan kode error disepakati di awal sehingga frontend dan backend bisa bergerak paralel.",
      },
      {
        title: "Gagal sebagian, bukan gagal diam-diam",
        body: "Operasi massal melaporkan hasil per item sehingga UI bisa menampilkan dengan jujur apa yang berhasil dan apa yang tidak.",
      },
    ],
    ecosystem: ["REST API", "RBAC", "Multi-tenancy", "BPMN engine", "API Gateway", "Docker"],
    snippet: {
      filename: "tenant-guard.ts",
      caption: "Middleware tenant & RBAC (disederhanakan) — kontrak yang sama di setiap boundary.",
      code: `export const tenantGuard =
  (required: Permission): RequestHandler =>
  async (req, res, next) => {
    const { tenantId, roles } = req.auth; // dari token terverifikasi
    const target = req.params.tenantId;

    if (target !== tenantId) {
      return res.status(403).json({ code: "TENANT_MISMATCH" });
    }
    if (!can(roles, required)) {
      return res.status(403).json({ code: "FORBIDDEN" });
    }

    req.db = db.withSchema(schemaFor(tenantId)); // isolasi di level skema
    next();
  };`,
    },
  },
  {
    slug: "nodejs",
    name: "Node.js",
    category: "Backend",
    icon: NodeIcon,
    summary: "Layanan backend yang efisien untuk operasi massal, master data, dan validasi skema dinamis.",
    description:
      "Node.js saya gunakan untuk layanan yang dekat dengan kebutuhan UI: memproses unggahan massal, mengeksekusi aksi tugas secara konkuren, dan memvalidasi perubahan skema yang diminta pengguna non-teknis sebelum menyentuh database.",
    inPractice: [
      "Membangun pipeline bulk upload master data dengan filter per-kolom dan validasi tipe sebelum data ditulis.",
      "Mengeksekusi aksi tugas massal secara bertahap (batch) agar server tidak kewalahan dan kegagalan tidak merambat.",
      "Mengontrol transisi tipe kolom secara ketat di master data engine untuk menjaga integritas data yang sudah ada.",
    ],
    principles: [
      {
        title: "Batch & backpressure",
        body: "Pekerjaan besar dipecah menjadi potongan kecil agar event loop tetap responsif dan beban database terkendali.",
      },
      {
        title: "Validasi di pintu masuk",
        body: "Input dari pengguna non-teknis divalidasi ketat sebelum menjadi perubahan skema atau baris data.",
      },
      {
        title: "Idempoten bila memungkinkan",
        body: "Aksi seperti klaim tugas aman untuk diulang sehingga retry dari klien tidak menimbulkan duplikasi.",
      },
    ],
    ecosystem: ["Express", "PostgreSQL", "REST", "Streams", "Queue / Worker", "Jest"],
    snippet: {
      filename: "bulk-complete.ts",
      caption: "Operasi massal per-batch (disederhanakan) — laporan per item, bukan all-or-nothing.",
      code: `export async function bulkComplete(tenantId: TenantId, taskIds: string[]) {
  const results: BulkResult[] = [];

  for (const batch of chunk(taskIds, 50)) {
    const settled = await Promise.allSettled(
      batch.map((id) => completeTask(tenantId, id)),
    );

    settled.forEach((r, i) =>
      results.push(
        r.status === "fulfilled"
          ? { id: batch[i], ok: true }
          : { id: batch[i], ok: false, reason: String(r.reason) },
      ),
    );
  }

  return results; // UI menandai item gagal tanpa membatalkan yang sukses
}`,
    },
  },
];

export function getSkill(slug: string) {
  return skills.find((s) => s.slug === slug);
}
