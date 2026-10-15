# Portfolio — Zikra

Next.js 15 (App Router) + React 19 + Tailwind CSS 3, bergaya shadcn/ui.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Yang perlu kamu ganti

| Apa | Di mana |
| --- | --- |
| Nama, email, link GitHub/LinkedIn, tagline, teks typing | `src/data/site.ts` |
| File CV | taruh di `public/cv-zikra.pdf` (atau ubah `cvUrl`) |
| 5 Technical Case Studies | `src/data/case-studies.ts` |
| Isi halaman tiap skill (penerapan, prinsip, ekosistem, snippet) | `src/data/skills.ts` |
| Proyek unggulan AlurKerja (hook, peran, fitur, dampak, periode, tim, live URL) | `src/data/projects.ts` |

## Foto / screenshot

Taruh file di `public/images/alurkerja/` dengan nama persis seperti di bawah. Selama file belum ada, situs menampilkan placeholder berisi path dan ide gambarnya. Setelah file ada, gambar langsung tampil dan otomatis dioptimasi oleh `next/image`. Pada `npm run dev` cukup refresh; untuk production jalankan `npm run build` lagi.

| File | Dipakai di | Ide isi | Rasio |
| --- | --- | --- | --- |
| `cover.png` | Hero + cover halaman studi kasus | Dashboard utama: sidebar modul + task inbox (data dummy) | 16:10 |
| `cover-detail.png` | Kartu kecil melayang di hero | Close-up diagram BPMN | 4:3 |
| `feature-bpmn.png` | Fitur: Workflow & BPMN | Node selesai disorot, node aktif ditandai | 16:10 |
| `feature-task-inbox.png` | Fitur: Task Inbox | Baris tercentang + toolbar aksi massal | 16:10 |
| `feature-schema-builder.png` | Fitur: Schema Builder | Form tabel dengan kolom dinamis | 16:10 |
| `feature-master-data.png` | Fitur: Master Data | Filter kolom + modal bulk upload | 16:10 |
| `feature-workspace.png` | Fitur: Multi-Tenant | Workspace switcher terbuka / halaman 403 | 16:10 |
| `feature-design-system.png` | Fitur: Design System | Split light vs dark mode | 16:10 |
| `cs-multi-tenant.png` | Detail teknis #1 | Diagram 3 lapisan isolasi | 16:10 |
| `cs-schema-builder.png` | Detail teknis #2 | Dialog konfirmasi hapus dengan nama tabel | 16:10 |
| `cs-race-condition.png` | Detail teknis #3 | DevTools Network: request lama "(canceled)" | 16:10 |
| `cs-shadcn-migration.png` | Detail teknis #4 | Before/after legacy vs shadcn/ui | 16:10 |
| `cs-bulk-operations.png` | Detail teknis #5 | Select-all terfilter + progres aksi massal | 16:10 |

Tips: ambil screenshot di 1600×1000 (atau 2x untuk layar retina), pakai data dummy, dan **samarkan semua data klien**. Kalau format filenya bukan `.png`, ubah ekstensinya di `src/data/projects.ts` / `src/data/case-studies.ts`.

## Struktur

```
src/
├─ app/
│  ├─ layout.tsx            # font, metadata, theme script, header & footer
│  ├─ page.tsx              # Hero → About & Skills → Case Studies
│  ├─ skills/page.tsx       # indeks semua skill
│  └─ skills/[slug]/page.tsx# halaman lengkap tiap skill (SSG)
├─ components/
│  ├─ sections/             # hero, about, case-studies
│  ├─ ui/                   # button, badge, section-heading (shadcn-style)
│  ├─ theme-script.tsx      # set tema sebelum paint (tanpa flash)
│  ├─ theme-toggle.tsx      # toggle dark/light tanpa state & tanpa lag
│  ├─ typewriter.tsx        # efek mengetik di hero
│  ├─ reveal.tsx            # scroll reveal (1 IntersectionObserver bersama)
│  └─ code-block.tsx        # syntax highlight di server (0 KB JS klien)
└─ data/                    # semua konten
```

## Catatan performa

- Tema diterapkan oleh inline script kecil di `<head>` sebelum paint, jadi tidak ada flash. Ikon toggle dipilih lewat CSS, sehingga tidak ada hydration mismatch.
- Saat ganti tema, semua transisi dimatikan selama satu frame sehingga peralihannya instan.
- Scroll reveal memakai satu `IntersectionObserver` untuk semua elemen. Konten tetap terlihat walau JS mati.
- Progress bar scroll di header memakai CSS `animation-timeline: scroll()` tanpa JS.
- Accordion dianimasikan dengan `grid-template-rows: 0fr → 1fr`, tanpa mengukur DOM.
- Semua halaman di-prerender statis.
- Animasi menghormati `prefers-reduced-motion`.
