'use client';

import type { Nullable } from '@/types';
import { isObjectLike } from '.';

export function scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
  return (el: Nullable<HTMLElement>) =>
    void (isObjectLike(el) && typeof el.scrollIntoView === 'function' && el.scrollIntoView(arg));
}
