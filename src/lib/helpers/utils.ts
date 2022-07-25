import { getContext } from "svelte";
import { writable } from "svelte/store";
import type Toaster from '$lib/components/generic/Toaster.svelte';

export function groupBy<T, K extends string, U = null>
(arr: T[], keyFn: (i: T) => K, mapFn?: (i: T) => U) {

return arr.reduce<{[KV in K]?: (U extends null ? T : U)[] }>((acc, item) => {
  const key = keyFn(item);
  acc[key] = acc[key] || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  acc[key]?.push(!mapFn ? item as any: mapFn(item));
  return acc;
}, {});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compareDeep(a: any, b: any) {
  if (a === b) return true;
  if (!(a && typeof a == "object") ||
      !(b && typeof b == "object")) return false;
  const array = Array.isArray(a);
  if (Array.isArray(b) != array) return false;
  if (array) {
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++) if (!compareDeep(a[i], b[i])) return false;
  } else {
    for (const p in a) if (!(p in b) || !compareDeep(a[p], b[p])) return false;
    for (const p in b) if (!(p in a)) return false;
  }
  return true;
}

export function slugify(text: string, maxLen = 40) {
  return (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, maxLen);
}

export function createLookup<T, U extends string, Y = never>
(
  arr: T[],
  keyFn: (d: T) => U | U[],
  valFn?: (d: T) => Y
) {
  type R = [Y] extends [never] ? T : Y
  const lookup: {[key in U]?: R} = {};
  const _valFn = (valFn ?? (d=>d)) as (d: T) => R;

  arr.forEach(d => {
    const key = keyFn(d);
    if (typeof key === 'string') {
      lookup[key] = _valFn(d);
    } else {
      key.forEach(k => lookup[k] = _valFn(d));
    }

  });

  return lookup;
}

export const textOnlyPaste = (el: HTMLElement) => {
  el.addEventListener('paste', e => {
    const { clipboardData } = e;
    const paste = clipboardData?.getData('text').replace(/\n/g, ' ');
    document.execCommand("insertText", false, paste);
    e.preventDefault();
  });
};

export const addFocusClass = (node: HTMLElement, cb: (focused: boolean) => void = () => null) => {
  const focus = () => {
    node.classList.add('focused');
    cb(true);
  };
  const blur = () => {
    node.classList.remove('focused');
    cb(false);
  };

  node.addEventListener('focus', focus);
  node.addEventListener('blur', blur);

  return {
    destroy() {
      node.removeEventListener('focus', focus);
      node.removeEventListener('blur', blur);
    }
  };
};

export function clickOutside(node: HTMLElement, fn: () => void) {
  const handleClick = (e: MouseEvent) => {
    if (!node.contains(e.target as Node)) {
      fn();
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}

export const timedBoolean = () => {
  let timeout: number;
  const value = writable(false);
  const obj = {
    value,
    start: (ms: number) => {
      value.set(true);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => value.set(false), ms);
    },
    stop: () => {
      value.set(false);
      window.clearTimeout(timeout);
    }
  };
  return obj;
};

export const imgLoadingStatus = (node: HTMLImageElement, cb: (loading: boolean) => void) => {;
  node.addEventListener('load', () => cb(false));
  cb(!node.complete);
  new MutationObserver(() => cb(!node.complete))
    .observe(node,{attributes:true,attributeFilter:["src"]});
};

export function insertInTextArea(text: string, el: HTMLInputElement) {
  const [start, end] = [el.selectionStart, el.selectionEnd];
  el.setRangeText(text, Number(start), Number(end), 'select');
  el.setSelectionRange(Number(start) + text.length, Number(start) + text.length);
}

export function getToaster() {
  return getContext<Toaster['$$prop_def']['addMessage']>('addToastMessage');
}

// ************************
//     TypeScript util
// ************************

export type ExpandRecursively<T> = T extends object
  ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
  : T;
export type Unpacked<T> = T extends (infer U)[] ? U : T;
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
export type Modify<T, R> = Expand<Omit<T, keyof R> & R>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

type Cast<A, B> = A extends B ? A : B;

type Narrowable = string | number | boolean | bigint;

export type Exact<A, W = unknown> =
W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
{[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
{[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
: never;