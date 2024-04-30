<template>
  <div>
    <EchartVue
      ref="echartRef"
      style="height: 100%"
      @initEchart="initEchart"
    ></EchartVue>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import EchartVue from "./Echart.vue";
import fullCode from "@/utils/210000_full.json";
import dalianCode from "@/utils/210200_full.json";
import { deepClone } from "@/utils/lib.js";

const echartRef = ref(null);
const option = reactive({
  geo: {
    map: "liaoningsheng",
    roam: true,
    emphasis: {
      label: {
        show: true,
        fontSize: 18,
      },
      itemStyle: {
        color: "#3CABFA",
      },
    },
    itemStyle: {
      color: "#25625f",
      opacity: 0.5, //透明度
      // borderWidth: 1, // 边框宽度
      borderColor: "#76e9f2", // 边框颜色
    },
    label: {
      show: true,
      color: "#f00", //地图初始化区域字体颜色
      fontSize: 16,
      // formatter: function (params) {
      //   return params.name;
      // },
    },
  },
  series: [
    // {
    //   type: "map",
    //   map: "liaoningsheng",
    //   // colorBy: "data",
    //   roam: true,
    //   data: [
    //     {
    //       name: "大连市",
    //     },
    //   ],
    // },
    {
      type: "effectScatter",
      coordinateSystem: "geo",
      label: {
        show: true,
        fontSize: 18,
        formatter: [
          "{a|这段文本采用样式a}",
          "{b|这段文本采用样式b}这段用默认样式\n{x|这段用样式x}",
        ].join("\n"),
        rich: {
          a: { color: "red", lineHeight: 10 },
          b: {
            backgroundColor: { image: "xxx/xxx.jpg" },
            height: 40,
          },
          x: {
            fontSize: 18,
            fontFamily: "Microsoft YaHei",
            borderColor: "#449933",
            borderRadius: 4,
            borderWidth : 2
          },
        },
      },
      data: [
        {
          name: "大连市",
          value: [121.618622, 38.91459, 111],
        },
      ],
    },
  ],
});
let echartIns = null;
function initEchart(echarts) {
  console.log(fullCode);
  echarts.registerMap("liaoningsheng", fullCode);
  echartIns = echarts;
}

onMounted(() => {
  setTimeout(() => {
    echartRef.value.handlerEchart((echart) => {
      echart.setOption?.(option);
      echart.on("click", function (params) {
        // 绑定监听事件，并抛出
        console.log("click", params);
        echartIns.registerMap("dalianshi", dalianCode);
        option.geo.map = "dalianshi";
        echart.setOption(option);
      });
    });

    // const map = new T.Map("tmapContainerId");
    // map.centerAndZoom(new T.LngLat(121.618622, 38.91459), 11);
    // map.centerAndZoom(new T.LngLat(), 11);
  }, 150);
});

// {
//       name: "城市人口",
//       type: "bar3D",
//       minHeight: 4.2, // 坑，需要大于0，否则最低的柱状图渲染会出问题
//       coordinateSystem: "geo3D", // 采用geo3D的坐标系统
//       barSize: 1, // 柱状图的粗细
//       shading: "lambert", // lambert比color看着更加真实
//       bevelSize: 1, // 长方体向圆柱的过渡效果
//       bevelSmoothness: 15,
//       label: {
//         show: true,
//         distance: 0.36,
//         color: "#ff0",
//         fontWeight: "bold",
//         formatter(params) {
//           const { data } = params;
//           console.log(data);
//           const value = data.value[2];
//           return `${value}人`;
//         },
//       },
//       itemStyle: {
//         color: "#74fbf4",
//         opacity: 1,
//       },
//       data: [
//         {
//           name: "沈阳市",
//           value: [121.618622, 38.91459, 123],
//           code: "210200",
//           itemStyle: {},
//         },
//       ], // bar3D需要的数据
//     },

// geo3D: {
//     map: "liaoningsheng", //注册地图的名字
//     roam: true, //开启鼠标缩放和平移漫游。默认不开启

//     // 鼠标悬浮强调相关
//     emphasis: {
//       label: {
//         show: true,
//         fontSize: 18,
//       },
//       itemStyle: {
//         color: "#3CABFA",
//       },
//     },
//     itemStyle: {
//       color: "#5fcdfb", // 背景
//       opacity: 0.5, //透明度
//       borderWidth: 1, // 边框宽度
//       borderColor: "#76e9f2", // 边框颜色
//     },
//     label: {
//       show: true,
//       color: "#fff", //地图初始化区域字体颜色
//       fontSize: 16,
//       formatter: function (params) {
//         return params.name;
//       },
//     },
//   },

// dataRange: {
//     x: "left",
//     y: "bottom",
//     textStyle: {
//       color: "#fff",
//     },
//     splitList: [
//       {
//         start: 76,
//         label: "大于76",
//         color: "#b80909",
//       },
//       {
//         start: 51,
//         end: 75,
//         label: "51~75",
//         color: "#e64546",
//       },
//       {
//         start: 26,
//         end: 50,
//         label: "26~50",
//         color: "#f57567",
//       },
//       {
//         start: 0,
//         end: 25,
//         label: "0~25",
//         color: "#ff9985",
//       },
//     ],
//     padding: [48, 0, 24, 18],
//   },

//   {
//     type: "map",
//     map: "liaoningsheng",
//     data: [
//       {
//         name: "大连市", //这个对应的是json的数据
//         value: 1,
//         selected: true, // 将该区域设置为默认高亮
//       },
//     ],
//     // label: {
//     //   show: true,
//     //   color: "#000", //地图初始化区域字体颜色
//     //   fontSize: 8,
//     //   formatter: function (params) {
//     //     return params.name;
//     //   },
//     // },
//     // itemStyle: {
//     //   // 未选择区域的样式
//     //   areaColor: "lightblue",
//     //   color: "white",
//     //   borderColor: "gray",
//     //   borderWidth: 1,
//     // },
//   },
</script>

<style lang="less" scoped></style>
