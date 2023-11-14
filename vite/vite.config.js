import { defineConfig, loadEnv } from "vite";
import path from "path";
import postcssPresetEnv from "postcss-preset-env";

/**
 *  commonjs 规范 注入变量
 *  exports =  module.exports = {}
 *  (function (exports,require,module,__filename,__dirname){
 *  }())
 *
 * 必须按需导入  tree shaking  摇树优化
 *
 */

// 可本地部署 dist文件  npx vite preview
// npm vite preview

export default defineConfig(({ command, mode }) => {
  // vite-aliases
  //command ==> serve build
  // mode development  production
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), "");

  return {
    envPrefix: "ENV_", //.env 文件 注入import.meta.env 里的字段 添加前缀
    resolve: {
      alias: {
        //__dirname 始终返回的是当前文件所在目录
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      modules: {
        //最终丢给 postcss module 配置
        localsConvention: "camelCase", //把-连接 变成 驼峰 类名
        //  camelCaseOnly 只展示驼峰
        scopeBehaviour: "local", //global 关闭module 模块css local 打开模块 css
        // generateScopedName : "[name]_[local]_[hash:5]", //定义模块名称
        generateScopedName: (name, filename, css) => {
          //name 就是 css 文件中的类名
          // filename css 文件的绝对路径
          // css 当前的样式
          return `${name}_${parseInt(Math.random())}`;
        },
        hashPrefix: "hello", //大概就是生成的哈希除去完全一样  其他都会完全规避
        globalModulePaths: ["./xxx/xxx.css"], //代表不希望进行模块化的路径
      },
      preprocessorOptions: {
        less: {
          globalVars: {
            //全局变量
            mainColor: "red", //配置全局变量
          },
          devSourcemap: true, //开启css 文件索引 可以查看代码
        },
      },
      postcss: {
        plugins: [postcssPresetEnv()],
      },
    },
    // build: {    //分包策略
    //   rollupOptions: {
    //     manualChunks: (id) => {
    //       if (id.includes("node_modules")) {
    //         return "vendor";
    //       }
    //     },
    //   },
    // },
    build: {
      //分包策略
      rollupOptions: {
        manualChunks: (id) => {
          // console.log("id ---------- ", id);
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        input: {
          index: path.resolve("index.html"),
          news: path.resolve("news.html"),
        },
        output: {
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-chunk-[hash].js',
          assetFileNames: 'css/[name]-[hash][extname]'
        }
      },
    },
  };
});
