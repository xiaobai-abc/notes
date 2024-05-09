import { LAYOUT } from "../constant";

export default {
  path: "/timing",
  name: "Timing",
  order: 3,
  element: <LAYOUT></LAYOUT>,
  children: [
    {
      path: "weather",
      element: () => import("@/pages/timing/weather"),
      meta: {
        label: "天气",
      },
    },
  ],
  meta: {
    label: "定时任务",
    icon: "IconDashboard",
  },
};
