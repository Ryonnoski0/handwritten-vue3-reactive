export function effect(fn: Function, options?) {
  //创建响应式effect,数据变化重新执行

  //创建一个effect，依赖的属性变化了就要执行回调
  const _effect = new ReactiveEffect(fn, () => {
    _effect.run();
  });
  _effect.run();
  return _effect;
}

export const trackEffect = (effect, dep) => {
  dep.set(effect, effect._trackId++);
  effect.deps[effect._depsLength++] = dep;
};

export let activeEffect: ReactiveEffect | undefined;
class ReactiveEffect {
  //记录当前effect执行了几次
  private _trackId = 0;

  //是否需要响应式的effect
  private active = true;

  // fn 用户编写的函数
  private fn: Function;

  // 记录存放了哪些依赖
  private deps: Set<ReactiveEffect> = new Set();

  // 调度器
  private scheduler: Function | undefined;

  // 收集个数
  private _depsLength = 0;

  //如果fn中依赖的数据变化了需要重新调用run
  constructor(fn: Function, scheduler: Function) {
    this.fn = fn;
    this.scheduler = scheduler;
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let lastEffect = activeEffect;
    try {
      activeEffect = this;
      return this.fn(); //依赖收集自己
    } finally {
      activeEffect = lastEffect;
    }
  }
}

export function triggerEffect(dep) {
  for (const effect of dep.keys()) {
    console.log(effect.scheduler);
    if (effect.scheduler) {
      effect.scheduler();
    }
  }
}
