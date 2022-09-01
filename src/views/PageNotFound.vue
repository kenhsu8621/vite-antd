<script setup>
  import { MehOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <div class="layout">
    <div class="text-container">
      <h1><MehOutlined class="meh" />ops!</h1>
      <h2>Page Not Found</h2>
      <h3>There is nothing here...</h3>
      <router-link :to="{ name: 'Home' }">
        <a-button shape="round"><strong>Take Me Home</strong></a-button>
      </router-link>
    </div>
  </div>
</template>

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

    .text-container {
      position: absolute;
      top: 15vh;
      right: 5vw;
      width: 40vw;
      height: 50vh;

      h1 {
        font-size: 10vw;
        background: linear-gradient(90deg, #71efb6, #66d0de);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        cursor: default;
        margin-bottom: 0;

        .meh {
          font-size: 8vw;
          color: #71efb6;
          margin-right: 5px;
          // transform: rotate(-0deg);
          animation: shake 2s ease-in-out infinite alternate;
        }

        @keyframes shake {
          to {
            transform: rotate(-15deg);
          }
        }
      }

      h2 {
        color: #fff;
        font-size: 2.5vw;
        margin-top: -10px;
        margin-bottom: 10px;
      }

      h3 {
        color: #6f6f6f;
        font-size: 1.5vw;
        margin-bottom: 20px;
      }

      .ant-btn {
        height: 40px;
        font-size: 16px;
        color: #fff;
        background: linear-gradient(90deg, #2bef97, #17c0d6);

        &:hover {
          background: linear-gradient(90deg, #2bef97, #7173ef);
        }
      }
    }
  }
</style>
