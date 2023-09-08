/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'arrow-body-style': 'off',
    // 关闭组件命名规则
    'vue/multi-word-component-names': 'off',
    semi: [2, 'never'],
    quotes: [2, 'single'],
    eqeqeq: ['error'],
    'default-case': 2,
    'key-spacing': [2, { beforeColon: false, afterColon: true }], // 对象字面量中冒号的前后空格
    'object-curly-spacing': [2, 'always']
  }
}
