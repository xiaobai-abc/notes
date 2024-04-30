<template>
  <div class="cc">
    <div class="a">
      <div
        class="b"
        v-for="item in 5"
        :style="{ background: getRandomColor() }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import {} from "vue";

const getRandomColor = function () {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
};
</script>

<style lang="less" scoped>
.cc {
  .a {
    border: 1px solid blue;
    width: 500px;
    display: flex;
    .b {
      flex: 1;
      height: 100px;
      background-color: red;
      order: 3;
    }
  }
}
</style>
