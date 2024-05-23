const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const md5 = require("js-md5");
const path = require("path");
const request = require("request");
const router = express.Router();

const SECRET_KEY = "REACT-TEST-SECRET";
const userJsonPath = path.resolve(__dirname, "../json/user_list.json");
const weatherJsonPath = path.resolve(__dirname, "../json/weather.json");

function setUserList(data) {
  try {
    fs.writeFileSync(userJsonPath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.log("写入文件失败 >>> userjson >>>", error);
  }
}

const TokenUtil = {
  sign: function (username) {
    const token = jwt.sign(
      {
        username,
        iss: "node",
        sub: "jcg",
        iat: new Date().getTime() / 1000,
        exp: new Date().getTime() / 1000 + 60 * 60 * 24,
      },
      SECRET_KEY,
      { algorithm: "HS256" }
    );
    return token;
  },

  verify: function (token) {
    // const decoded = jwt.verify(token, SECRET_KEY);
    // console.log(decoded);
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (err) {
      return false;
    }
  },
};

// （Payload）说明
// { "iss": "Online JWT Builder",
//   "iat": 1416797419,
//   "exp": 1448333419,
//   "aud": "www.example.com",
//   "sub": "jrocket@example.com",
//   "GivenName": "Johnny",
//   "Surname": "Rocket",
//   "Email": "jrocket@example.com",
//   "Role": [ "Manager", "Project Administrator" ]
// }
// * iss: 该JWT的签发者，是否使用是可选的；
// * sub: 该JWT所面向的用户，是否使用是可选的；
// * aud: 接收该JWT的一方，是否使用是可选的；
// * exp(expires): 什么时候过期，这里是一个Unix时间戳，是否使用是可选的；
// * iat(issued at): 在什么时候签发的(UNIX时间)，是否使用是可选的；其他还有：
// * nbf (Not Before)：如果当前时间在nbf里的时间之前，则Token不被接受；一般都会留一些余地，比如几分钟；，是否使用是可选的；

router.post("/login", function (req, res) {
  const { username, password } = req.body;

  if (!username) {
    res.status(401).send({
      code: 0,
      data: null,
      message: "请输入账号~~~",
    });
    return;
  }

  const userlist = fs.readFileSync(userJsonPath, "utf8");
  const userList = JSON.parse(userlist);
  const first = userList.user.find((item) => item.username === username);
  if (!first) {
    res.status(401).send({
      code: 0,
      data: null,
      message: "账号不存在~~~",
    });
    return;
  }
  if (first.password !== md5(password)) {
    res.status(401).send({
      code: 0,
      data: null,
      message: "密码错误~~~",
    });
    return;
  }

  const token = TokenUtil.sign(username);

  res
    .setHeader("Content-Type", "application/json")
    .status(200)
    .send({
      code: 200,
      data: {
        token: token,
      },
      messgae: "登录成功~~",
    });
});

router.get("/verify", function (req, res) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send({
      code: 0,
      data: null,
      message: "登录过期~~~",
    });
    return;
  }
  const decoded = TokenUtil.verify(token.split("Bearer ")[1]);

  if (decoded) {
    res.status(200).send({
      code: 200,
      data: {
        userinfo: {
          username: decoded.username,
          perCode: 1,
        },
      },
      message: "获取信息~~~",
    });
  } else {
    res.status(401).send({
      code: 0,
      data: null,
      message: "登录过期~~~",
    });
  }
});

router.get(
  "/weather",
  (req, response, next) => {
    // iot-admin.meseeagro.com
    // 59.46.213.234:443
    // 192.168.63.11:9501
    request(
      {
        url: "http://192.168.63.11:9501/api/v1/weather",
        // port: 443,
        qs: {
          city_code: "金州区",
          days: 7,
        },
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
          Authorization: "Bearer a96e65064e824e0620f6be5061ed5769==", // 设置 Authorization 请求头
        },
      },
      (err, res, body) => {
        if (err) {
          console.log("error type >>>>> ", err);
          response.status(403).send({
            code: 0,
            data: null,
            message: "接口响应失败~~~",
          });
          return;
        }

        console.log(`状态码>>>>> ${res.statusCode}`); //返回状态码
        // res.setEncoding("utf8"); // 设置编码
        // const newData = JSON.parse(body);
        response.resultData = body;

        next();
      }
    );
  },
  function (req, response) {
    if (response.resultData) {
      const resp = JSON.parse(response.resultData);

      if (resp?.code == 200) {
        const jsondata = fs.readFileSync(weatherJsonPath, "utf8");
        if (jsondata) {
          // 写入文件
          const data = JSON.parse(jsondata);
          const weathercode = data.weathercode;
          const list = resp.result.list;
          list.forEach((item) => {
            let code = item.weathercode;
            let find = weathercode.find((e) => e.weathercode === code);
            if (!find) {
              weathercode.push({
                weathercode: code,
                weather: item.weather,
                tips: item.tips,
                week: item.week,
                date: item.date,
              });
            }
          });
          fs.writeFileSync(
            weatherJsonPath,
            JSON.stringify(data, null, 2),
            "utf8"
          );
        } else {
          console.warn("读取文件失败 >>> weatherjson >>>", jsondata);
        }
      }

      response.status(200).send(response.resultData);
    } else {
      response.status(403).send({
        code: 401,
        data: null,
        message: "接口响应失败~~~",
      });
    }
  }
);


module.exports = router;
