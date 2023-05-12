/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-undef': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    'vue/attribute-hyphenation': 0,
    '@typescript-eslint/no-empty-function': 0,
    'vue/order-in-components': 0,
    'vue/multi-word-component-names': 0,
    'vue/attributes-order': 0,
  },
}
