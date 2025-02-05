import { LAYOUT } from "../constant";

const dashboard = {
  path: "/upload",
  name: "Upload",
  component: LAYOUT,
  meta: {
    title: "上传"
  },
  children: [
    {
      path: "index",
      name: "UploadIndex",
      meta: {
        title: "展示"
      },
      component: () => import("@/pages/upload/index.vue")
    }
  ]
};

export default dashboard;
