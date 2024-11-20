import type { ExcludeArray, ExcludeFunction } from '@/types';

export const isArray = <T>(value?: unknown): value is Array<T> | ReadonlyArray<T> => Array.isArray(value);
export const isInteger = (value?: number): value is number => Number.isInteger(value);
export const isNil = (value?: unknown): value is null | undefined => value == null;
export const isNotNil = <T>(value?: T): value is NonNullable<T> => !isNil(value);
export const isNumber = (value?: number): value is number => Number.isFinite(value);

export const isObjectLike = (value?: unknown): value is ExcludeArray<ExcludeFunction<NonNullable<typeof value>>> =>
  isNotNil(value) && !isArray(value) && typeof value === 'object';

export const isString = (value?: unknown): value is string => typeof value === 'string';

export const strOrDefault = <T extends string = string>(...args: [value: unknown, defaultValue?: string]): T =>
  (isString(args[0]) ? args[0] : args.length < 2 ? '' : args[1]) as T;

export const trimOrDefault = <T extends string = string>(...args: Parameters<typeof strOrDefault>): T =>
  (isString(args[0]) ? args[0].trim() : args.length < 2 ? '' : args[1]) as T;
