import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    settings: { react: { version: '18.3' } },
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylisticTypeChecked, prettierConfig],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      "prettier/prettier": [
            "error",
            {
              endOfLine: 'auto',
              trailingComma: 'es5',
              singleQuote: true,
              semi: true,
              useTabs: false,
              tabWidth: 2,
              trailingComma: 'all',
            }
          ],
      "@typescript-eslint/no-unsafe-assignment": 0,
      "@typescript-eslint/no-unsafe-call": 0,
      "@typescript-eslint/no-floating-promises": 0,
      "@typescript-eslint/no-unsafe-member-access": 0,
    },
  },
)
