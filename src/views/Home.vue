<template>
  <div class="layout">
    <Header></Header>
    <!-- <a href="https://vitejs.dev" target="_blank">
      <img src="../assets/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a> -->
  </div>
</template>

<script setup>
  import Header from "../components/Header.vue";
</script>

<style lang="scss" scoped>
  .layout {
    // display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .layout {
    background: rgb(251, 230, 253);
    background: linear-gradient(
      44deg,
      rgba(251, 230, 253, 1) 0%,
      rgba(104, 153, 228, 1) 84%,
      rgba(99, 183, 235, 1) 100%
    );
  }
</style>
