const STORAGE = import.meta.env.APP_STORAGE;
const TOKEN = import.meta.env.APP_TOKEN;

const storageMethod =
  STORAGE === "localStorage" ? localStorage : sessionStorage;

// 获取存粗信息 用户
export function getAuthCache(key, value) {
  return storageMethod.getItem(TOKEN);
}

export function setAuthCache(value = "") {
  storageMethod.setItem(TOKEN, value);
}
