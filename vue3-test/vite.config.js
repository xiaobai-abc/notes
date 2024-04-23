import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import postcssPresetEnv from "postcss-preset-env";
import Inspect from "vite-plugin-inspect";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import browserslist from "browserslist";
import legacy from "@vitejs/plugin-legacy";
import { ArcoResolver } from "unplugin-vue-components/resolvers"; //按需引入组件
import { vitePluginForArco } from "@arco-plugins/vite-vue";

// 浏览器版本配置
const browserslistConfig = browserslist.loadConfig({ path: "." });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
    vitePluginForArco({
      style: "css",
    }),
    Inspect(),
    legacy({
      targets: browserslistConfig, //需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      renderLegacyChunks: true,
      polyfills: [
        "es.symbol",
        "es.array.filter",
        "es.promise",
        "es.promise.finally",
        "es/map",
        "es/set",
        "es.array.for-each",
        "es.object.define-properties",
        "es.object.define-property",
        "es.object.get-own-property-descriptor",
        "es.object.get-own-property-descriptors",
        "es.object.keys",
        "es.object.to-string",
        "web.dom-collections.for-each",
        "esnext.global-this",
        "esnext.string.match-all",
      ],
    }),
  ],
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
    },
    preprocessorOptions: {
      less: {
        globalVars: {},
        devSourcemap: true, //开启css 文件索引 可以查看代码
        charset: false,
        // additionalData: `@import "${path.resolve(
        //   __dirname,
        //   "src/style/variable.less"
        // )}";`,
      },
    },
    postcss: {
      plugins: [postcssPresetEnv()],
    },
  },
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
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-chunk-[hash].js",
        assetFileNames: "css/[name]-[hash][extname]",
      },
    },
  },
  server: {
    // ← ← ← ← ← ←
    host: "0.0.0.0", // ← 新增内容 ←
    // https : true,
    open: false,
    port: 5179,
  },
});