<template>
  <div class="Breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <icon-unordered-list />
      </a-breadcrumb-item>

      <a-breadcrumb-item v-for="item in matched">
        {{ item.name }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup>
import { computed, toRaw, unref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const matched = computed(() => {
  return route.matched
    .map((e) => {
      // console.log(e)
      if (e.meta?.title) {
        return {
          path: e.path,
          name: e.meta.title,
        };
      }
    })
    .filter((e) => e);
});
// console.log(unref(matched), JSON.parse(JSON.stringify(route)));
</script>

<style lang="less" scoped>
.Breadcrumb {
  padding: 14px 0;
}
</style>
