import { isObject, isReactive } from '@vue/shared';

const reactiveMap = new WeakMap();

const mutableHandlers: ProxyHandler<any> = {
  get(target, key, receiver) {
    //如果已经被代理过了，返回true配合createReactiveObject验证是否已被代理
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }
  },
  set(target, key, value, receiver) {
    return true;
  },
};

//记录代理的结果的枚举
enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
}

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
