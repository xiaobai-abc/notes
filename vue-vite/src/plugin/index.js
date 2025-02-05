import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/style/nprogress.less";

// 加载进度条
export function setupNProgress() {
  NProgress.configure({
    easing: "ease", // 动画方式，和css动画属性一样（默认：ease）
    speed: 500, // 递增进度条的速度，单位ms（默认： 200）
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比，0-1（默认：0.08）
    // parent: '#container'//指定此选项以更改父容器（默认：body）
  });
}
