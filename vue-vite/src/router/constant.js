export const LAYOUT = () => import("@/layouts/default.vue");



export const getParentLayout = (_name) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: _name || "ParentLayout",
      });
    });
};


// 404 页面 name
export const PageNotFoundName = "PageNotFound"
