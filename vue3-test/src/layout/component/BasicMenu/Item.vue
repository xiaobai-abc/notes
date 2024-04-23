<template>
  <template v-if="!hasChildren(item)">
    <a-menu-item :key="item.path" @click="selectMenu(item)">
      <template #icon>
        <Component :is="item.icon"></Component>
        <!-- <i :class="`iconfont icon-${item.icon}`" style="font-size: 18px"></i> -->
      </template>
      {{ item.label }}
    </a-menu-item>
  </template>
  <template v-else>
    <a-sub-menu :key="item.path">
      <template #icon>
        <Component :is="item.icon"></Component>
        <!-- <i :class="`iconfont icon-${item.icon}`" style="font-size: 18px"></i> -->
      </template>
      <template #title>{{ item.label }}</template>
      <MenuItem
        @selectMenu="selectMenu"
        v-for="items in item.children"
        :key="items.path"
        :item="items"
      ></MenuItem>
    </a-sub-menu>
  </template>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { hasChildren } from "./modules/help";
import MenuItem from "./Item.vue";
const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      label: "展示",
      children: [],
      name: "PathName",
      path: "",
    }),
  },
});

const emits = defineEmits(["selectMenu"]);

function selectMenu(item) {
  emits("selectMenu", item);
}
</script>

<style lang="less" scoped></style>
