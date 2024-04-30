import { LAYOUT } from "../constant";
import { h } from "vue";
import { IconFileImage } from "@arco-design/web-vue/es/icon";

export default {
  path: "/test",
  name: "Test",
  // redirect: "/dashboard/index",
  component: LAYOUT,
  meta: {
    title: "测试",
    icon: () => {
      return h(IconFileImage, { size: "18px" });
    },
  },
  order: 2,
  children: [
    {
      path: "index",
      name: "TestIndex",
      meta: {},
      component: () => import("@/pages/test/index.vue"),
    },
  ],
};
