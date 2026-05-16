---
name: project-seneu-ui
description: Seneu UI Vue 3 component library — setup, structure, and key decisions
metadata:
  type: project
---

Seneu UI adalah Vue 3 component library (NPM package `seneu-ui`) yang dibangun untuk CMS/admin panel. Project di `/Users/satriaperdana/Desktop/Coding/CMS/seneu-ui`.

**Why:** Dibuat sebagai standalone package yang bisa dipakai developer lain. Brand color #FC7A1E (orange-500).

**Setup awal (v1.0.0) selesai dengan:**
- Vite library mode — entry: `src/index.js`, output: `dist/seneu-ui.js` + `dist/seneu-ui.umd.cjs`
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Design token 2-layer: `src/tokens/primitive.css` (nilai mentah) → `src/tokens/semantic.css` (dipakai komponen)
- CSS ter-bundle ke `dist/tokens.css` (bukan style.css) via assetFileNames di rollupOptions
- Dev playground: `src/DevApp.vue` + `src/dev-app.js` + `index.html`
- peerDependencies: vue ^3.5, @tiptap/* (optional), echarts (optional)

**How to apply:** Semua komponen harus prefix `Seneu`, export dari `src/index.js`, dan hanya pakai semantic token — tidak boleh hardcode warna/spacing.

**Saat dev server:** `npm run dev` | Build: `npm run build`
