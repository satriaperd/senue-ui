<script setup>
import { computed } from 'vue'

/**
 * Icon dari Material Symbols Rounded.
 * Konsumen wajib load font via Google Fonts atau self-host.
 *
 * @see https://fonts.google.com/icons
 */
const props = defineProps({
  /** Nama icon Material Symbols (snake_case) */
  name: {
    type: String,
    required: true,
  },
  /** Ukuran dalam px — juga mengontrol optical size (opsz) */
  size: {
    type: Number,
    default: 20,
  },
  /** Filled variant */
  fill: {
    type: Boolean,
    default: false,
  },
  /** Font weight (100–700) */
  weight: {
    type: Number,
    default: 300,
  },
  /** Grade: fine-tuning berat stroke (-50 sampai 200) */
  grade: {
    type: Number,
    default: 0,
  },
  /**
   * Label aksesibilitas untuk icon yang bermakna.
   * Jika tidak diisi, icon dianggap dekoratif (aria-hidden).
   */
  label: {
    type: String,
    default: '',
  },
})

const style = computed(() => ({
  fontSize:             `${props.size}px`,
  fontVariationSettings: `'FILL' ${props.fill ? 1 : 0}, 'wght' ${props.weight}, 'GRAD' ${props.grade}, 'opsz' ${props.size}`,
}))
</script>

<template>
  <span
    class="seneu-icon"
    :style="style"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >{{ name }}</span>
</template>

<style>
.seneu-icon {
  font-family:      'Material Symbols Rounded';
  font-weight:      normal;
  font-style:       normal;
  line-height:      1;
  letter-spacing:   normal;
  text-transform:   none;
  display:          inline-flex;
  align-items:      center;
  white-space:      nowrap;
  word-wrap:        normal;
  direction:        ltr;
  user-select:      none;
  flex-shrink:      0;
}
</style>
