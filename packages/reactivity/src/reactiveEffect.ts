import { activeEffect, trackEffect, triggerEffect } from './effect';

const targetMap = new WeakMap(); //存放依赖收集的关系

export const createDep = (cleanup, key) => {
  const dep = new Map();
  return dep;
  // dep.cleanup = cleanup;
};

export function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);

    if (!dep) {
      depsMap.set(key, (dep = createDep(() => depsMap.delete(key), key)));
    }
    trackEffect(activeEffect, dep);
    // console.log(targetMap);
  }
}

export function trigger(target, key, value, oldValue) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const dep = depsMap.get(key);
  triggerEffect(dep);
}
