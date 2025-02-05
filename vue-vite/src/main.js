import { createApp } from "vue";
import App from "./App.vue";
import "@/style/index.less";

import { setupRouter, router } from "@/router";
import { setupRouterGuard } from "@/router/guard";
import { setupStore } from "@/store";

// import VueLazyLoad from "vue-lazyload";

function bootstrap() {
  const app = createApp(App);

  // setupNProgress(); //加载进度条

  setupStore(app); //注册pinia

  // 配置路由
  setupRouter(app);

  // 设置路由
  setupRouterGuard(router);

  app.mount('#app');
}

bootstrap();
