import { reactive } from '@vue/reactivity';

export function isObject(obj: any) {
  return typeof obj === 'object' && obj !== null;
}
export function isReactive(obj: any) {}
