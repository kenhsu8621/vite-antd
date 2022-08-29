<template>
  <div class="model-viewer" id="modelViewer" ref="modelViewer">
    <!-- <div class="transition-mask" refs="transitionMask" v-show="isChanging"></div> -->
    <!-- <a-spin size="large" v-show="isChanging" /> -->
    <CustomSpin v-show="isChanging" :size="30"></CustomSpin>
    <div class="model-canvas" ref="modelCanvas" @mousedown="setClicked()" @mouseup="showHints = false"></div>
    <div class="hello" ref="hello" v-if="showHello">
      <span style="color: #fff">{{ $t("model_viewer.hello") }}</span>
      <!-- <span style="color: #c4f9f3">e</span>
      <span style="color: #c4f9f3">l</span>
      <span style="color: #c4f9f3">l</span>
      <span style="color: #c4f9f3">o</span> -->
      !
    </div>

    <div class="tool-box" ref="toolBox">
      <div class="color-picker">
        <div class="tool-title">{{ $t("model_viewer.color_picker") }}</div>
        <a-space class="color-picker-container">
          <div class="color-picker-grid" v-for="color in colorList">
            <button
              class="color-picker-btn"
              :style="{ background: color.value }"
              @click="changeViewerBackground(color.background)"
            >
              &nbsp;
            </button>
          </div>
        </a-space>
      </div>

      <div class="model-select">
        <div class="tool-title">{{ $t("model_viewer.model_select") }}</div>
        <a-space>
          <a-button shape="round" @click="initializeModel(0)" :class="{ 'active-model': currentModel == 0 }"
            ><i class="devicon-vuejs-plain"></i
          ></a-button>
          <a-button shape="round" @click="initializeModel(1)" :class="{ 'active-model': currentModel == 1 }"
            ><i class="devicon-threejs-original"></i
          ></a-button>
        </a-space>
      </div>

      <div class="model-tools">
        <div class="tool-title">{{ $t("model_viewer.model_tools") }}</div>
        <a-space class="model-tools-container">
          <a-button shape="round" @click="toggleAnimation">
            <span v-if="isStop"><caret-right-outlined :style="{ fontSize: '20px', paddingLeft: '5px' }" /></span>
            <span v-if="!isStop"><pause-outlined :style="{ fontSize: '20px' }" /></span>
          </a-button>
          <a-button :class="{ 'active-model': !ishideGrid }" shape="round" @click="toggleGrid">
            <span><table-outlined :style="{ fontSize: '20px' }" /></span
          ></a-button>
          <a-button :class="{ 'active-model': !disableHints }" shape="round" @click="disableHints = !disableHints">
            <span><question-outlined :style="{ fontSize: '20px' }" /></span
          ></a-button>
        </a-space>
      </div>
    </div>

    <div class="hint-box" v-if="showHints">
      <div class="hint-title">{{ $t("model_viewer.hints") }}</div>
      <div class="hint-item">
        <redo-outlined :style="{ fontSize: '14px', color: '#14cab5' }" /><span>{{ $t("model_viewer.rotate") }}</span>
      </div>
      <div class="hint-item">
        <drag-outlined :style="{ fontSize: '14px', color: '#14cab5' }" /><span>{{ $t("model_viewer.move") }}</span>
      </div>
      <div class="hint-item">
        <zoom-in-outlined :style="{ fontSize: '14px', color: '#14cab5' }" /><span>{{ $t("model_viewer.zoom") }}</span>
      </div>
    </div>

    <div class="technique-list" ref="techiqueList">
      <label>made with</label>
      <a href="https://threejs.org/" target="_blank">
        <a-tooltip title="three.js" color="rgba(255, 255, 255, 0.2)">
          <i class="devicon-threejs-original"></i> </a-tooltip
      ></a>
      <span class="divider">+</span>
      <a href="https://www.rhino3d.com/" target="_blank">
        <a-tooltip title="rhino3d" color="rgba(255, 255, 255, 0.2)">
          <img class="custom-icon" src="../assets/images/rhino.svg" alt="kh-logo" /> </a-tooltip
      ></a>
      <span class="divider">+</span>
      <a href="https://www.blender.org/" target="_blank">
        <a-tooltip title="blender" color="rgba(255, 255, 255, 0.2)">
          <i class="devicon-blender-original"></i> </a-tooltip
      ></a>
    </div>
  </div>
</template>

<script>
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
  import {
    CaretRightOutlined,
    PauseOutlined,
    TableOutlined,
    QuestionOutlined,
    RedoOutlined,
    DragOutlined,
    ZoomInOutlined,
  } from "@ant-design/icons-vue";
  import CustomSpin from "./CustomSpin.vue";
  import { defineComponent, nextTick } from "vue";

  let mixer, clips, gridHelper, clock;

  export default defineComponent({
    components: {
      CaretRightOutlined,
      PauseOutlined,
      TableOutlined,
      QuestionOutlined,
      RedoOutlined,
      DragOutlined,
      ZoomInOutlined,
      CustomSpin,
    },
    data() {
      return {
        gridSize: 500,
        divisions: 50,
        isStop: true,
        ishideGrid: true,
        showHello: true,
        showHints: false,
        disableHints: false,
        isClicked: false,
        selectedColor: 0,
        isChanging: false,
        currentModel: 0,
        colorList: [
          {
            id: 0,
            name: "bg-red",
            value: "#da6d9c",
            background:
              "linear-gradient(45deg,rgba(199, 103, 150, 1) 0%,rgba(245, 196, 170, 1) 40%,rgba(222, 144, 180, 1) 71%,rgba(204, 69, 187, 1) 100%)",
          },
          // {
          //   id: 1,
          //   name: "bg-yellow",
          //   value: "#e8be5b",
          //   background:
          //     "linear-gradient(45deg, rgba(255,190,68,1) 0%, rgba(240,245,170,1) 40%, rgba(203,222,144,1) 85%, rgba(86,214,165,1) 100%)",
          // },
          {
            id: 1,
            name: "bg-green",
            value: "#6ddaa5",
            background:
              "linear-gradient(135deg,rgba(47, 199, 151, 1) 0%,rgba(170, 245, 221, 1) 40%,rgba(144, 222, 198, 1) 71%,rgba(69, 187, 204, 1) 100%)",
          },
          {
            id: 2,
            name: "bg-blue",
            value: "#73c6f2",
            background:
              "linear-gradient(135deg, rgba(48,117,254,1) 0%, rgba(111,228,252,1) 60%, rgba(140,183,247,1) 85%, rgba(159,169,252,1) 100%)",
          },
          {
            id: 3,
            name: "bg-velvet",
            value: "#bdaff4",
            background:
              "linear-gradient(45deg, rgb(251, 230, 253) 0%, rgb(191, 176, 244) 60%, rgb(104, 153, 228) 100%)",
          },
          {
            id: 4,
            name: "bg-white",
            value: "#fff",
            background:
              "linear-gradient(135deg, rgba(204,206,213,1) 0%, rgba(240,240,240,1) 40%, rgba(233,236,252,1) 71%, rgba(196,196,196,1) 100%)",
          },
          {
            id: 5,
            name: "bg-black",
            value: "#333",
            background:
              "linear-gradient(45deg, rgba(0,85,83,1) 0%, rgba(27,27,27,1) 40%, rgba(33,33,33,1) 71%, rgba(0,18,119,1) 100%)",
          },
        ],
      };
    },
    mounted() {
      this.initializeModel(0);
    },
    methods: {
      initializeModel(modelType) {
        nextTick(() => {
          this.clearPreviousModel();
          clock = new THREE.Clock();

          // 建立場景
          const scene = new THREE.Scene();
          const renderer = new THREE.WebGLRenderer({ antialias: true });
          // renderer.setSize(this.$refs.modelCanvas.clientWidth, this.$refs.modelCanvas.clientHeight);
          renderer.setSize(this.$refs.modelCanvas.clientWidth, this.$refs.modelCanvas.clientWidth / 2);
          // renderer.toneMapping = THREE.ReinhardToneMapping;
          // renderer.toneMappingExposure = 2.3;
          renderer.outputEncoding = THREE.sRGBEncoding;
          renderer.setClearColor(0x000000, 0); // set transparent bg
          this.$refs.modelCanvas.appendChild(renderer.domElement);

          // 加入環境及陰影
          const pmremGenerator = new THREE.PMREMGenerator(renderer);
          scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 1).texture;

          // 建立格線
          const colorCenterLine = 0xffffff;
          const colorGrid = 0xffffff;
          gridHelper = new THREE.GridHelper(this.gridSize, this.divisions, colorCenterLine, colorGrid);
          gridHelper.position.set(0, -5, 0);
          gridHelper.visible = false;
          scene.add(gridHelper);
          //TODO: 建立格線同時castShadow

          // 載入gltf模型
          const loader = new GLTFLoader();
          let model;

          const modelSrc = ["/static/models/vue.glb", "/static/models/threejs.glb"];
          // const modelSrc = "/static/models/vue.glb";
          // const modelSrc = "/static/models/sb.glb";
          this.currentModel = modelType;
          loader.load(
            // resource URL
            modelSrc[modelType],
            // called when the resource is loaded
            (gltf) => {
              model = gltf.scene;
              clips = gltf.animations || [];
              model.scale.setScalar(20);
              model.position.set(0, -5, -2);
              model.castShadow = true;
              scene.add(model);
              mixer = new THREE.AnimationMixer(model);
              // clips.forEach((clip) => {
              //   mixer.clipAction(clip).play();
              // });
              animate();
            },
            (xhr) => {
              // console.log(((xhr.loaded / xhr.total) * 100).toFixed(0));
            },
            (error) => {
              console.error("An error happened", error);
            }
          );

          // 建立相機
          const camera = new THREE.PerspectiveCamera(
            45, //fov
            // this.$refs.modelCanvas.clientWidth / this.$refs.modelCanvas.clientHeight,
            2.2, // 顯示長寬比
            0.5, //near
            5000 //far
          );
          camera.position.x = 0;
          camera.position.y = 0;
          camera.position.z = 25;

          // 縮放、平移、旋轉等控制
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.minZoom = 1;
          controls.maxZoom = 1.5;
          controls.update();

          // 建立光源
          const dLight = new THREE.DirectionalLight(0x404040, 1);
          dLight.position.set(0, 1, 0);
          dLight.castShadow = true;
          scene.add(dLight);

          const aLight = new THREE.AmbientLight(0x4040404, 100);
          scene.add(aLight);

          const light = new THREE.PointLight(0xc4c4c4, 1);
          light.position.set(0, 300, 500);
          scene.add(light);
          const light2 = new THREE.PointLight(0xc4c4c4, 3);
          light2.position.set(500, 100, 0);
          scene.add(light2);
          const light3 = new THREE.PointLight(0xc4c4c4, 1);
          light3.position.set(0, 100, -500);
          scene.add(light3);
          const light4 = new THREE.PointLight(0xc4c4c4, 1);
          light4.position.set(-500, 300, 500);
          scene.add(light4);

          // 即時視窗更新
          function animate() {
            // model.rotation.y += 0.01;
            setTimeout(() => {
              requestAnimationFrame(animate);
              const delta = clock.getDelta();
              if (mixer) mixer.update(delta);
              controls.update();
              renderer.render(scene, camera);
            }, 10);
          }
        });
      },

      toggleAnimation() {
        if (this.isStop) {
          clips.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
        } else {
          clips.forEach((clip) => {
            mixer.clipAction(clip).stop();
          });
        }
        this.isStop = !this.isStop;
      },

      toggleGrid() {
        if (this.ishideGrid) {
          gridHelper.visible = true;
        } else {
          gridHelper.visible = false;
        }
        this.ishideGrid = !this.ishideGrid;
      },

      changeViewerBackground(name) {
        console.log(name);
        // this.$refs.modelViewer.classList.toggle("alt");
        // this.$refs.modelViewer.style.background = "white";
        this.$refs.modelViewer.style.opacity = 0.7;
        this.isChanging = true;
        setTimeout(() => {
          this.$refs.modelViewer.style.opacity = 1;
          this.$refs.modelViewer.style.background = name;
          this.isChanging = false;
        }, 1000);
      },

      clearPreviousModel() {
        this.$refs.modelCanvas.innerHTML = "";
        this.isStop = true;
        clock = null;
        mixer = 0;
        clips = null;
        gridHelper = null;
      },

      setClicked() {
        if (!this.disableHints) this.showHints = true;
        this.isClicked = true;
        this.ishideGrid = true;
        this.$refs.toolBox.classList.add("fade-in-left");
        this.$refs.techiqueList.classList.add("fade-in-right");
        this.$refs.hello.classList.add("fade-out");
        setTimeout(() => {
          this.$refs.hello.style.display = "none";
        }, 2000);
      },
    },
  });
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .model-viewer {
    position: relative;
    transition: 1s all;
    background: linear-gradient(
      135deg,
      rgba(204, 206, 213, 1) 0%,
      rgba(240, 240, 240, 1) 40%,
      rgba(233, 236, 252, 1) 71%,
      rgba(196, 196, 196, 1) 100%
    );
    box-shadow: $mainBoxShadow;

    .model-canvas {
      width: 90vw;
      margin: auto;
      padding-top: 70px;
      display: flex;
      justify-content: center;
      text-align: center;
    }

    .hello {
      position: absolute;
      width: 600px;
      top: 10vh;
      left: 0;
      right: 0;
      margin: 0 auto;
      text-align: center;
      font-size: 6vw;
      background: linear-gradient(0deg, #71efb6, #a2d8cf);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: default;

      @media (max-width: 1920px) {
        font-size: 8vw;
      }
    }

    .tool-box {
      position: absolute;
      width: 150px;
      border-radius: 12px;
      padding: 10px;
      background: $bgThreeQuartersOpacity;
      top: 15vh;
      opacity: 0;
      box-shadow: $mainBoxShadow;

      .tool-title {
        text-align: center;
        margin-bottom: 5px;
        color: #666;
        cursor: default;
      }

      .color-picker {
        .color-picker-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding-bottom: 10px;
          .color-picker-grid {
            text-align: center;
            .color-picker-btn {
              cursor: pointer;
              width: 25px;
              height: 25px;
              border-radius: 50%;
              border: 2px solid #ddd;
              box-shadow: $antBtnBoxShadow;
            }
          }
        }
      }

      .model-select,
      .model-tools {
        padding: 10px 0;
        border-top: 1px solid #ddd;

        .model-tools-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .ant-btn {
          width: 60px;
          background: $bgThreeQuartersOpacity;

          &:hover,
          &:focus {
            color: rgba(0, 0, 0, 0.85);
            border: 1px solid #ddd;
          }
          &:hover {
            background: $mainLightgreen;
          }

          i {
            font-size: 25px;
            font-weight: bold;
            color: #333;
          }
        }
        .active-model {
          background: $mainLightgreen;
        }
      }
    }

    .hint-box {
      position: absolute;
      width: 200px;
      border-radius: 12px;
      padding: 10px;
      background: $bgThreeQuartersOpacity;
      bottom: 2vh;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      box-shadow: $mainBoxShadow;

      .hint-title {
        text-align: center;
        margin-bottom: 5px;
        color: #666;
        cursor: default;
      }

      .hint-item {
        span {
          margin-left: 5px;
        }
      }
    }

    .technique-list {
      position: absolute;
      bottom: 2vh;
      right: 0;
      opacity: 0;

      label {
        color: #fff;
      }
      .divider {
        font-size: 20px;
        color: #fff;
        margin: 0 3px;
      }
      i {
        font-size: 30px;
        font-weight: bold;
        color: #fff;
      }
      .custom-icon {
        width: 40px;
        margin-top: -15px;
      }
    }
    .fade-in-left {
      transform: translateX(3vw);
      opacity: 1;
      transition: all ease-in-out 1.5s;
    }

    .fade-in-right {
      transform: translateX(-3vw);
      opacity: 1;
      transition: all ease-in-out 1.5s;
    }

    .fade-out {
      transform: translateY(-5vh);
      opacity: 0;
      transition: all ease-in-out 1s;
    }

    .transition-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.5);
      transition: all ease-in-out 1s;
    }

    .custom-spin {
      position: absolute;
      width: 50px;
      top: 45vh;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
</style>
