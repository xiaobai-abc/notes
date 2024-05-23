var express = require("express");
var router = express.Router();
const request = require("request");

router.get("/", function (req, res, next) {});

/* GET users listing. */
router.get("/result", function (req, res, next) {
  res.status(200).send({
    code: 200,
    data: {
      list: [],
      info: {
        // type : "不知道是啥类型",
        item: "我不知道啥类型呀",
        result_dl: "无",
        // 编号
        sample: "包菜",
        result_unit: "反正都是蔬菜",
        result_dx_desc: "应该合格吧",
        source: "黑市",
        operator: "郑姐",
        detect_time: "2077年8月8日",
        detect_unit: "觅视科技",
        phone: "166666666666",
        instrument_cop: "觅视科技",
        instrument: "扫帚",
        detect_unit_id: "sssssssss",

        // channel: "通道",
        // sample_class: "样品类型",
        // result_dx: "",
      },
    },
    message: "获取信息~~~",
  });
});

router.get(
  "/testa",
  function (req, res, next) {
    console.log("request >>>>>>")
    request(
      {
        url: "http://wavelen.meseeagro.com/generate_spectrum",
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        body: {
          intensities: [0, 27, 51, 76, 81, 109, 109, 123, 186],
        },
      },
      function (error, response, body) {
        console.log(">>>>>>>>>>>>>>>>",error);
        console.log(body)
        next()
      }
    );
  },
  function (req, res) {
    res.status(200).send({
      code: 200,
    });
  }
);

module.exports = router;
