export function hasChildren(route) {
  return Array.isArray(route.children) && route.children.length;
}
