<template>
  <div class="dashboard">
    {{ list }}
    <ul>
      <li v-for="item in list">
        <img style="width: 300px" :src="item.img" alt="" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
const list = ref([]);

const getImg = (num) => {
  return new URL(`../../assets/${num}.jpg`, import.meta.url).href;
};

function onGetData() {
  list.value = [
    {
      img: getImg(1),
    },
    {
      img: getImg(2),
    },
  ];
}
onGetData();
</script>

<style lang="less" scoped></style>
