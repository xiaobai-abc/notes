var express = require("express");
var router = express.Router();
const request = require("request");
const fs = require("fs");
const path = require("path");

router.get("/", function (req, res, next) {});

/* GET users listing. */
router.get(
  "/result",
  function (req, res, next) {
    request(
      {
        url: "http://127.0.0.1:3001",
        method: "GET",
        json: true,
        headers: {
          // "content-type": "application/json",
        },
      },
      function (error, response, body) {
        if (error) {
          console.log(">>>>>>>>>>>>>>>>", error);

          return;
        }
        req.htmlvalue = body;
        next();
      }
    );
  },
  function (req, res) {
    const writePath = path.resolve(__dirname, "../public/htmljson/a.html");
    fs.writeFileSync(writePath, req.htmlvalue, "utf8");

    res.status(200).send({
      code: 200,
      data: req.htmlvalue,
      message: "请求成功~~~",
    });
  }
);

router.get(
  "/testa",
  function (req, res, next) {
    console.log("request >>>>>>");
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
        console.log(">>>>>>>>>>>>>>>>", error);
        console.log(body);
        next();
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
