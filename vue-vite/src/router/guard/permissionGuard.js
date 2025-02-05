import { BASEHOE } from "@/config.js";
import { useUserStore } from "@/store/user.js";
import { usePermissionStore } from "@/store/permission.js";
import { PageNotFoundName } from "@/router/constant.js";
import { PAGE_NOT_FOUND_ROUTE } from "@/router/routes/basic.js";

// 设置路由
export async function createPermissionGuard(router) {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  const token = userStore.getToken;
  router.beforeEach(async (to, from, next) => {
    // if (!token) {
    //   next({ path: "/login", replace: true });
    //   return;
    // }

    // Jump to the 404 page after processing the login
    if (
      from.path === "/login" &&
      to.name === "PageNotFound" &&
      to.fullPath !== BASEHOE
    ) {
      next(BASEHOE);
      return;
    }

    // get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction();
      } catch (error) {
        next();
        return;
      }
    }

    if (permissionStore.getDynamicAddedRoute) {
      next();
      return;
    }

    const routes = permissionStore.buildRoutesAction();
    // console.log("routes", routes);

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
