<template>
  <div class="layout">
    <!-- <img src="../assets/images/falldown.jpg" alt="Oops!" /> -->

    <div class="text-container">
      <h1>Oops !</h1>
      <h2>Something went wrong !</h2>
      <h3>Error 404 Page Not Found</h3>
      <a-button shape="round"> Back To Home</a-button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";
  .layout {
    position: relative;
    min-height: 100vh;
    text-align: center;
    background-image: url("../assets/images/falldown.jpg");
    background-position: left center;
    background-repeat: no-repeat;
    background-size: cover;

    img {
      position: fixed;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .text-container {
      position: absolute;
      top: 25vh;
      right: 0;
      width: 40vw;
      height: 50vh;
      text-align: center;
    }

    h1 {
      color: #91e0b9;
      font-size: 120px;
      margin-bottom: 20px;
    }
    h2 {
      color: #42a177;
      font-size: 30px;
    }
  }
</style>
