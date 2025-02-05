/**
 * @description 判断路由是否包含
 * @param {String} baseRoute
 * @param {String} targetRoute
 * @returns {Boolean}
 */
export function isRouteIncluded(baseRoute, targetRoute) {
  // 使用RegExp构造函数时，需要对字符串进行双重转义
  const pattern =
    "^" + baseRoute.replace(/\/$/, "").replace(/\//g, "\\/") + "(\\/|$)";
  const regex = new RegExp(pattern);
  return regex.test(targetRoute);
}
