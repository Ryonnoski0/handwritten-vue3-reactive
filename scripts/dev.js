//打包packages下的模块，输出js

//node dev.js 包名字 -f 格式
import minimist from "minimist";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import esbuild from "esbuild";

const args = minimist(process.argv.slice(2));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const target = args._[0] || "reactivity"; //打包的项目
const format = args.f || "iife"; //打包后的模块规范
const pkg = require(`../packages/${target}/package.json`);

const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);
console.log(entry);

esbuild
    .context({
        entryPoints: [entry],
        bundle: true,
        outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),
        format,
        sourcemap: true,
        platform: "browser",
        define: {
            "process.env.NODE_ENV": '"production"',
        },
        globalName: pkg.buildOptions?.name,
    })
    .then((ctx) => {
        console.log(`${target} 已打包成功`);

        return ctx.watch();
    });
