import { Button, Switch, Typography, Tag, Space } from "@arco-design/web-react";
import { useState } from "react";
import "./weather.less";
import axios from "@/api";
import axiosMain from "axios";

export default function WeatherPage() {
  const [jsonshow, setJson] = useState({});

  function handlerClickOne() {
    axios.get("/weather").then((resp) => {
      // console.log(resp);
      axios.get("/json/weather.json").then((resp) => {
        console.log(resp);
        setJson(resp);
      });
    });
  }

  function handlerClickTwo() {
    // iot-admin.meseeagro.com
    // 59.46.213.234:443
    axiosMain
      .get("https://iot-admin.meseeagro.com/api/v1/weather", {
        params: {
          city: "金州区",
          day: 7,
        },
        headers: {
          Authorization: "Bearer a96e65064e824e0620f6be5061ed5769==",
        },
      })
      .then((resp) => {
        console.log(resp);
      });
  }

  return (
    <div className="weatherContainer">
      <Space>
        {/* <Typography.Text>Space:</Typography.Text> */}
        <Tag color="arcoblue">测试按钮</Tag>
        <Button type="primary" onClick={handlerClickOne}>
          单次测试 获取天气数据
        </Button>
        <Button type="primary" onClick={handlerClickTwo}>
          本地测试天气接口
        </Button>
      </Space>
      <div className="showView">
        <div className="view">
          <pre className="pre">{JSON.stringify(jsonshow, null, 4)}</pre>
        </div>
      </div>
    </div>
  );
}
