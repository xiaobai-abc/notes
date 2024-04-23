import { LAYOUT } from "../constant";
import { h, setBlockTracking } from "vue";
import { IconFileImage } from "@arco-design/web-vue/es/icon";

const dashboard = {
  path: "/map",
  name: "Map",
  // redirect: "/dashboard/index",
  component: LAYOUT,
  meta: {
    title: "地图",
    icon: () => {
      return h(IconFileImage, { size: "18px" });
    },
  },
  order: 2,
  children: [
    {
      path: "index",
      name: "MapIndex",
      meta: {},
      component: () => import("@/pages/map/index.vue"),
    },
  ],
};

export default dashboard;
