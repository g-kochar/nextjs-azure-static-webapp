import { UITheme } from '@config/theme';
import type { ThemeColorPalette } from '@config/types';
import { isNil, isNotNil, isString } from '@lib';
import { loadClientConfigurationAsync } from '@lib/load-client-configuration';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import '@ui/global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: ''
};

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>): Promise<React.ReactElement | null> {
  const { colorPalette, i18n } = await loadClientConfigurationAsync();

  if (isNil(colorPalette)) {
    return (
      <html>
        <body />
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        {isNotNil(i18n) && <title>{i18n.documentTitle.generic}</title>}
        <style type="text/css">{`
          :root {
            ${colorPaletteToThemeCssVars(colorPalette)}
          }
      `}</style>
      </head>

      <body className="font-base print:!hidden">
        <AppRouterCacheProvider>
          <ThemeProvider theme={UITheme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

function colorPaletteToThemeCssVars(palette: ThemeColorPalette): string {
  return (Object.keys(palette) as Array<keyof typeof palette>)
    .map((color) => {
      const value = palette[color];
      if (isString(value)) {
        const cssVar = color.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        return `--theme-color-${cssVar}: ${value}`;
      }
      return (Object.keys(value) as Array<keyof typeof value>)
        .map(
          (colorVariant) =>
            `--theme-color-${color}${colorVariant === 'DEFAULT' ? '' : `-${colorVariant}`}: ${value[colorVariant]}`
        )
        .join(';\n');
    })
    .join(';\n');
}
