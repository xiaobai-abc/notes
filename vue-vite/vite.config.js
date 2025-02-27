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

// Inspect https://github.com/antfu/vite-plugin-inspect
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Inspect(),
    AutoImport({
      resolvers: [ArcoResolver()]
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    }),
    vitePluginForArco({
      style: "css"
    }),
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
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    modules: {},
    postcss: {
      plugins: [postcssPresetEnv()],
    },
    preprocessorOptions: {
      less: {
        globalVars: {
          //全局变量
        },
        devSourcemap: true, //开启css 文件索引 可以查看代码
        charset: false,
        // additionalData: `@import "${path.resolve(
        //   __dirname,
        //   // "src/style/variable.less"
        // )}";`,
      },
    },
  },
  build: {
    //分包策略
    rollupOptions: {
      output: {
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-chunk-[hash].js",
        assetFileNames: "css/[name]-[hash][extname]",
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  envPrefix: ["VITE_", "APP_"],
  // base: "/pubDist/", //打包路径
  server: {
    // ← ← ← ← ← ←
    host: "0.0.0.0", // ← 新增内容 ←
    // https : true,
    open: false,
    port: 5174,
  },
  // envDir: "./env",
});
