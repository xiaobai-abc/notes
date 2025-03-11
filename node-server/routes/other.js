const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const request = require("request");

const port = "3000";

router.get("/t1", (req, res) => {
  res.send({
    code: 1,
    data: { a: "qwe" },
    message: "success"
  });
});
// 返回地理编码测试
router.get("/testgg", (req, res) => {
  const options = {
    method: "GET",
    url: "http://api.tianditu.gov.cn/geocoder?postStr={'lon':117.22599553,'lat':39.12261653,'ver':1}&type=gcj02&tk=fb0fd08101db4c73942daebf1cc149b6"
    // qs: JSON.stringify({
    //   postStr: {
    //     lon: 117.22599553,
    //     lat: 39.12261653,
    //     var: 1
    //   },
    //   type: "gcj02",
    //   tk: "fb0fd08101db4c73942daebf1cc149b6"
    // })
  };
  request(options, (error, response, body) => {
    if (error) {
      console.error("<<<<<<<<<<<<<<", error);
      res.send({
        code: 0,
        data: error,
        message: "error"
      });
    } else {
      console.log(">>>>>>>>>>>>", body);
      res.send({
        code: 1,
        data: body,
        message: "success"
      });
    }
  });
  // res.send({
  //   code: 1,
  //   data: {
  //     a: "qwe"
  //   },
  //   message: "success"
  // });
});

router.get("/files", (req, res) => {
  const mkdirPath = path.resolve(__dirname, "../public/kill-pig");
  fs.readdir(
    // "/Users/main/work/notes/vue-vite/public/kill-pig",
    mkdirPath,
    function (err, files) {
      if (err) {
        console.log(err);
        throw err;
      }
      const image = [];
      const video = [];
      files.forEach((url, index) => {
        if (/\.jpg$/i.test(url)) {
          image.push({
            id: index,
            url: `http://${req.host}:${port}/kill-pig/${url}`,
            type: "image"
          });
        } else if (/\.mp4$/i.test(url)) {
          video.push({
            id: index,
            url: `http://${req.host}:${port}/kill-pig/${url}`,
            type: "video"
          });
        }
      });

      res.send({
        code: 1,
        data: {
          image,
          video
        },
        message: "success"
      });
    }
  );
});

module.exports = router;










 