<!-- 头组件 -->
<template>
  <header class="header">
    
  </header>
</template>

<script setup>
import { ref } from "vue";

 
//头像
const headImg = ref("");
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  padding: 0 20px;

  color: #4e5969;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  border: 1px solid #ededed;
  .img {
    width: 107px;
    height: 26px;
  }
  .iconImg {
    width: 128px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    .list {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #f2f3f5;
      display: flex;
      justify-content: center;
      cursor: pointer;
      .icon {
        line-height: 30px;
      }
    }
  }
}
</style>
