import { LAYOUT } from "../../constant";

const dashboard = {
  path: "/dashboard",
  name: "Dashboard",
  redirect: "/dashboard/index",
  component: LAYOUT,
  meta: {
    title: "主页",
  },
  children: [
    {
      path: "index",
      name: "DashboardDetail",
      meta: {
        title: "展示",
      },
      component: () => import("@/pages/dashboard/index.vue"),
    },
  ],
};

export default dashboard;
