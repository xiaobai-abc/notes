const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const port = "3000";

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
