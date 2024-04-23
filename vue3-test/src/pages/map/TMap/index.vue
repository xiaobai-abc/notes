<template>
  <div class="tmap-conponent">
    <div class="tmap-container" ref="tmapDom" id="tmapContainerId"></div>
    <div class="selectView">
      <select name="pets" id="pet-select" @change="handleSelectChange">
        <option
          :value="item.name"
          v-for="item in polygonList"
          :selected="item.name === selectValue"
          :key="item.name"
        >
          {{ item.name }}
        </option>
        <option value="全部">全部</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive, shallowRef } from "vue";
import { coordinateTransform } from "./help";
import cityDataV from "./156210000.json";

// 省会
const defautlCenter = coordinateTransform(
  123.47282733623474,
  41.68210839608248
);

let TMap = null;
const tmapDom = ref(null);
const selectValue = ref("大连市");
const polygonList = shallowRef([]);
const emits = defineEmits(["polygonClick", "initMap"]);

watch(
  () => tmapDom.value,
  () => {
    // const [clng, clat] = coordinateTransform(121.87549, 39.06039);
    const map = new T.Map("tmapContainerId");
    // map.centerAndZoom(new T.LngLat(clng, clat), 11);
    map.centerAndZoom(new T.LngLat(defautlCenter[0], defautlCenter[1]), 11);
    TMap = map;
    emits("initMap", TMap);
    const result = getAdminstrativeData();
    polygonList.value = result;
    setSelect(selectValue.value);
  }
);

function setSelect(name) {
  handleSelectChange({
    target: {
      value: name,
    },
  });
}

defineExpose({
  setSelect,
});

function handleSelectChange(e) {
  const name = e.target.value;
  const findData = polygonList.value.find((item) => item.name === name);
  if (!findData) {
    if (name == "全部") {
      TMap.panTo(new T.LngLat(defautlCenter[0], defautlCenter[1]), 7);
      const allResult = [];
      polygonList.value.forEach((item) => {
        allResult.push({
          points: item.points,
          name: item.name,
        });
      });
      allResult.forEach((item) => {
        drowPolygon(item.points, item.name);
      });
    }
    return;
  }

  const centerPoint = new T.LngLat(findData.center[0], findData.center[1]);
  TMap.clearOverLays();
  TMap.panTo(centerPoint, 8.5);
  drowPolygon(findData.points, findData.name);
}

// 添加行政区
function drowPolygon(result, name) {
  if (TMap) {
    const drowPolygonFunc = (list) => {
      const data = list.map((item) => {
        return new T.LngLat(item[0], item[1]);
      });

      const polygon = new T.Polygon(data, {
        color: "#de441f",
        fillColor: "#ff8161",
        fillOpacity: 0.1,
      });
      polygon.addEventListener("click", (e) => {
        emits("polygonClick", e, name);
      });
      TMap.addOverLay(polygon);
    };
    result.forEach((arr) => {
      arr.forEach((item) => {
        drowPolygonFunc(item);
      });
    });
  } else {
    console.warn("TMap is null");
  }
}

function getAdminstrativeData() {
  const dataList = [];
  const data = cityDataV.features;

  data.forEach((item) => {
    const properties = item.properties;
    const geometry = item.geometry;
    const tempData = geometry.coordinates;
    dataList.push({
      name: properties.name,
      center: properties.center,
      adcode: properties.adcode,
      points: tempData,
    });
  });
  console.log(dataList);

  return dataList;
}
</script>

<style lang="less" scoped>
.tmap-conponent {
  height: 100%;
  border: 1px solid red;
  position: relative;
  .selectView {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 500;
    background-color: red;
  }
  .tmap-container {
    height: 100%;
  }
}
</style>
