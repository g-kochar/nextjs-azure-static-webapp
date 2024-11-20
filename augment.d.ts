import '@mui/material/styles';

declare module '@mui/material/styles' {
  export interface BreakpointOverrides {
    xxs: true;
    xs: false;
    xs1: true;
    xs2: true;
    sm: true;
    ip6: true; // iPad 6th gen or earlier
    md: true;
    lg: true;
    xl: true;
  }
}

declare module '@mui/material/styles/createPalette' {
  export interface Palette {
    /** `#dddddd` */
    alto: string;
    /** `#f5f7f9` */
    athensGray: string;
    /** `#000000` */
    black: string;
    /** `#f5f7f9` */
    docBody: string;
    /** `inherit` */
    inherit: string;
    /** `transparent` */
    transparent: string;
    /** `#ffffff` */
    white: string;
  }

  export interface PaletteOptions {
    alto: string;
    athensGray: string;
    black: string;
    docBody: string;
    inherit: string;
    transparent: string;
    white: string;
  }
}
