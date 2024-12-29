import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import prettierConfig from "eslint-plugin-prettier/recommended"

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  // 哪些文件不通过eslint进行校验
  {
    ignores: [".css", "*.d.ts"]
  },
  {
    rules: {
      // allow debugger during development
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "vue/multi-word-component-names": "off"
    }
  },
  prettierConfig // 覆盖掉eslint的规范
]
