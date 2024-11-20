export declare type ThemeBreakpoint = Record<'xxs' | `xs${1 | 2}` | 'sm' | 'ip6' | 'md' | 'lg' | 'xl', number>;

export declare interface ThemeColorPalette {
  alto: string;
  athensGray: string;
  black: string;
  docBody: string;
  inherit: string;
  primary: Readonly<Record<'DEFAULT' | 'dark' | 'light', string>>;
  secondary: Readonly<Record<'DEFAULT' | 'dark' | 'light', string>>;
  textPrimary: string;
  transparent: string;
  white: string;
}

export declare type ThemeFontFamily = Record<`base${'' | 'Black' | 'Medium'}`, Array<string>>;
