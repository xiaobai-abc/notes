<template>
  <div class="page">
    <div>
      <div class="box">
        <img
          class="img"
          v-for="(item, index) in imageList"
          :key="item.id"
          :src="item.url"
          @click="
            visible = true;
            current = index;
          "
        />
      </div>
      <div class="box">
        <video
          class="video"
          v-for="(item, index) in videoList"
          :key="item.id"
          :src="item.url"
          controls
        />
      </div>
      <!-- <a-image-preview-group infinite>
        <a-space>
          <a-image
            v-for="item in list"
            :key="item.id"
            :src="item.url"
            width="200"
          />
        </a-space>
      </a-image-preview-group> -->
      <a-image-preview-group
        v-model:visible="visible"
        v-model:current="current"
        infinite
        :srcList="imageUrl"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const imageList = ref([]);
const videoList = ref([]);
const visible = ref(false);
const current = ref(0);

const imageUrl = computed(() => {
  return imageList.value.map((e) => e.url);
});

(function () {
  axios.get("http://192.168.1.117:3000/api/files").then((res) => {
    const data = res.data.data;
    console.log(data);
    imageList.value = data.image;
    videoList.value = data.video;
  });
})();
</script>

<style lang="less" scoped>
.page {
  padding: 20px;
  .box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    align-items: center;
    justify-items: center;
    align-content: flex-start;
    .img {
      max-width: 100%;
      width: auto;
      height: auto;
      max-height: 100%;
    }
    .video{
      max-width: 100%;
      width: auto;
      height: auto;
      max-height: 100%;
      object-fit: cover;
    }
  }
}
</style>
