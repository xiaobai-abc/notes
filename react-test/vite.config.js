import { defineConfig } from "vite";
// import react from '@vitejs/plugin-react'
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import postcssPresetEnv from "postcss-preset-env";
import browserslist from "browserslist";
import { vitePluginForArco } from "@arco-plugins/vite-react";

// 浏览器版本配置
const browserslistConfig = browserslist.loadConfig({ path: "." });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginForArco(),
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
      "@": resolve(__dirname, "./src"),
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
        additionalData: `@import "${resolve(
          __dirname,
          "src/style/variable.less"
        )}";`,
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
      plugins: [],
    },
  },
});
