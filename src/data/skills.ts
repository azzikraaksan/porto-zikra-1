import type { ComponentType, SVGProps } from "react";
import { Database, GitBranch, Server, ShieldCheck } from "lucide-react";
import { ReactIcon, TypeScriptIcon } from "@/components/icons";

export type SkillSlug = "react" | "typescript" | "laravel-go" | "database" | "testing" | "git-tools";

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
    name: "React.js & Next.js",
    category: "Frontend",
    icon: ReactIcon,
    summary: "Mengembangkan antarmuka aplikasi web, halaman fitur, dashboard, dan komponen UI yang dapat digunakan kembali.",
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
    name: "TypeScript & JavaScript",
    category: "Programming Languages",
    icon: TypeScriptIcon,
    summary: "Membangun fitur frontend dengan JavaScript dan TypeScript untuk mendukung pengembangan aplikasi web.",
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
    slug: "laravel-go",
    name: "Laravel & Go",
    category: "Backend",
    icon: Server,
    summary: "Mengembangkan fitur backend, REST API, dan logika aplikasi untuk mendukung kebutuhan platform.",
    description:
      "Di sisi backend, saya mengembangkan fitur, REST API, dan logika aplikasi menggunakan Laravel dan Go untuk mendukung kebutuhan platform, termasuk pengelolaan data dan kontrol akses pengguna.",
    inPractice: [
      "Mengembangkan REST API untuk fitur platform yang dikonsumsi langsung oleh frontend.",
      "Menerapkan logika aplikasi dan kontrol akses pengguna (RBAC) di sisi backend.",
      "Memproses operasi data dalam jumlah besar secara bertahap agar server tetap responsif.",
    ],
    principles: [
      {
        title: "Kontrak API yang jelas",
        body: "Bentuk request/response dan kode error disepakati di awal sehingga frontend dan backend bisa bergerak paralel.",
      },
      {
        title: "Validasi di pintu masuk",
        body: "Input divalidasi ketat sebelum menjadi perubahan data atau logika bisnis.",
      },
      {
        title: "Akses ditegakkan di server",
        body: "Pemeriksaan peran dan izin dilakukan di backend, bukan hanya disembunyikan di UI.",
      },
    ],
    ecosystem: ["Laravel", "Go", "REST API", "RBAC", "Eloquent", "Docker"],
    snippet: {
      filename: "bulk-complete.go",
      caption: "Operasi massal per-batch (disederhanakan) — laporan per item, bukan all-or-nothing.",
      code: `func BulkComplete(ctx context.Context, ids []string) []Result {
	results := make([]Result, 0, len(ids))

	for _, batch := range chunk(ids, 50) {
		for _, id := range batch {
			if err := completeTask(ctx, id); err != nil {
				results = append(results, Result{ID: id, OK: false, Reason: err.Error()})
				continue
			}
			results = append(results, Result{ID: id, OK: true})
		}
	}

	return results // UI menandai item gagal tanpa membatalkan yang sukses
}`,
    },
  },
  {
    slug: "database",
    name: "PostgreSQL & MySQL",
    category: "Database",
    icon: Database,
    summary: "Merancang skema database dan mengembangkan API untuk pengelolaan data aplikasi.",
    description:
      "Saya merancang skema database dan mengembangkan API untuk pengelolaan data aplikasi menggunakan PostgreSQL dan MySQL, dengan perhatian pada integritas data dan isolasi antar tenant.",
    inPractice: [
      "Merancang skema tabel dan relasi untuk kebutuhan fitur aplikasi.",
      "Mengembangkan API untuk membaca dan mengelola data dari database.",
      "Menjaga integritas data saat terjadi perubahan struktur atau tipe kolom.",
    ],
    principles: [
      {
        title: "Skema sebagai kontrak",
        body: "Constraint, relasi, dan tipe data didefinisikan di database agar data tetap konsisten.",
      },
      {
        title: "Perubahan lewat migrasi",
        body: "Setiap perubahan struktur dilakukan lewat migrasi yang dapat ditinjau dan diulang.",
      },
      {
        title: "Query yang terukur",
        body: "Index dan query dipilih berdasarkan pola akses nyata, bukan perkiraan.",
      },
    ],
    ecosystem: ["PostgreSQL", "MySQL", "Migrations", "Indexing", "SQL"],
    snippet: {
      filename: "create_tasks_table.sql",
      caption: "Skema dengan constraint dan index (disederhanakan).",
      code: `CREATE TABLE tasks (
  id         BIGSERIAL PRIMARY KEY,
  tenant_id  BIGINT       NOT NULL REFERENCES tenants (id),
  title      VARCHAR(255) NOT NULL,
  status     VARCHAR(32)  NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_tasks_tenant_status ON tasks (tenant_id, status);`,
    },
  },
  {
    slug: "testing",
    name: "Testing & Code Quality",
    category: "Quality Assurance",
    icon: ShieldCheck,
    summary: "Memperbaiki bug, melakukan unit testing menggunakan Vitest dan Go test, serta menangani temuan SonarQube.",
    description:
      "Saya memperbaiki bug, menulis unit test dengan Vitest dan Go test, serta menangani temuan SonarQube agar kode tetap berkualitas dan mudah dipelihara.",
    inPractice: [
      "Menemukan akar masalah dan memperbaiki bug melalui debugging.",
      "Menulis unit test untuk frontend dengan Vitest dan untuk backend dengan Go test.",
      "Menindaklanjuti temuan SonarQube untuk menjaga kualitas kode.",
    ],
    principles: [
      {
        title: "Bug diperbaiki dengan test",
        body: "Perbaikan disertai test yang mereproduksi masalah agar tidak muncul kembali.",
      },
      {
        title: "Test yang fokus",
        body: "Setiap test menguji satu perilaku dengan input dan hasil yang jelas.",
      },
      {
        title: "Kualitas terukur",
        body: "Temuan analisis statis ditangani secara berkala, bukan menumpuk.",
      },
    ],
    ecosystem: ["Vitest", "Go test", "SonarQube", "Debugging"],
    snippet: {
      filename: "format.test.ts",
      caption: "Unit test dengan Vitest (disederhanakan).",
      code: `import { describe, expect, it } from "vitest";
import { formatStatus } from "./format";

describe("formatStatus", () => {
  it("menampilkan label yang sesuai", () => {
    expect(formatStatus("open")).toBe("Terbuka");
  });

  it("memakai nilai bawaan untuk status tak dikenal", () => {
    expect(formatStatus("unknown")).toBe("-");
  });
});`,
    },
  },
  {
    slug: "git-tools",
    name: "Git, GitLab & GitHub",
    category: "Development Tools",
    icon: GitBranch,
    summary: "Menggunakan version control untuk mendukung pengelolaan kode selama proses pengembangan aplikasi.",
    description:
      "Saya menggunakan Git, GitLab, dan GitHub untuk mengelola kode, berkolaborasi lewat branch dan merge request, serta menjaga riwayat perubahan tetap rapi selama pengembangan aplikasi.",
    inPractice: [
      "Bekerja dengan branch fitur dan merge request/pull request untuk setiap perubahan.",
      "Menyelesaikan konflik merge dan menjaga riwayat commit tetap jelas.",
      "Berkolaborasi dengan tim melalui code review di GitLab dan GitHub.",
    ],
    principles: [
      {
        title: "Commit yang kecil",
        body: "Satu commit untuk satu perubahan yang bermakna agar mudah ditinjau dan ditelusuri.",
      },
      {
        title: "Review sebelum merge",
        body: "Perubahan masuk lewat merge request agar kualitas terjaga bersama tim.",
      },
      {
        title: "Riwayat yang bisa dibaca",
        body: "Pesan commit menjelaskan alasan perubahan, bukan hanya apa yang berubah.",
      },
    ],
    ecosystem: ["Git", "GitLab", "GitHub", "Merge request", "Code review"],
    snippet: {
      filename: "workflow.sh",
      caption: "Alur kerja branch fitur (disederhanakan).",
      code: `git checkout -b feat/bulk-task-actions
git add .
git commit -m "feat: add bulk claim and complete actions"
git push -u origin feat/bulk-task-actions
# lanjutkan dengan membuka merge request / pull request`,
    },
  },
];

export function getSkill(slug: string) {
  return skills.find((s) => s.slug === slug);
}
