import { Outlet } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import "./index.less";
export default function ClassifyPage() {
  function postaa() {
    axios({
      url: "http://wavelen.meseeagro.com/generate_spectrum",
      method: "POST",
      data: {
        intensities: [0, 27, 51, 76, 81, 109, 109, 123, 186],
      },
      responseType: "json",
      headers: {
        "content-type": "application/json",
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, {arrayFormat: 'brackets'})
      },
    });

    // axios.get("http://127.0.0.1:3000/api/testa").then((resp) => {
    //   console.log(resp);
    // });

    return;
    fetch("http://wavelen.meseeagro.com/generate_spectrum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        intensities: [0, 27, 51, 76, 81, 109, 109, 123, 186],
      },
    }).then((resp) => {
      console.log(resp);
    });
  }

  return (
    <div className="flex h-dvh border-solid border border-indigo-600 ">
      <div className="a c">
        <button className="b" onClick={postaa}>
          点击
        </button>
      </div>
    </div>
  );
}
