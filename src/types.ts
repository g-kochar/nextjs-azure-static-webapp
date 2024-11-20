import type { ThemeColorPalette } from '@config/types';

export declare interface ClientConfiguration {
  readonly colorPalette: Readonly<ThemeColorPalette>;
  readonly i18n: I18N;
  readonly logo: { readonly src: string };
}

export declare type ClientID = 'sienna' | 'sigmail';

export declare type HtmlDivElementProps = React.ComponentPropsWithRef<'div'>;
export declare type HtmlFormElementProps = React.ComponentPropsWithRef<'form'>;
export declare type HtmlOListElementProps = React.ComponentPropsWithRef<'ol'>;
export declare type HtmlUListElementProps = React.ComponentPropsWithRef<'ul'>;

export declare type ExcludeArray<T> = Exclude<T, Array<unknown> | ReadonlyArray<unknown>>;
export declare type ExcludeFunction<T> = Exclude<T, (...args: Array<any>) => unknown>;
export declare type ExtractArray<T> = Extract<T, Array<unknown> | ReadonlyArray<unknown>>;
export declare type ExtractFunction<T> = Extract<T, (...args: Array<any>) => unknown>;

export declare namespace FormsI18N {
  export interface AiAssistForm {
    readonly action: ReadonlyRecord<'submit', Readonly<{ label: string }>>;
    readonly fieldset: {
      readonly query: {
        readonly formField: ReadonlyRecord<'query', InputI18N>;
      };
    };
  }

  export interface SignIn {
    readonly action: ReadonlyRecord<'submit', Readonly<{ label: string }>>;
  }
}

export declare interface I18N {
  readonly documentTitle: ReadonlyRecord<'generic' | 'login', string>;
  readonly form: {
    readonly aiAssist: FormsI18N.AiAssistForm;
    readonly signIn: FormsI18N.SignIn;
  };
  readonly heading1: Partial<ReadonlyRecord<`${'home' | 'login'}Page`, string>>;
  readonly heading2: Partial<ReadonlyRecord<`${'home' | 'login'}Page`, string>>;
}

export declare interface InputI18N {
  readonly label: string;
  readonly placeHolder?: string;
}

export declare type Nullable<T> = T | null | undefined;

export declare interface QuestionAnswerDataItem {
  readonly answer: ReadonlyArray<string>;
  readonly comment?: readonly [timestamp: number, comment: string];
  readonly disliked?: number;
  readonly liked?: number;
  readonly question: string;
  readonly responseTime: number;
  readonly sources: ReadonlyArray<string>;
}

export declare type ReadonlyRecord<K extends keyof any, V> = Readonly<Record<K, V>>;

export declare type Writeable<T> = {
  -readonly [K in keyof T]: T[K];
};
