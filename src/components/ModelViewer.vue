<template>
  <!-- <div class="model-viewer" ref="modelViewer" :style="{ background: colorList[selectedColor].background }"> -->
  <div class="model-viewer" ref="modelViewer">
    <!-- <div class="transition-mask" refs="transitionMask" v-show="isChanging"></div> -->
    <a-spin size="large" v-show="isChanging" />
    <div class="model-canvas" ref="modelCanvas" @mousedown="setClicked()" @mouseup="showHints = false"></div>
    <div class="hello" ref="hello" v-if="showHello">Hello !</div>
    <div class="tool-box">
      <a-space class="color-picker">
        <div class="color-picker-container" v-for="color in colorList">
          <button
            class="color-picker-btn"
            :style="{ background: color.value }"
            @click="changeViewerBackground(color.background)"
          >
            &nbsp;
          </button>
        </div>
      </a-space>
      <div class="control-btn">
        <a-space>
          <a-button shape="round" @click="toggleAnimation">{{ isStop ? "Play" : "Stop" }}</a-button>
          <a-button shape="round" @click="toggleGrid">{{ ishideGrid ? "Grid" : "Grid" }}</a-button>
        </a-space>
      </div>
      <div class="change-model">
        <a-space>
          <a-button shape="round" @click="">Model</a-button>
        </a-space>
      </div>
    </div>
  </div>
  <span v-if="showHints">Hints Here!</span>
</template>

<script>
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
  import { defineComponent } from "vue";

  let mixer, clips, gridHelper;

  export default defineComponent({
    data() {
      return {
        gridSize: 500,
        divisions: 50,
        isStop: true,
        ishideGrid: true,
        showHello: true,
        showHints: false,
        selectedColor: 0,
        isChanging: false,
        colorList: [
          {
            id: 0,
            name: "bg-red",
            value: "#da6d9c",
            background:
              "linear-gradient(45deg,rgba(199, 103, 150, 1) 0%,rgba(245, 196, 170, 1) 40%,rgba(222, 144, 180, 1) 71%,rgba(204, 69, 187, 1) 100%)",
          },
          {
            id: 1,
            name: "bg-yellow",
            value: "#daca6d",
            background:
              "linear-gradient(45deg, rgba(255,190,68,1) 0%, rgba(240,245,170,1) 40%, rgba(203,222,144,1) 85%, rgba(86,214,165,1) 100%)",
          },
          {
            id: 2,
            name: "bg-green",
            value: "#6ddaa5",
            background:
              "linear-gradient(45deg,rgba(47, 199, 151, 1) 0%,rgba(170, 245, 221, 1) 40%,rgba(144, 222, 198, 1) 71%,rgba(69, 187, 204, 1) 100%)",
          },
          {
            id: 3,
            name: "bg-velvet",
            value: "#d0c0f7",
            background:
              "linear-gradient(45deg, rgb(251, 230, 253) 0%, rgb(191, 176, 244) 60%, rgb(104, 153, 228) 100%)",
          },
          {
            id: 4,
            name: "bg-white",
            value: "#fff",
            background:
              "linear-gradient(47deg, rgba(204,206,213,1) 0%, rgba(240,240,240,1) 40%, rgba(233,236,252,1) 71%, rgba(196,196,196,1) 100%)",
          },
          {
            id: 5,
            name: "bg-black",
            value: "#333",
            background:
              "linear-gradient(47deg, rgba(0,85,83,1) 0%, rgba(27,27,27,1) 40%, rgba(33,33,33,1) 71%, rgba(0,18,119,1) 100%)",
          },
        ],
      };
    },
    mounted() {
      // this.initModel();
      this.initDefault();
    },
    methods: {
      // 3d model functions
      initDefault() {
        const clock = new THREE.Clock();

        // 建立場景
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(this.$refs.modelCanvas.clientWidth, this.$refs.modelCanvas.clientHeight);
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
        // 載入gltf模型
        const loader = new GLTFLoader();
        let model;

        const modelSrc = "/static/models/vue-logo.glb";
        // const modelSrc = "/static/models/vue.glb";
        // const modelSrc = "/static/models/sb.glb";
        loader.load(
          // resource URL
          modelSrc,
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
          requestAnimationFrame(animate);
          const delta = clock.getDelta();
          mixer.update(delta);
          controls.update();
          renderer.render(scene, camera);
        }
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

      setClicked() {
        this.showHints = true;
        // this.showHello = false;
        this.$refs.hello.classList.add("fade");
        console.log(this.$refs.hello);
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
        console.log(this.$refs.modelViewer.style);
        // this.selectedColor = id;
      },
    },
  });
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .model-viewer {
    position: relative;
    transition: 1s all;
    background: linear-gradient(45deg, rgb(251, 230, 253) 0%, rgb(191, 176, 244) 60%, rgb(104, 153, 228) 100%);

    .model-canvas {
      aspect-ratio: 16/9;
      width: 90vw;
      margin: auto;
      padding-top: 70px;
    }

    .hello {
      position: absolute;
      top: 10vh;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      width: 300px; /* Need a specific value to work */
      text-align: center;
      font-size: 100px;
      color: #fff;
      text-shadow: #999 0px 2px 3px;
      cursor: default;
    }

    .fade {
      transform: translateY(-50px);
      opacity: 0;
      transition: ease-in-out 1s;
    }
    .tool-box {
      position: absolute;
      width: 150px;
      border-radius: 12px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.5);
      left: 11vw;
      // bottom: 2vh;
      top: 10vh;
      box-shadow: $mainBoxShadow;

      .color-picker {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding-bottom: 10px;
        .color-picker-container {
          text-align: center;
          .color-picker-btn {
            cursor: pointer;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            border: 2px solid #ccc;
          }
        }
      }
      .control-btn,
      .change-model {
        padding: 10px 0;
        border-top: 1px solid #dedede;

        .ant-btn {
          background: $bgHalfOpacity;

          &:hover {
            color: #9b9b9b;
            border-color: #9b9b9b;
          }
        }
      }
    }
    .transition-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.5);
      transition: all 1s;
    }

    .ant-spin {
      position: absolute;
      top: 45%;
      left: 50vw;
    }
  }
  // .bg-red {
  //   background: linear-gradient(
  //     45deg,
  //     rgba(199, 103, 150, 1) 0%,
  //     rgba(245, 196, 170, 1) 40%,
  //     rgba(222, 144, 180, 1) 71%,
  //     rgba(204, 69, 187, 1) 100%
  //   );
  //   transition: 2s background-color;
  // }
  // .bg-yellow {
  //   background: linear-gradient(
  //     45deg,
  //     rgba(255, 190, 68, 1) 0%,
  //     rgba(240, 245, 170, 1) 40%,
  //     rgba(203, 222, 144, 1) 85%,
  //     rgba(86, 214, 165, 1) 100%
  //   );
  //   transition: 2s background-color;
  // }
  // .bg-green {
  //   background: linear-gradient(
  //     45deg,
  //     rgba(47, 199, 151, 1) 0%,
  //     rgba(170, 245, 221, 1) 40%,
  //     rgba(144, 222, 198, 1) 71%,
  //     rgba(69, 187, 204, 1) 100%
  //   );
  //   transition: 2s background-color;
  // }
  // .bg-velvet {
  //   background: linear-gradient(45deg, rgb(251, 230, 253) 0%, rgb(191, 176, 244) 60%, rgb(104, 153, 228) 100%);
  // }
  // .bg-white {
  //   background: linear-gradient(
  //     47deg,
  //     rgba(204, 206, 213, 1) 0%,
  //     rgba(240, 240, 240, 1) 40%,
  //     rgba(233, 236, 252, 1) 71%,
  //     rgba(196, 196, 196, 1) 100%
  //   );
  //   transition: 2s background-color;
  // }
  // .bg-black {
  //   background: linear-gradient(
  //     47deg,
  //     rgba(0, 85, 83, 1) 0%,
  //     rgba(27, 27, 27, 1) 40%,
  //     rgba(33, 33, 33, 1) 71%,
  //     rgba(0, 18, 119, 1) 100%
  //   );
  //   transition: 2s background-color;
  // }
</style>
