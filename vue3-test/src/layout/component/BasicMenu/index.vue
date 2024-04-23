<!-- 左侧菜单 -->
<template>
  <a-menu
    class="menu"
    :selected-keys="[currentRoute]"
    :auto-open-selected="true"
  >
    <template v-for="item in permissionStore.frontMenuList" :key="item.name">
      <MenuItem @select-menu="selectMenu" :item="item"></MenuItem>
    </template>
  </a-menu>
</template>

<script setup>
import { toRaw, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuItem from "./Item.vue";
import { usePermissionStore } from "@/store/permission.js";

const permissionStore = usePermissionStore();
const route = useRoute();
const router = useRouter();

const menuKeyList = []; //生成所有菜单列表

const currentRoute = computed(() => {
  const nowPath = route.path;
  // const splitPath = nowPath.split("/").filter((e) => e);
  // 根据当前路由 直接测试 所有菜单列表 是否包含
  const nowCurrent = menuKeyList.find((e) => isRouteIncluded(e, nowPath));
  return nowCurrent;
});

function isRouteIncluded(baseRoute, targetRoute) {
  // 使用RegExp构造函数时，需要对字符串进行双重转义
  const pattern =
    "^" + baseRoute.replace(/\/$/, "").replace(/\//g, "\\/") + "(\\/|$)";
  const regex = new RegExp(pattern);
  return regex.test(targetRoute);
}

function selectMenu(item) {
  // console.log("select menu", item.path);
  router.push({ path: item.path });
}
</script>

<style lang="less" scoped></style>
