import { LAYOUT } from "../constant";

export default {
  path: "/classify",
  name: "Classify",
  element: <LAYOUT></LAYOUT>,
  order: 2,
  children: [
    {
      path: "three",
      element: () => import("@/pages/classify/three"),
      meta: {
        label: "three3d 测试",
      },
    },
    {
      path: "index",
      element: () => import("@/pages/classify"),
      meta: {
        label: "首项",
      },
    },
    {
      path: "other",
      element: () => import("@/pages/classify/other"),
      meta: {
        label: "其他",
      },
    },
  ],
  meta: {
    label: "分类",
  },
};
