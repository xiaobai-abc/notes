<!-- 框架布局页面 -->
<template>
  <a-layout class="mainLayout">
    <a-layout-header><HeaderVue></HeaderVue></a-layout-header>
    <a-layout>
      <a-layout-sider
        :width="220"
        :collapsed="isCollapsed"
        style="position: relative; z-index: 210"
      >
        <div class="siderView">
          <a-scrollbar
            :outer-style="{ flex: '1 0 0%', height: '0' }"
            style="height: 100%; overflow: hidden; overflow-y: auto"
          >
            <BasicMenu></BasicMenu>
          </a-scrollbar>
        </div>
      </a-layout-sider>
      <a-layout-content class="content">
        <!-- 面包屑 -->
        <Breadcrumb></Breadcrumb>
        <router-view class="routerView" v-slot="{ Component }">
          <!-- <component :is="Component"></component> -->
          <router-view
            class="routerView"
            v-slot="{ Component: ChildrenComponent }"
          >
            <component :is="ChildrenComponent || Component"></component>
          </router-view>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from "vue";
import HeaderVue from "./component/Header.vue";
import Breadcrumb from "./component/Breadcrumb.vue";
import BasicMenu from "./component/BasicMenu/index.vue";

const isCollapsed = ref(false); //控制menu是否折叠
</script>

<style lang="less" scoped>
.mainLayout {
  height: 100vh;
  height: 100dvh;
 
  .siderView {
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    .exit {
      padding: 16px 0;
      cursor: pointer;
      // box-shadow: rgba(0, 0, 0, 0.08) 2px 0px 5px 0px;
      color: var(--color-text-2);
      display: flex;
      align-items: center;
      overflow: hidden;
      span {
        font-size: 14px;
        padding-left: 10px;
      }
    }
  }

  .content {
    padding: 0 20px;
    // padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 3px;
    .routerView {
      overflow: hidden;
      flex: 1 0 0%;
      height: 0;
    }
  }
}
</style>
