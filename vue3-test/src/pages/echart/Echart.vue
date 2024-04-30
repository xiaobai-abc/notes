<template>
  <div class="MyEchart" id="tmapContainerId" ref="echartRef"></div>
</template>

<script setup>
import { shallowRef, onMounted, toRaw, watch, onBeforeUnmount } from "vue";
import * as echarts from "echarts/core";
import {
  LineChart,
  CandlestickChart,
  MapChart,
  ScatterChart,
  EffectScatterChart,
} from "echarts/charts";
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LegendPlainComponent,
  DataZoomComponent,
  VisualMapComponent,
  GeoComponent,
} from "echarts/components";

import { Grid3DComponent } from "echarts-gl/components";
import {
  Bar3DChart,
  Line3DChart,
  Scatter3DChart,
  Lines3DChart,
  Polygons3DChart,
  SurfaceChart,
  Map3DChart,
  ScatterGLChart,
  GraphGLChart,
  FlowGLChart,
  LinesGLChart,
} from "echarts-gl/charts";

import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendPlainComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  DataZoomComponent,
  CandlestickChart,
  MapChart,
  GeoComponent,
  VisualMapComponent,
  ScatterChart,
  EffectScatterChart,

  Grid3DComponent,

  Bar3DChart,
  Line3DChart,
  Scatter3DChart,
  Lines3DChart,
  Polygons3DChart,
  SurfaceChart,
  Map3DChart,
  ScatterGLChart,
  GraphGLChart,
  FlowGLChart,
  LinesGLChart,
]);

const props = defineProps({
  option: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["initEchart"]);
const handlerResize = debounce(() => {
  if (echart.value) {
    echart.value.resize?.();
  }
});
const echartRef = shallowRef(null);
const echart = shallowRef({});

emits("initEchart", echarts);

onMounted(() => {
  let hasInit = false;
  const resizeObserver = new ResizeObserver((e) => {
    if (echartRef.value) {
      if (hasInit) return;
      echart.value = echarts.init(echartRef.value);
      handlerResize();
      echart.value.resize();
      echart.value.setOption(props.option || {});
      hasInit = true;
      resizeObserver.disconnect();
    } else {
      console.log("未传入echartRef:未获取的echart");
    }
  });
  resizeObserver.observe(echartRef.value);
});

defineExpose({
  handlerEchart: (callback) => {
    if (callback) {
      callback(echart.value);
    } else {
      console.log("未传入回调函数");
    }
  },
});

// 防抖
function debounce(callback, delay = 500) {
  let timer = null;
  return function (...arg) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback?.(...arg);
    }, delay);
  };
}

window.addEventListener("resize", handlerResize);
onBeforeUnmount(() => {
  // 销毁时移除监听resize事件
  window.removeEventListener("resize", handlerResize);
});
</script>

<style lang="less" scoped>
.MyEchart {
  width: 100%;
  height: 100%;
}
</style>
