import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
class ThreeClass {
  _info = {
    width: 1200,
    height: 1200,
  };
  scene = null;
  camera = null;
  controls = null;
  _renderer = null;

  constructor() {
    this.scene = new THREE.Scene(); // 场景
    this.camera = new THREE.PerspectiveCamera(
      75,
      this._info.width / this._info.height,
      0.1,
      1000
    ); // 透视摄像机
    this._renderer = new THREE.WebGLRenderer(); // 渲染器
    this._renderer.setSize(this._info.width, this._info.height); // 设置渲染器大小
    this.createdControl();
    this.createdGui();
  }

  createdControl() {
    // 创建控制器
    this.controls = new OrbitControls(this.camera, this.element);

    // 设置控制器阻尼
    this.controls.enableDamping = true;

    // 阻尼系数 就是鼠标拖拽的灵敏度
    // this.controls.dampingFactor = 0.05;
    // this.controls.autoRotate = true; // 自动旋转

    // this.controls.addEventListener("change", () => {
    //   // 浏览器控制台查看相机位置变化
    //   console.log("camera.position", this.camera.position);
    //   this.render();
    // }); //监听鼠标、键盘事件
  }

  createdGui() {
    this.gui = new GUI();
  }

  gender(fn) {
    return typeof fn === "function" && fn(THREE);
  }

  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  get element() {
    if (this.renderer) {
      return this.renderer.domElement;
    }
    return null;
  }
  get renderer() {
    return this._renderer;
  }
}

export default ThreeClass;
