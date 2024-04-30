import { LAYOUT } from "../constant";
import { h } from "vue";
import { IconFileImage } from "@arco-design/web-vue/es/icon";

export default {
  path: "/case",
  name: "Case",
  // redirect: "/dashboard/index",
  component: LAYOUT,
  meta: {
    title: "案例",
    icon: () => {
      return h(IconFileImage, { size: "18px" });
    },
  },
  order: 2,
  children: [
    {
      path: "index",
      name: "CaseIndex",
      meta: {},
      component: () => import("@/pages/case/swiper.vue"),
    },
  ],
};
