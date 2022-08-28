<template>
  <div class="layout">
    <Header></Header>
    <ModelViewer></ModelViewer>
    <div style="font-size: 100px; color: aquamarine; text-align: center">Bottom Section</div>
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
    background: rgb(36, 36, 36);
  }
</style>
