# Seneu UI — Claude Code Instructions

> Baca file ini sepenuhnya sebelum mengerjakan apapun.
> Semua rules di sini bersifat WAJIB dan tidak boleh diabaikan.

---

## 📦 Project Overview

**Seneu UI** adalah Vue 3 component library yang akan di-publish ke NPM.
Library ini dirancang sebagai standalone package yang bisa dipakai developer
lain sebagai starting point untuk membangun CMS atau admin panel.

- **NPM package name:** `seneu-ui` (atau `@cimang/seneu-ui`)
- **Repo referensi (Seneu CMS):** https://github.com/satriaperd/seneu-cms
- **Brand color:** `#FC7A1E`
- **Design standard:** WCAG 2.2 Level AA minimum
- **Tone & Voice:** Friendly dan casual — semua copy UI (label, placeholder,
  tooltip, empty state) ditulis seperti ngobrol sama teman sendiri

---

## 🛠 Tech Stack

| Tool | Versi | Catatan |
|---|---|---|
| Vue | ^3.5.x | Composition API only, tanpa Pinia |
| Tailwind CSS | ^4.x | Native CSS variable approach |
| Vite | ^6.x | Library Mode — bukan web app mode |
| TypeScript | via JSDoc | Type declaration files (.d.ts) wajib ada |
| Tiptap | ^2.x | peerDependency — jangan install sebagai dependency |
| Apache ECharts | ^5.x | peerDependency — jangan install sebagai dependency |
| Material Symbols | latest | Via Google Fonts — dokumentasikan cara pakainya |

**PENTING:** Ini adalah **library package**, bukan web app.
- Jangan ada logic yang spesifik ke Seneu CMS
- Semua komponen harus bisa berdiri sendiri (self-contained)
- Tiptap dan ECharts masuk sebagai `peerDependencies` di package.json

---

## 📁 Folder Structure

```
seneu-ui/
├── src/
│   ├── components/
│   │   ├── form/           ← Button, Input, Textarea, dll
│   │   ├── layout/         ← Sidebar, Topbar, Breadcrumb, dll
│   │   ├── display/        ← Card, Table, Badge, Avatar, dll
│   │   └── feedback/       ← Modal, Toast, Alert, dll
│   ├── tokens/
│   │   ├── primitive.css   ← nilai mentah, tidak dipakai langsung di komponen
│   │   └── semantic.css    ← token kontekstual, inilah yang dipakai komponen
│   ├── composables/        ← shared composables (useTheme, useToast, dll)
│   └── index.js            ← entry point — semua komponen di-export dari sini
├── CLAUDE.md               ← file ini
├── package.json            ← versi mulai v1.0.0
├── vite.config.js          ← library mode config
├── tailwind.config.js
├── .gitignore
└── README.md
```

**Naming convention:**
- Komponen: `PascalCase` — `SeneuButton.vue`, `SeneuCard.vue`
- File token: `kebab-case` — `primitive.css`, `semantic.css`
- Composables: `camelCase` dengan prefix `use` — `useTheme.js`, `useToast.js`
- Semua komponen di-prefix `Seneu` untuk menghindari konflik nama

---

## 🎨 Design Token System

Token dibagi menjadi **dua layer**. Jangan pernah balik urutannya.

### Layer 1 — Primitive Token

Didefinisikan sebagai CSS custom properties di `:root`.
Ini adalah nilai mentah — **tidak boleh dipakai langsung di komponen**.

**Naming:** `--primitive-[category]-[value]`

```css
/* Contoh */
--primitive-color-orange-500: #FC7A1E;
--primitive-space-4: 1rem;
--primitive-radius-8: 8px;
```

### Layer 2 — Semantic Token

Mengacu ke primitive. **Inilah yang dipakai di komponen.**
Penamaan berbasis konteks — harus self-explanatory tanpa perlu buka file token.

**Naming:** `--[category]-[context]-[variant?]`

```css
/* Contoh */
--color-surface-default: var(--primitive-color-neutral-0);
--color-text-muted: var(--primitive-color-neutral-500);
--color-border-interactive: var(--primitive-color-orange-500);
```

---

### Color Tokens

**Brand Scale** — base `#FC7A1E` sebagai `orange-500`:
- Buat skala lengkap: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

**Feedback Colors** — warm-toned, harmoni dengan brand:
- Danger/Error: merah warm-toned (arah `#E53E3E`)
- Warning: amber hangat (arah `#D97706`)
- Success: hijau sedikit warm (hindari hijau neon)
- Info: biru mid-tone, tidak terlalu dingin

**Chart Colors** — 4 warna, harmoni dengan brand, lulus WCAG AA:
- Chart-1: Teal warm (`#0D9488` area)
- Chart-2: Indigo warm (`#6366F1` area)
- Chart-3: Rose warm (`#F43F5E` area)
- Chart-4: Lime warm (`#84CC16` area)

**Neutral/Gray Scale** — warm-gray (sedikit orange undertone):
- Skala: 0 (putih), 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 (hitam)

**Semantic Color Tokens yang wajib ada** (bukan hanya ini):
```
--color-surface-default        --color-surface-raised
--color-surface-overlay        --color-surface-brand
--color-surface-brand-subtle   --color-surface-danger
--color-surface-danger-subtle  --color-surface-warning
--color-surface-warning-subtle --color-surface-success
--color-surface-success-subtle --color-surface-info
--color-surface-info-subtle
--color-text-default           --color-text-muted
--color-text-disabled          --color-text-on-brand
--color-text-on-danger         --color-text-on-success
--color-border-default         --color-border-interactive
--color-border-focus           --color-border-brand
--color-border-danger          --color-border-success
```

---

### Typography Tokens

```css
--font-sans: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Scale 1.25x dari base 16px, dibulatkan */
--font-size-xs:        10px;
--font-size-small:     13px;
--font-size-body:      16px;
--font-size-lead:      20px;
--font-size-heading-4: 25px;
--font-size-heading-3: 31px;
--font-size-heading-2: 39px;
--font-size-heading-1: 49px;
--font-size-display:   61px;

/* Font Weight */
--font-weight-regular:  400;
--font-weight-medium:   500;
--font-weight-semibold: 600;
--font-weight-bold:     700;

/* Line Height — kontekstual */
--line-height-tight:   1.25;
--line-height-normal:  1.5;
--line-height-relaxed: 1.75;

/* Letter Spacing — kontekstual */
--letter-spacing-tight:  -0.02em;
--letter-spacing-normal:  0em;
--letter-spacing-wide:    0.05em;
```

---

### Spacing Tokens

**Primitive** — base 4px (0.25rem):
```
space-1: 0.25rem  |  space-2: 0.5rem   |  space-3: 0.75rem
space-4: 1rem     |  space-5: 1.25rem  |  space-6: 1.5rem
space-8: 2rem     |  space-10: 2.5rem  |  space-12: 3rem
space-16: 4rem    |  space-20: 5rem    |  space-24: 6rem
space-32: 8rem    |  space-40: 10rem   |  space-48: 12rem
space-64: 16rem
```

**Semantic** — kontekstual, wajib ada:
```css
--space-component-gap             /* jarak antar elemen dalam komponen */
--space-component-padding-inline  /* padding horizontal komponen */
--space-component-padding-block   /* padding vertikal komponen */
--space-layout-section            /* jarak antar section di halaman */
--space-layout-content            /* padding konten utama */
--space-inline-tight              /* jarak inline rapat */
--space-inline-normal             /* jarak inline normal */
--space-inline-loose              /* jarak inline longgar */
--space-stack-tight               /* jarak vertikal rapat */
--space-stack-normal              /* jarak vertikal normal */
--space-stack-loose               /* jarak vertikal longgar */
```

---

### Border Radius Tokens

**Jangan gunakan sm/md/lg — gunakan nama kontekstual:**

```css
--radius-none:      0px;
--radius-subtle:    4px;    /* badge dalam state, chip */
--radius-element:   8px;    /* input, button, card kecil */
--radius-container: 12px;   /* card, panel, modal */
--radius-overlay:   16px;   /* drawer, dialog besar */
--radius-pill:      9999px; /* badge, tag, toggle */
--radius-circle:    50%;    /* avatar, icon button bulat */
```

---

### Elevation & Shadow Tokens

Shadow dengan **warm tint** (sedikit orange/brown undertone):

```css
--elevation-none:    none;
--elevation-surface: /* sangat tipis — card di atas background */
--elevation-raised:  /* ringan — elemen terangkat */
--elevation-floating:/* medium — dropdown, popover */
--elevation-overlay: /* kuat — modal, dialog */
--elevation-sticky:  /* header/sidebar sticky */
```

---

### Z-Index Tokens

```css
--z-index-base:             0;
--z-index-raised:           10;
--z-index-dropdown:         100;
--z-index-sticky:           200;
--z-index-overlay-backdrop: 300;
--z-index-overlay:          400;
--z-index-toast:            500;
--z-index-tooltip:          600;
```

---

### Opacity Tokens

```css
--opacity-0:        0;
--opacity-disabled: 0.38;
--opacity-medium:   0.60;
--opacity-high:     0.87;
--opacity-full:     1;
```

---

### Transition & Animation Tokens

```css
--duration-instant: 0ms;
--duration-fast:    100ms;
--duration-normal:  200ms;
--duration-slow:    300ms;
--duration-slower:  400ms;

--easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
--easing-enter:    cubic-bezier(0, 0, 0.2, 1);
--easing-exit:     cubic-bezier(0.4, 0, 1, 1);
--easing-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## 🧩 Component Standards

### Definisi "SELESAI" untuk sebuah komponen

Sebuah komponen dianggap **SELESAI** hanya jika semua poin ini terpenuhi:

- [ ] File `.vue` ada di `src/components/[kategori]/Seneu[Nama].vue`
- [ ] Di-export dari `src/index.js`
- [ ] Menggunakan semantic token — **zero hardcoded warna atau spacing**
- [ ] Semua variant sudah berjalan (bukan di-comment atau TODO)
- [ ] Semua state sudah berjalan (bukan di-comment atau TODO)
- [ ] Responsive di 3 breakpoint
- [ ] Dark & light theme proper
- [ ] Micro-interaction ada dan menghormati `prefers-reduced-motion`
- [ ] WCAG 2.2 AA compliant
- [ ] Skeleton version ada (untuk komponen yang menampilkan data)
- [ ] JSDoc comment untuk props utama
- [ ] TypeScript declaration ter-generate

**Jangan lanjut ke komponen berikutnya sebelum komponen ini benar-benar selesai.**

---

### Props, Emits & Slots

```vue
<script setup>
// Selalu gunakan defineProps dengan tipe eksplisit
const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'brand', 'danger',
                       'success', 'warning', 'info'].includes(v)
  },
  size: {
    type: String,
    default: 'base'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// Selalu dokumentasikan emits
const emit = defineEmits(['click', 'focus', 'blur'])
</script>
```

---

### Variants & States yang Wajib Ada

**Variants:** `default`, `brand`, `danger`, `success`, `warning`, `info`

**States:** `default`, `hover`, `focus`, `active`, `disabled`, `loading`

Setiap variant harus proper di **light dan dark theme**.

---

### Responsive Behavior

| Breakpoint | Range | Behavior |
|---|---|---|
| Mobile | < 768px | Layout bisa berubah signifikan |
| Tablet | 768px – 1023px | Intermediate layout |
| Desktop | ≥ 1024px | Full layout |

Gunakan Tailwind responsive prefix: `md:`, `lg:`.
Komponen bukan sekadar "mengecil" di mobile — behavior dan layout-nya
bisa berubah sesuai kebutuhan UX.

---

### Dark & Light Theme

- Tema default mengikuti `prefers-color-scheme` device
- Gunakan semantic token — **jangan hardcode warna di komponen**
- Implementasi via CSS class `.dark` di root element
- Semua komponen wajib tampil proper di kedua tema

---

### Micro-Interaction & Animation

- Transisi state (hover, active, disabled, loading) pakai token duration & easing
- Entrance/exit animation untuk overlay (modal, drawer, toast, dropdown)
- Feedback visual immediate saat user berinteraksi
- Gunakan Vue `<Transition>` component

**WAJIB hormati `prefers-reduced-motion`:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Skeleton Component

Setiap komponen yang menampilkan data **wajib** punya skeleton version.
Skeleton menggunakan shimmer animation dan mengikuti layout komponen aslinya.

```vue
<!-- Contoh penggunaan -->
<SeneuCard :loading="isLoading" />
<!-- Saat loading=true, tampilkan skeleton version -->
```

---

### UX First Principle

- Prioritaskan UX di atas UI
- Loading state, error state, empty state **wajib** ada
- Empty state harus informatif dan actionable (bukan cuma "Tidak ada data")
- Form validation real-time (on-blur), bukan hanya on-submit
- Tooltip wajib ada untuk elemen icon-only tanpa label

---

## ♿ WCAG 2.2 Level AA Checklist

Wajib terpenuhi di **semua komponen**:

**Color & Contrast:**
- Text normal (< 18px atau < 14px bold): contrast ratio minimal **4.5:1**
- Text besar (≥ 18px atau ≥ 14px bold): contrast ratio minimal **3:1**
- UI components & graphical objects: contrast ratio minimal **3:1**
- Jangan gunakan warna sebagai **satu-satunya** cara menyampaikan informasi

**Keyboard Navigation:**
- Semua elemen interaktif bisa diakses via keyboard
- Focus order logis sesuai urutan visual
- Focus indicator **harus visible** — jangan hilangkan outline tanpa gantinya

**Semantic HTML:**
- Gunakan elemen HTML yang semantik
- ARIA label wajib untuk elemen tanpa teks visible
- Form elements wajib punya label yang terhubung

---

## 📦 Export Rules

Semua komponen **wajib** di-export dari `src/index.js`:

```js
// src/index.js
export { default as SeneuButton } from './components/form/SeneuButton.vue'
export { default as SeneuInput } from './components/form/SeneuInput.vue'
export { default as SeneuCard } from './components/display/SeneuCard.vue'
// ... dan seterusnya

// Export token sebagai CSS import path
export const tokens = 'seneu-ui/dist/tokens.css'
```

Developer yang install library ini bisa langsung pakai:

```js
import { SeneuButton, SeneuCard } from 'seneu-ui'
import 'seneu-ui/dist/tokens.css'
```

---

## 🔢 Versioning Rules

**Format:** `vMAJOR.MINOR.PATCH` — mulai dari `v1.0.0`

| Jenis perubahan | Bump |
|---|---|
| Komponen baru atau fitur baru | MINOR — `v1.0.0 → v1.1.0` |
| Bug fix, tweak, update copy | PATCH — `v1.1.0 → v1.1.1` |
| Refactor besar atau breaking change | MAJOR — `v1.x.x → v2.0.0` |

**Rules:**
- Simpan versi **hanya** di `package.json` field `"version"`
- Satu sesi pengerjaan = satu bump versi
- Jangan bump versi kalau belum ada perubahan nyata di source code
- Jangan buat versioning per komponen
- Update `package.json` **setiap kali** ada perubahan — jangan lupa

---

## 💬 Git Commit Rules

Gunakan **Conventional Commits** dalam bahasa Inggris.

**Format:**
```
<type>(<scope>): <short description>

<body — opsional>

<footer — opsional>
```

**Types:**
```
feat     → komponen baru atau fitur baru
fix      → bug fix
docs     → update dokumentasi
style    → perubahan styling tanpa ubah logika
refactor → restruktur kode tanpa fitur/fix baru
chore    → update config, dependency, non-source
token    → perubahan design token
```

**Rules untuk short description:**
- Imperative mood: `add`, `fix`, `update` — bukan `added`, `fixed`
- Huruf kecil semua
- Maksimal 72 karakter
- Jangan diakhiri tanda titik

**Contoh yang benar:**
```
feat(button): add SeneuButton with all variants and states

- Add 6 variants: default, brand, danger, success, warning, info
- Add states: hover, focus, active, disabled, loading
- Responsive across desktop, tablet, and mobile
- WCAG AA compliant with proper focus indicators
- Include skeleton version
- Export from src/index.js
```

```
token(color): add primitive and semantic color tokens

Define full color scale for brand (#FC7A1E), feedback colors,
chart colors, and warm-gray neutrals. All values pass WCAG AA.
```

```
fix(input): correct focus ring color in dark theme

Previous --color-border-focus value failed contrast check
on dark background. Updated to pass 3:1 minimum ratio.
```

**Yang DILARANG:**
```
"Updated some files"
"Fixed bug"
"feat(Button): Added button component."   ← PascalCase, past tense, titik
Commit message dalam bahasa Indonesia
```

---

## ✅ Output Format — Wajib Setiap Selesai Task

Setiap kali selesai mengerjakan apapun, **wajib** berikan ringkasan ini:

```
✅ SELESAI DIKERJAIN

📦 Versi: v[LAMA] → v[BARU]

🔨 Apa yang gua kerjain:
- [deskripsi perubahan 1]
- [deskripsi perubahan 2]

📁 File yang diubah/ditambah:
- src/components/form/SeneuButton.vue (baru)
- src/index.js (diubah — tambah export)
- package.json (diubah — bump versi)

💬 Saran commit message:
[commit message lengkap siap pakai]

⚠️ Catatan:
- [breaking change, follow-up, atau hal yang perlu diperhatikan]
- Tulis "Tidak ada." jika memang tidak ada catatan
```

---

## 🚫 Hal yang DILARANG KERAS

- Hardcode warna atau spacing di komponen — semua pakai semantic token
- Membuat komponen "versi dokumentasi" yang berbeda dari komponen aslinya
- Placeholder dengan komentar `// implement later` atau `// TODO`
- Inline style kecuali untuk nilai dinamis yang tidak bisa dihindari
- Lupa update `package.json` setelah ada perubahan
- Lupa export komponen baru dari `src/index.js`
- Commit message dalam bahasa Indonesia
- Versioning per komponen

---

## 📋 Daftar Komponen yang Dibangun

### Form & Input
- [ ] SeneuButton
- [ ] SeneuInput
- [ ] SeneuTextarea
- [ ] SeneuSelect
- [ ] SeneuCheckbox
- [ ] SeneuRadio
- [ ] SeneuToggle
- [ ] SeneuDatePicker
- [ ] SeneuFileUpload
- [ ] SeneuSearchBar

### Layout & Navigation
- [ ] SeneuSidebar
- [ ] SeneuTopbar
- [ ] SeneuBreadcrumb
- [ ] SeneuTabs
- [ ] SeneuPagination
- [ ] SeneuStepper
- [ ] SeneuFooter
- [ ] SeneuCarousel
- [ ] SeneuRichTextEditor

### Data Display
- [ ] SeneuCard
- [ ] SeneuTable
- [ ] SeneuBadge
- [ ] SeneuTag
- [ ] SeneuTooltip
- [ ] SeneuAvatar
- [ ] SeneuStatCard
- [ ] SeneuChartWrapper
- [ ] SeneuEmptyState
- [ ] SeneuSkeleton

### Feedback & Overlay
- [ ] SeneuAlert
- [ ] SeneuToast
- [ ] SeneuModal
- [ ] SeneuDrawer
- [ ] SeneuProgressBar
- [ ] SeneuSpinner
- [ ] SeneuConfirmDialog

---

*Seneu UI — by Cimang Club*
