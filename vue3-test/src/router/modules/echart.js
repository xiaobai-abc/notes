import { LAYOUT } from "../constant";
import { h, setBlockTracking } from "vue";
import { IconFileImage } from "@arco-design/web-vue/es/icon";

const dashboard = {
  path: "/echart",
  name: "Mchart",
  // redirect: "/dashboard/index",
  component: LAYOUT,
  meta: {
    title: "图表地图",
    icon: () => {
      return h(IconFileImage, { size: "18px" });
    },
  },
  order: 2,
  children: [
    {
      path: "index",
      name: "EchartIndex",
      meta: {},
      component: () => import("@/pages/echart/index.vue"),
    },
  ],
};

export default dashboard;
