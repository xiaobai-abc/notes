import { asyncRoutes, basicRoutes, PAGE_NOT_FOUND_ROUTE } from "./routes";
import { wrapRoutesWithLazy } from "./util";
import {
  fetchUserInfo,
  selectAuthSlice,
  setBuilderMenuList,
} from "@/store/modules/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LayoutLoading from "@/layout/component/Loading";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";

// 存入白名单
const whiteRouteName = [];
[...basicRoutes].forEach((route) => {
  whiteRouteName.push(route.path);
});

export default function getRoutes() {
  // console.log("app");
  const loaction = useLocation();
  const naviagate = useNavigate();
  const dispatch = useDispatch();

  const { status } = useSelector(selectAuthSlice);

  //路由列表 只存储显示的路由列表 不包含基本路由
  const [routes, setRoutes] = useState([]);

  const fetchUserInfoCallback = useCallback(async () => {
    await dispatch(fetchUserInfo());
  }, []);

  // useEffect(() => {
  //   // console.log("路由地址", loaction.pathname);
  //   // 请求状态未开始 才去尝试鉴权
  //   if (status === "idel") {
  //     const token = getAuthCache();
  //     if (token) {
  //       fetchUserInfoCallback();
  //       return;
  //     }
  //     if (!whiteRouteName.includes(loaction.pathname)) {
  //       naviagate("/login");
  //     }
  //   }
  // }, [loaction.pathname]);

  // useEffect(() => {
  //   if (status === "successed") {

  //     // 生成权限菜单列表 *去除element
  //     const handlerList = processAndModifyRoutes(filterList);
  //     dispatch(setBuilderMenuList(handlerList));
  //     // 根据权限生成路由
  //     setRoutes(filterList);
  //   }
  // }, [status]);

  useEffect(() => {
    if (status === "idel") {
      fetchUserInfoCallback();
    }
    if (status === "successed") {
      console.log(">>>", asyncRoutes,basicRoutes);
      // 生成权限菜单列表 *去除element
      // dispatch(setBuilderMenuList(handlerList));
      // 根据权限生成路由
      // setRoutes(filterList);
    }
  }, [status]);

  if (status === "loading") {
    return <LayoutLoading />;
  }

  // 这里有个取巧  默认权限-1 数据未响应 生成的结果也是空 + 基本路由
  return <GenerateRoutes routes={routes} />;
}

/**
 *
 * @description 处理完整路由
 */

function GenerateRoutes({ routes }) {
  let handlerLazyRoutes = [];

  // 处理路由为 懒加载
  handlerLazyRoutes = routes.map((item) => {
    const temp = Object.assign({}, item);
    if (temp.children) {
      temp.children = wrapRoutesWithLazy(temp.children);
    }
    return temp;
  });

  const finishRoutes = [
    ...basicRoutes,
    ...handlerLazyRoutes,
    PAGE_NOT_FOUND_ROUTE,
  ];

  return useRoutes(finishRoutes);
}

/**
 * @description 思考半天 已经生成出来的权限路由 这里要配置路由 menu也要用太臃肿了
 * 只能递归 然后所有操作在这里生成好
 * 同时删除元素组件
 * @param {Array} list 处理路由  传入的是过滤后的 权限路由列表
 */
function processAndModifyRoutes(list) {
  return list.map((item) => {
    const { children, element, ...rest } = item;
    const modifiedItem = {
      ...rest,
      // key: item.path,
    };
    if (children && children.length) {
      modifiedItem.children = processAndModifyRoutes(children);
    }
    return modifiedItem;
  });
}
