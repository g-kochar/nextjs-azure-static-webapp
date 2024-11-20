/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: './config/tailwind',
    autoprefixer: {}
  }
};

export default config;
