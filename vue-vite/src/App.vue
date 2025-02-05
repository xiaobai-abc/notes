<script setup>
import { useUserStore } from "@/store/user.js";
const userStore = useUserStore();
</script>

<template>
  <p v-if="!userStore.getLastUpdateTime">loading</p>
  <template v-else>
    <RouterView />
  </template>
</template>

<style scoped lang="less"></style>
