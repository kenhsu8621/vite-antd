<template>
  <div class="layout">
    <Header></Header>
    <ModelViewer></ModelViewer>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import Header from "../components/Header.vue";
  import ModelViewer from "../components/ModelViewer.vue";
</script>

<style lang="scss" scoped>
  .layout {
    min-height: 100vh;
    // background: rgb(251, 230, 253);
    // background: linear-gradient(
    //   45deg,
    //   rgba(199, 103, 150, 1) 0%,
    //   rgba(245, 196, 170, 1) 40%,
    //   rgba(222, 144, 180, 1) 71%,
    //   rgba(204, 69, 187, 1) 100%
    // );
    // background: linear-gradient(
    //   45deg,
    //   rgba(255, 190, 68, 1) 0%,
    //   rgba(240, 245, 170, 1) 40%,
    //   rgba(203, 222, 144, 1) 85%,
    //   rgba(86, 214, 165, 1) 100%
    // );
    // background: linear-gradient(
    //   45deg,
    //   rgba(47, 199, 151, 1) 0%,
    //   rgba(170, 245, 221, 1) 40%,
    //   rgba(144, 222, 198, 1) 71%,
    //   rgba(69, 187, 204, 1) 100%
    // );
    // background: linear-gradient(
    //   45deg,
    //   rgba(251, 230, 253, 1) 0%,
    //   rgba(191, 176, 244, 1) 60%,
    //   rgba(104, 153, 228, 1) 100%
    // );
    // background: linear-gradient(
    //   47deg,
    //   rgba(204, 206, 213, 1) 0%,
    //   rgba(240, 240, 240, 1) 40%,
    //   rgba(233, 236, 252, 1) 71%,
    //   rgba(196, 196, 196, 1) 100%
    // );
    // background: linear-gradient(
    //   47deg,
    //   rgba(0, 85, 83, 1) 0%,
    //   rgba(27, 27, 27, 1) 40%,
    //   rgba(33, 33, 33, 1) 71%,
    //   rgba(0, 18, 119, 1) 100%
    // );
    // background: rgb(191, 176, 244);
    .model-canvas {
      width: 60vw;
      height: 60vh;
      margin: auto;
    }
  }
</style>
