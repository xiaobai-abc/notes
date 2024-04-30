import { usePermissionStore } from "@/store/permission.js";
import { PageNotFoundName } from "@/router/constant.js";
import { PAGE_NOT_FOUND_ROUTE } from "@/router/routes/basic.js";
import { asyncRoutes } from "../routes/index";

// 设置路由
export async function createPermissionGuard(router) {
  const permissionStore = usePermissionStore();
  router.beforeEach(async (to, from, next) => {


    if (permissionStore.getDynamicAddedRoute) {
      next();
      return;
    }

    const routes = permissionStore.buildRoutesAction();

    routes.forEach((route) => {
      router.addRoute(route);
    });

    router.addRoute(PAGE_NOT_FOUND_ROUTE);

    permissionStore.setDynamicAddedRoute(true);

    if (to.name === PageNotFoundName) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      next({
        path: to.fullPath,
        replace: true,
        meta: to.meta,
        query: to.query,
      });
    }
  });
}
