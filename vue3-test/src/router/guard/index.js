import { createPermissionGuard } from "./permissionGuard";

export function setupRouterGuard(router) {
  // 动态添加路由
  createPermissionGuard(router);
  createPageGuard(router); //注册路由守卫
}

function createPageGuard(router) {
  // const loadedPageMap = new Map();

  router.beforeEach(async (to) => {
    return true;
  });

  router.afterEach((to) => {});
}
