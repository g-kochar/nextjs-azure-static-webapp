import type { Writeable } from '@/types';
import type { Config } from 'tailwindcss';
import breakpoints from './breakpoints';
import colors from './color-palette';
import fontFamily from './font-family';

const [backgroundColor, borderColor, ringColor] = ['bg', 'border', 'ring'].map((k) =>
  Object.fromEntries(
    Object.entries(colors).map(([color, value]): [string, string | { [K: string]: string }] => {
      if (typeof value === 'string') {
        return [color, value.replace('--tw-text', `--tw-${k}`)];
      }

      return [
        color,
        Object.fromEntries(Object.entries<string>(value).map(([c, v]) => [c, v.replace('--tw-text', `--tw-${k}`)]))
      ];
    })
  )
);

const screens = Object.fromEntries(Object.entries(breakpoints).map(([key, value]) => [key, `${value}px`]));

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}'],
  theme: {
    backgroundColor,
    borderColor,
    colors: colors as Writeable<typeof colors>,
    extend: {
      maxHeight: {
        maxBox: 'var(--theme-box-height-max, 90vh)'
      },
      spacing: {
        gutter: '1.5rem',
        'gutter-1/2': '0.75rem'
      }
    },
    fontFamily,
    ringColor,
    screens
  }
};

export default config;
