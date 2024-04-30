<template>
  <div style="overflow: auto">
    <h1>轮播头测试</h1>

    <div class="container">
      <div class="swiper-container" style="overflow: hidden">
        <div class="content-box" :style="Styles" ref="contentBoxRef">
          <div
            class="slider-view"
            v-for="(item, index) in showlist"
            :key="item.id"
          >
            <span class="con">{{ item.index }}</span>
            <img :src="item.img" alt="" />
          </div>
        </div>
      </div>
      <div class="handler-view">
        <a-space direction="vertical" fill>
          <div>
            <a-button
              style="margin-right: 10px"
              v-for="(item, index) in showlist"
              @click="handlerBtn(index)"
            >
              点击第{{ index }}张
            </a-button>
          </div>

          <a-space fill>
            <a-button
              style="margin-right: 10px"
              @click="
                moveTo(current - 1 < 0 ? showlist.length - 1 : current - 1)
              "
            >
              上一张
            </a-button>
            <a-button
              @click="
                moveTo(current + 1 > showlist.length - 1 ? 0 : current + 1)
              "
            >
              下一张
            </a-button>
          </a-space>

          <div>
            <a-input-number v-model="current"></a-input-number>
          </div>
          <pre>{{ showlist }}</pre>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from "vue";
import { nanoid } from "nanoid";
import axios from "axios";

const contentBoxRef = ref(null);
const config = {
  width: 500,
};

const showlist = reactive([]);
const current = ref(0);
const Styles = reactive({
  transition: "none",
  transform: `translateX(-${current.value * 500}px)`,
});
const setStyle = (width = 0, isTransition = false) => {
  Object.assign(Styles, {
    transition: isTransition ? "transform 0.25s cubic-bezier(0.34, 0.69, 0.1, 1)" : "none",
    transform: `translateX(-${width}px)`,
  });
};

const list = ref([]);
const imgModules = import.meta.glob("./img/*.jpg", { eager: true });

function moveTo(index) {
  const len = showlist.length;
  const toIndex = showlist.findIndex((item) => item.index == index);
  const nowListIndex = showlist.findIndex(
    (item) => item.index == current.value
  );
  if (nowListIndex == 0 && toIndex == len - 1) {
    // 准备向左翻 应该移动后前往后一个
    setStyle((nowListIndex + 1) * config.width, false);
    showlist.unshift(...showlist.splice(len - 1, 1));
  } else if (nowListIndex == len - 1 && toIndex == 0) {
    // 准备向右翻 应该移动后前往前一个
    setStyle((nowListIndex - 1) * config.width, false);
    showlist.push(...showlist.splice(0, 1));
  }
  const moveToIndex = showlist.findIndex((item) => item.index == index);
  console.log(moveToIndex, toIndex);
  contentBoxRef.value?.getBoundingClientRect();
  setTimeout(() => {
    setStyle(moveToIndex * config.width, true);
    current.value = index;
  }, 0);
}

function handlerBtn(index) {
  moveTo(index);
}

(function () {
  const result = [];

  Object.keys(imgModules).forEach((key) => {
    const mod = imgModules[key];
    result.push(mod.default);
  });
  const tempData = [];
  list.value = result.map((img, index) => ({
    img: img,
    id: nanoid(4),
    index,
  }));
  tempData.push(...list.value.map((e) => Object.assign({}, e)));

  // showlist.push(...tempData.splice(0, 3));
  showlist.push(...tempData);

  // axios
  //   .post("http://localhost:5179/api/generate_spectrum", {
  //     intensities: [0, 27, 51, 76, 81, 109, 123, 109, 1861],
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
})();
</script>

<style lang="less" scoped>
h1 {
  margin-bottom: 50px;
}
.container {
  border: 1px dashed rgb(0, 187, 255);
  padding-bottom: 30px;
  .swiper-container {
    margin: 0 auto;
    width: 500px;
    height: 300px;
    border: 1px solid red;
    .content-box {
      display: flex;
      width: fit-content;
      height: 100%;
    }
    .slider-view {
      width: 500px;
      height: 100%;
      position: relative;
      .con {
        position: absolute;
        top: 50%;
        width: fit-content;
        left: 0;
        right: 0;
        margin: 0 auto;
        z-index: 1;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        line-height: 1;
        color: transparent;
        background: linear-gradient(
          180deg,
          rgba(230, 101, 90, 1) 0%,
          rgba(230, 158, 90, 1) 9%,
          rgba(230, 177, 90, 1) 20%,
          rgba(213, 230, 90, 1) 30%,
          rgba(159, 230, 90, 1) 38%,
          rgba(90, 230, 101, 1) 45%,
          rgba(90, 230, 191, 1) 55%,
          rgba(90, 177, 230, 1) 65%,
          rgba(95, 91, 230, 1) 73%,
          rgba(179, 91, 230, 1) 81%,
          rgba(230, 91, 201, 1) 88%,
          rgba(230, 91, 124, 1) 94%,
          rgba(231, 126, 92, 1) 100%
        );
        background-clip: text;
        -webkit-background-clip: text;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .handler-view {
    margin: 0 auto;
    margin-top: 60px;
    width: 500px;
    padding: 20px;
    border: 1px dashed green;
  }
}
</style>
