const options = {
  backgroundColor: "transparent",
  // geo3D: {
  //   show: false,
  //   type: "map3D",
  //   map: "liaoningsheng",
  //   viewControl: {
  //     minBeta: -360,
  //     maxBeta: 360,
  //     rotateSensitivity: [10, 10],
  //     animation: true,
  //   },
  //   itemStyle: {
  //     color: "#5fcdfb", // 背景
  //     opacity: 0.5, //透明度
  //     borderWidth: 1, // 边框宽度
  //     borderColor: "#76e9f2", // 边框颜色
  //   },
  //   label: {
  //     show: true,
  //     color: "#fff", //地图初始化区域字体颜色
  //     fontSize: 16,
  //     formatter: function (params) {
  //       return params.name;
  //     },
  //   },
  // },
  series: [
    {
      type: "map3D",
      map: "liaoningsheng",
      roam: true,
      viewControl: {
        minBeta: -360,
        maxBeta: 360,
        rotateSensitivity: [10, 10],
        animation: true,
      },
      data: [
        {
          name: "大连市",
          value: "123",
        },
      ],
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
        color: "#5fcdfb", // 背景
        opacity: 0.5, //透明度
        borderWidth: 1, // 边框宽度
        borderColor: "#76e9f2", // 边框颜色
      },
      label: {
        show: true,
        color: "#fff", //地图初始化区域字体颜色
        fontSize: 16,
        formatter: function (params) {
          return params.name;
        },
      },
    },
    // {
    //   type: "scatter3D",
    //   coordinateSystem: "map3d",
    //   data: [
    //     {
    //       name: "大连市",
    //       value: [121.618622, 38.91459, 111],
    //     },
    //   ],
    // },
  ],
};
