import { defineStore } from "pinia";
import { deepClone } from "@/utils/lib.js";
import { asyncRoutes } from "@/router/routes";
import { useUserStore } from "./user";

// 存储 路由 权限 菜单列表
export const usePermissionStore = defineStore("app-permission", {
  state: () => ({
    // 权限代码列表
    permCodeList: [0, 1],
    // 菜单列表
    frontMenuList: [],
    hasDynamicAddedRoute: false, //路由追加完成
  }),
  getters: {
    getDynamicAddedRoute(state) {
      return state.hasDynamicAddedRoute;
    },
  },
  actions: {
    setDynamicAddedRoute(boo) {
      this.hasDynamicAddedRoute = boo;
    },
    transformRouteToMenu() {},
    // 根据路由权限生成对应路由
    buildRoutesAction() {
      const userStore = useUserStore();
      const roleList = userStore.getRoleList;
      const routesList = deepClone(asyncRoutes);

      return routesList;
    },
  },
});
