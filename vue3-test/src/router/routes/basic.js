import { LAYOUT, PageNotFoundName } from "../constant";
import NotFoundPage from "@/pages/NotFound/index.vue";
import ErrorPage from "@/pages/Error/index.vue";

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE = {
  path: "/:path(.*)*",
  name: PageNotFoundName,
  component: LAYOUT,
  meta: {
    title: "PageNotFound",
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "PageNotFoundComponent",
      component: NotFoundPage,
      meta: {
        title: "PageNotFound",
      },
    },
  ],
};

export const ERROR_LOG_ROUTE = {
  path: "/error",
  name: "Error",
  component: LAYOUT,
  meta: {
    title: "ErrorLog",
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "PageErrorComponent",
      component: ErrorPage,
      meta: {
        title: "PageError",
      },
    },
  ],
};
