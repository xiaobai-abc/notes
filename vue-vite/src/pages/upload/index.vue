<template>
  <div>
    <a-upload :custom-request="customRequest" multiple />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const customRequest = (option) => {
  const { onProgress, onError, onSuccess, fileItem, name } = option;
  console.log(option);

  const formData = new FormData();

  formData.append("files[]", fileItem.file);

  axios
    .post(
      "https://api.meseequick.com/map_annotation_app/uploads_for_oss",
      formData
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  // axios
  //   .post("http://192.168.1.117:8010/upload", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     }
  //   })
  //   .then((response) => {
  //     console.log("上传成功", response);
  //     onSuccess();
  //   })
  //   .catch((error) => {
  //     console.error("上传失败", error);
  //     onError();
  //   });
};
</script>

<style lang="less" scoped></style>
