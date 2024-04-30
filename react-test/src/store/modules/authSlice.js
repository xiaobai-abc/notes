import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "@/api";
const AUTH_NAME = "auth";
import { Message } from "@arco-design/web-react";
// import { adminTitle } from "@/api/user.js";

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）

// 获取用户登录信息
export const fetchUserInfo = createAsyncThunk("auth/userInfo", async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: [],
      });
    }, 500);
  });
});

const initialState = {
  status: "idel", //请求状态
  builderMenuList: [],
};

export const authSlice = createSlice({
  name: AUTH_NAME,
  initialState: initialState,

  reducers: {
    // 重置整个数据
    resetState(state) {
      console.log(initialState);
    },
    // 设置菜单列表
    setBuilderMenuList(state, { payload }) {
      state.builderMenuList = payload;
    },
  },
  // 异步请求数据
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        if (!action.payload) return;
        const { code, data, message } = action.payload;
        state.status = "successed";
        // console.log("获取用户信息", data);
        // 用户信息
        if (code == 200) {
          console.log("获取用户信息", data);
          // state.userInfo = {
          //   userName: data.user_name,
          //   typeName: data.user_type.type_name,
          //   typeCode: data.user_type.type_code,
          // };
          // state.adminTitle = data.admin_title;
          return;
        }
        Message.error(message);
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.status = "rejected";
        console.log("reject");
      });
  },
});

export const { resetState, setBuilderMenuList } = authSlice.actions;
export const selectAuthSlice = (state) => state[AUTH_NAME];

// 默认导出
export default authSlice.reducer;
