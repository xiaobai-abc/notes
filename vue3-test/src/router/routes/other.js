export const TestPage = {
  path: "/test",
  name: "TestPage",
  component: () => import("@/test/index.vue"),
  meta: {
    title: "测试页面",
    ignoreAuth: true,
  },
  children: [
    {
      path: "1",
      name: "Test1",
      component: () => import("@/test/1.vue"),
      meta: {
        title: "测试页面1",
        ignoreAuth: true,
      },
    },
  ],
};
