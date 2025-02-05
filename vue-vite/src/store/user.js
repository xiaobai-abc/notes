import { defineStore } from "pinia";
import { getAuthCache, setAuthCache } from "@/utils/auth";

// 默认存储字段
const TOKEN_KEY = import.meta.APP_TOKEN;

export const useUserStore = defineStore("app-user", {
  state: () => ({
    token: "",
    userInfo: null,
    lastUpdateTime: 0,
    roleList: [], //权限列表
  }),
  actions: {
    //存储数据
    setToken(token) {
      this.token = token;
      setAuthCache(TOKEN_KEY, token);
    },
    setUserInfo(info) {
      this.userInfo = info || "";
      this.lastUpdateTime = new Date().getTime();
    },
    // 接口
    getUserInfoAction() {
      const roleList = []; //[] || 0 1

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.roleList = roleList;
          this.setUserInfo({
            user_type: 1,
            user_name: "啊阿啊",
          });

          resolve();
        }, 0);
      });
    },
  },
  getters: {
    getLastUpdateTime(state) {
      return state.lastUpdateTime;
    },
    // 每次获取token 后 都直接复制给stoer
    getToken(state) {
      return state.token || getAuthCache(TOKEN_KEY);
    },
    getRoleList(state) {
      return state.roleList;
    },
  },
});
