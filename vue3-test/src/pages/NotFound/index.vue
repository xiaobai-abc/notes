<template>
  <div class="notFound">
    <div class="content">
      <a-result class="result" status="404" :subtitle="'not found'"> </a-result>
      <div class="operation-row">
        <a-button key="back" type="primary" @click="back"> back </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const back = () => {
  // warning： Go to the node that has the permission
  router.push({ path: "/" });
};
</script>

<style lang="less" scoped>
.notFound {
  position: relative;
}
.content {
  // padding-top: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -95px;
  margin-top: -121px;
  text-align: center;
}
</style>
