import { isObject } from '@vue/shared';
import { ReactiveFlags, mutableHandlers } from './baseHandler';
const reactiveMap = new WeakMap();

function createReactiveObject(target: any) {
  // 响应式对象必须是对象
  if (!isObject(target)) {
    return target;
  }
  const exitsProxy = reactiveMap.get(target);
  // 创建响应式对象不能被代理
  if (exitsProxy) {
    return exitsProxy;
  }
  //响应式对象不能被响应式
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target;
  }
  const proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}

export function reactive(target: any) {
  return createReactiveObject(target);
}
