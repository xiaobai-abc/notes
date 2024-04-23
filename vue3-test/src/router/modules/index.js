import { LAYOUT } from "../constant";
import { h, setBlockTracking } from "vue";
import { IconFileImage } from "@arco-design/web-vue/es/icon";

const dashboard = {
  path: "/dashboard",
  name: "Dashboard",
  // redirect: "/dashboard/index",
  component: LAYOUT,
  meta: {
    title: "主页",
    icon: () => {
      return h(IconFileImage, { size: "18px" });
    },
  },
  order: 1,
  children: [
    {
      path: "index",
      name: "DashboardDetail",
      meta: {},
      component: () => import("@/pages/dashboard/index.vue"),
    },
  ],
};

export default dashboard;
