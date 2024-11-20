'use client';

import { createTheme } from '@mui/material/styles';
import breakpointValues from './tailwind/breakpoints';
import colorPalette from './tailwind/color-palette';
import fontFamily from './tailwind/font-family';

export const UITheme = createTheme({
  breakpoints: {
    values: breakpointValues
  },
  components: {
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'inherit'
      }
    }
  },
  palette: {
    alto: colorPalette.alto,
    athensGray: colorPalette.athensGray,
    black: colorPalette.black,
    common: {
      black: colorPalette.black,
      white: colorPalette.white
    },
    docBody: colorPalette.docBody,
    inherit: colorPalette.inherit,
    primary: {
      dark: colorPalette.primary.dark,
      main: colorPalette.primary.DEFAULT,
      light: colorPalette.primary.light
    },
    secondary: {
      dark: colorPalette.secondary.dark,
      main: colorPalette.secondary.DEFAULT,
      light: colorPalette.secondary.light
    },
    transparent: colorPalette.transparent,
    white: colorPalette.white
  },
  shape: {
    borderRadius: 4
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  typography: {
    fontFamily: fontFamily.base.join(','),
    fontSize: 16,
  }
});
