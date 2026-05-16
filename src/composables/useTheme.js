import { ref, watch } from 'vue'

const STORAGE_KEY = 'seneu-theme'

// Singleton — satu state untuk seluruh app.
// Semua panggilan useTheme() berbagi isDark yang sama.
const isDark = ref(false)
let _initialized = false

function applyClass(dark) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', dark)
}

function initializeTheme() {
  if (_initialized || typeof window === 'undefined') return
  _initialized = true

  const stored = localStorage.getItem(STORAGE_KEY)

  isDark.value = stored
    ? stored === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches

  applyClass(isDark.value)

  // Sync ke DOM setiap kali isDark berubah
  watch(isDark, applyClass)

  // Ikuti perubahan system preference — tapi hanya jika user belum set manual
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        isDark.value = e.matches
      }
    })
}

/**
 * Composable untuk kontrol tema light/dark.
 *
 * @example
 * const { isDark, toggle, setTheme } = useTheme()
 *
 * toggle()              // flip antara light dan dark
 * setTheme('dark')      // paksa dark
 * setTheme('light')     // paksa light
 * setTheme('system')    // ikuti preferensi OS, hapus override
 */
export function useTheme() {
  initializeTheme()

  /** Flip antara light dan dark, simpan ke localStorage. */
  function toggle() {
    isDark.value = !isDark.value
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }

  /**
   * Set tema secara eksplisit.
   * @param {'light' | 'dark' | 'system'} theme
   */
  function setTheme(theme) {
    if (theme === 'system') {
      localStorage.removeItem(STORAGE_KEY)
      isDark.value =
        typeof window !== 'undefined'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
          : false
    } else {
      isDark.value = theme === 'dark'
      localStorage.setItem(STORAGE_KEY, theme)
    }
  }

  return { isDark, toggle, setTheme }
}
