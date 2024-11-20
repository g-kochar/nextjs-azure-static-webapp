/** @type {import('prettier').Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './config/tailwind/index.ts',

  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 120,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,

  overrides: [
    {
      files: [
        'src/**/constants.ts',
        'src/**/types.ts',
        'src/constants/**/*.ts',
        'src/utils/**/*.ts',
        'typings/**/*.d.ts'
      ],
      options: { printWidth: 140 }
    }
  ]
};

export default config;
