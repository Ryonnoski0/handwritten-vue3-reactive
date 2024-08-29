import { track, trigger } from './reactiveEffect';

//记录代理的结果的枚举
export enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
}

export const mutableHandlers: ProxyHandler<any> = {
  get(target, key, receiver) {
    //如果已经被代理过了，返回true配合createReactiveObject验证是否已被代理
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }
    // 取值的时候需要让响应式属性和effect映射起来

    // 实现依赖收集
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    let oldValue = target[key];
    // console.log('oldValue', value);
    const res = Reflect.set(target, key, value, receiver);
    // 如果新老值不同，需要运行依赖他的方法
    if (oldValue !== value) {
      // 值发生了变化，需要通知effect
      trigger(target, key, value, oldValue);
    }
    // 找到属性 更新依赖函数
    return res;
  },
};
