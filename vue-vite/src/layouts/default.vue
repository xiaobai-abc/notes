<template>
  <!-- layout -->
  <header>
    <a-menu mode="horizontal">
      <a-menu-item
        key="/dashboard/index"
        @click="onMenuItemClick('/dashboard/index')"
      >
        首页
      </a-menu-item>

      <a-menu-item
        key="/upload/index"
        @click="onMenuItemClick('/upload/index')"
      >
        上传
      </a-menu-item>

      <a-menu-item
        key="/kill-pig/index"
        @click="onMenuItemClick('/kill-pig/index')"
      >
        杀猪
      </a-menu-item>
    </a-menu>
  </header>
  <!-- <RouterView></RouterView> -->
  <router-view class="routerView" v-slot="{ Component }">
    <!-- <component :is="Component"></component> -->
    <router-view class="routerView" v-slot="{ Component: ChildrenComponent }">
      <component :is="ChildrenComponent || Component"></component>
    </router-view>
  </router-view>
  <footer>footer</footer>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
function onMenuItemClick(key, a) {
  router.push(key);
}
</script>

<style lang="less" scoped></style>
