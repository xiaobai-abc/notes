import { createApp } from "vue";
import App from "./App.vue";

import { setupRouter, router } from "@/router";
import { setupRouterGuard } from "@/router/guard";
import { setupStore } from "@/store";
// import { setUpPackages } from "../packages";

import "@/style/index.less";

// import "@/mock/index.js";

function bootstrap() {
  const app = createApp(App);

  setupStore(app); //注册pinia

  // 配置路由
  setupRouter(app);

  // 设置路由 路由守卫
  setupRouterGuard(router);

  app.mount("#app");
}

bootstrap();
