const express = require("express");
const multiparty = require("multiparty");
const app = express();
const fs = require("fs");
const path = require("path");

app.get("/", (req, res) => {
  res.send("hello, this is a node server for upload file current env is");
});
// 跨域
app.use(function (req, res, next) {
  if (req.method == "OPTIONS") res.send("OPTIONS PASS");
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  res.append("Access-Control-Allow-Headers", "*");
  next();
});
// 上传
app.post("/upload", (req, res) => {
  const form = new multiparty.Form();
  try {
    form.on("part", async function (part) {
      if (part.filename) {
        // const saveTo = "/Users/main/work/test";
        const saveTo = "/Users/main/Desktop/kill-pig";
        // 如果不存在文件夹路径则创建文件夹
        await new Promise((resolve, reject) => {
          fs.stat(saveTo, (err) => {
            if (err) {
              fs.mkdirSync(saveTo);
            }
            resolve();
          });
        });
        // 根据路径创建写入流
        const writeStrem = fs.createWriteStream(
          path.join(saveTo, part.filename)
        );
        part.pipe(writeStrem);
      }
      part.on("error", function (err) {
        fileStrem.destroy();
      });
    });
    form.parse(req);
  } catch (e) {
    console.log(e);
    res.send("500");
  }
  res.send("200");
});
app.listen(8010, function () {
  console.log("http://127.0.0.1:8010");
});
