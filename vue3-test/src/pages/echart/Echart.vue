<template>
  <div class="MyEchart" ref="echart"></div>
</template>

<script setup>
import { ref, watch, onMounted, toRaw, watchPostEffect } from "vue";
import * as echarts from "echarts/core";
import { LineChart, CandlestickChart, MapChart } from "echarts/charts";
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
]);

const props = defineProps({
  option: {
    type: Object,
    default: () => ({}),
  },
  size: {
    type: Object,
    default: () => {
      return {
        width: "",
        height: "",
      };
    },
  },
});

const emits = defineEmits(["getEchart"]);

const echart = ref(null);
const myChart = ref({});

const stop = watch(
  () => echart.value,
  (dom) => {
    if (dom) {
      resize();
      const echartExample = echarts.init(dom);
      myChart.value = echartExample;
      echartExample.resize();

      const uStop = watch(
        props.option,
        (opt) => {
          const lopt = toRaw(opt);
          if (echartExample.setOption) {
            echartExample.setOption(lopt);
          }
        },
        {
          immediate: true,
        }
      );

      stop();
    }
  }
);

// watchEffect(() => {
//   if (myChart.value.setOption) {
//     myChart.value.setOption(toRaw(props.option));
//     console.log(toRaw(props.option))
//   }
// });

function resize() {
  const dom = echart.value;
  const size = toRaw(props.size);
  dom.style.width = size.width + "px";
  dom.style.height = size.height + "px";
}

window.addEventListener("resize", () => {
  resize();
  if (myChart.value.resize) {
    myChart.value.resize();
  }
});
</script>

<style lang="less" scoped>
.MyEchart {
  width: 100%;
  height: 100%;
}
</style>
