import { LAYOUT } from "../constant";

const dashboard = {
  path: "/kill-pig",
  name: "kill-pig",
  component: LAYOUT,
  meta: {
    title: "上传"
  },
  children: [
    {
      path: "index",
      name: "kill-pig-index",
      meta: {
        title: "展示"
      },
      component: () => import("@/pages/kill-pig/index.vue")
    }
  ]
};

export default dashboard;
