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
import Header from '../components/Header.vue';

</script>

<style lang="scss" scoped>
  .layout {
    // display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #ccc;
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>