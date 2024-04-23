/**
 * 递归遍历树结构
 * @param treeDatas 树
 * @param callBack 回调
 * @param parent
 */
export function eachTree(treeDatas, callBack, parent = {}) {
  treeDatas.forEach((element) => {
    const newParent = callBack(element, parent) || element;
    if (Array.isArray(element.children) && element.children.length) {
      eachTree(element.children, callBack, newParent);
    }
  });
}
