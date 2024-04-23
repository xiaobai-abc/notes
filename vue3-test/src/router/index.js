import { createRouter, createWebHistory } from "vue-router";

import { basicRoutes } from "./routes";

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST = [];
const getRouteNames = (array) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);

/**
 * RouteRecordRaw  vueTS 的泛型 用于声明 路由配置的地方
 */

// 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes: basicRoutes, // `routes: routes` 的缩写
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
// 配置路由器
export function setupRouter(app) {
  app.use(router);
}
