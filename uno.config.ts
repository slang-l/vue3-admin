import { defineConfig } from "unocss"
import presetUno from "@unocss/preset-uno"
import presetAttributify from "@unocss/preset-attributify"
import transformerDirectives from "@unocss/transformer-directives"

import { presetIcons } from "@unocss/preset-icons"
export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()]
})
