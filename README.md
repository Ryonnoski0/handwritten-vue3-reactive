### 手写vue3响应式

安装依赖

```bash
pnpm i
```

### 调试方式

1. 运行pnpm run dev (此方法会调用node scripts/dev.js reactivity -f esm，如有需要可以更改scripts/dev.js打包脚本)
2. 用node的http server或者插件等方式运行dist中的html文件，如果没有自行创建
