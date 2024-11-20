import type { ThemeColorPalette } from '@config/types';

const colorPalette: ThemeColorPalette = {
  alto: 'rgb(var(--theme-color-alto) / var(--tw-text-opacity, 1))',
  athensGray: 'rgb(var(--theme-color-athens-gray) / var(--tw-text-opacity, 1))',
  black: 'rgb(var(--theme-color-black) / var(--tw-text-opacity, 1))',
  docBody: 'rgb(var(--theme-color-doc-body) / var(--tw-text-opacity, 1))',
  inherit: 'rgb(var(--theme-color-inherit))',
  primary: {
    DEFAULT: 'rgb(var(--theme-color-primary) / var(--tw-text-opacity, 1))',
    dark: 'rgb(var(--theme-color-primary-dark) / var(--tw-text-opacity, 1))',
    light: 'rgb(var(--theme-color-primary-light) / var(--tw-text-opacity, 1))'
  },
  secondary: {
    DEFAULT: 'rgb(var(--theme-color-secondary) / var(--tw-text-opacity, 1))',
    dark: 'rgb(var(--theme-color-secondary-dark) / var(--tw-text-opacity, 1))',
    light: 'rgb(var(--theme-color-secondary-light) / var(--tw-text-opacity, 1))',
  },
  textPrimary: 'rgb(var(--theme-color-text-primary) / var(--tw-text-opacity, 1))',
  transparent: 'rgb(var(--theme-color-transparent) / var(--tw-text-opacity, 1))',
  white: 'rgb(var(--theme-color-white) / var(--tw-text-opacity, 1))'
};

export default colorPalette;
