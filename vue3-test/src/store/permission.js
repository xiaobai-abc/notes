import { defineStore } from "pinia";
import { deepClone } from "@/utils/lib.js";
import { eachTree } from "@/utils/helper/index";
import { asyncRoutes } from "@/router/routes";

// 存储 路由 权限 菜单列表
export const usePermissionStore = defineStore("app-permission", {
  state: () => ({
    routeList: [], //所有的路由列表 包含父子级  用来区别当前路由是否包含子路由
    frontMenuList: [], // 菜单列表
    hasDynamicAddedRoute: false, //路由追加完成
    lastUpdateTime: 0,
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
    transformRouteToMenu(routes) {
      // 存储路由列表
      this.routeList = routes;

      if (!Array.isArray(routes)) {
        console.warn("路由不是数组");
        return;
      }

      let result = [];

      const deepTree = (treeData, callback) => {
        const data = treeData.map((element) => {
          const newParent = callback(element) || element;
          if (Array.isArray(newParent.children) && newParent.children.length) {
            newParent.children = deepTree(newParent.children, callback);
          }
          return newParent;
        });
        return data;
      };
      result = deepTree(routes, (route) => {
        const block = {
          label: route.meta?.title,
          path: route.path,
          name: route.name,
          icon: route.meta?.icon,
          order: route.order,
        };
        if (route.children?.length == 1 && route.children[0]) {
          const now = route.children[0];
          block.path = `${route.path}/${now.path}`;
          block.full = now.path;
        }
        return block;
      });
      result.sort((a, b) => a.order - b.order);
      this.frontMenuList = result;
    },
    // 根据路由权限生成对应路由
    buildRoutesAction() {
      const routesList = deepClone(asyncRoutes);
      this.transformRouteToMenu(deepClone(routesList));
      return routesList;
    },
  },
});
