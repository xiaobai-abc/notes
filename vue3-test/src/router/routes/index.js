import { PAGE_NOT_FOUND_ROUTE, ERROR_LOG_ROUTE } from "./basic";
// import { TestPage } from "./other";

// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob("../modules/**/*.js", { eager: true });
const routeModuleList = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key]?.default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [...routeModuleList];
 
// export const LoginRoute = {
//   path: "/login",
//   name: "Login",
//   component: () => import("@/pages/login/index.vue"),
//   meta: {
//     title: "登陆",
//     ignoreAuth: true,
//   },
// };

// 根路由
export const RootRoute = {
  path: "/",
  name: "Root",
  redirect: "/dashboard",
  meta: {
    title: "Root",
  },
};

export const basicRoutes = [
  // LoginRoute,
  RootRoute,
  // TestPage,
  PAGE_NOT_FOUND_ROUTE,
  // ERROR_LOG_ROUTE,
];
