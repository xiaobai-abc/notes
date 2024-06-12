import classNames from "classnames";
import ThreeClass from "./three";
import { useEffect, useState, createRef } from "react";
import { Button } from "@/shadcn/components/ui/button";

let index = 0;
let timer = null;
export default function ThreeJsPage() {
  const canvasBoxRef = createRef(null);
  const [isRender, setIsRender] = useState(false);
  const [three, setThree] = useState(null);

  function render() {}

  // 点击渲染开始
  function handRender() {
    let frameId = 0;
    three.gender((THREE) => {
      // 几何
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      // 材质
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      material.wireframe = true; // 线框
      const cube = new THREE.Mesh(geometry, material);
      three.scene.add(cube);
      three.camera.position.z = 5;
      three.camera.position.x = 5;
      three.camera.position.y = 5;
      three.camera.lookAt(0, 0, 0); 
      three.scene.background = new THREE.Color("#88B9DD");

      const axesHelper = new THREE.AxesHelper(5);
      three.scene.add(axesHelper);
      const guiFolder = three.gui.addFolder("立方体位置");
      guiFolder.add(cube.position, "x", -5, 5).name("X轴");
      guiFolder.add(material, "wireframe").name("线框");
      guiFolder.addColor(material, "color").name("颜色");
      // three.gui
      //   .addColor({ cubeColor: "#ff0000" }, "cubeColor")
      //   .name("颜色")
      //   .onChange((val) => {
      //     cube.material.color.set(val);
      //   });

      function animate() {
        frameId++;
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        requestAnimationFrame(animate);
        three.render();
      }
      animate();
    });
    clearInterval(timer);
    setInterval(() => {
      console.log(frameId);
      frameId = 0;
    }, 1000);
  }

  useEffect(() => {
    console.log("on render ", ++index);
    if (isRender) return;
    const three = new ThreeClass();

    if (canvasBoxRef.current) {
      three.element.style.margin = "10px auto";
      three.element.style.border = "1px solid #ccc";
      canvasBoxRef.current.appendChild(three.element);
      setIsRender(true);
      setThree(three);
    } else {
      console.log("canvasBoxRef.current is null");
    }
  });

  return (
    <div className="border" ref={canvasBoxRef}>
      <Button onClick={handRender} size="sm">
        渲染
      </Button>
      <Button size="sm" className="ml-5">
        停止
      </Button>

      {/* <canvas
        ref={canvasRef}
        style={{
          width: 1200,
          height: 1200,
        }}
        className="border border-red-500 m-auto mt-10"
      ></canvas> */}
    </div>
  );
}
