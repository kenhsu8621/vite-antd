<template>
  <div class="layout">
    <Header></Header>
    <ModelViewer></ModelViewer>
    <div class="section-divider"></div>

    <section class="bottom-section">
      <div class="bottom-section-title">Bottom Section</div>
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
    </section>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import Header from "../components/Header.vue";
  import ModelViewer from "../components/ModelViewer.vue";
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .layout {
    min-height: 100vh;
    background: rgb(36, 36, 36);

    .section-divider {
      height: 20px;
      background: linear-gradient(
        -90deg,
        rgb(24, 252, 176),
        rgba(127, 255, 212, 1),
        rgba(42, 55, 70, 1),
        rgba(36, 36, 36, 1),
        rgba(42, 55, 70, 1),
        rgba(127, 255, 212, 1),
        rgb(24, 252, 176)
      );
      background-size: 500% 500%;
      animation: gradient 20s ease-in-out infinite alternate;

      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    }

    .bottom-section {
      padding-top: 3vh;
      font-size: 18px;
      color: $mainGreen;
      text-align: center;
      width: 800px;
      margin: auto;

      .bottom-section-title {
        font-size: 100px;
        color: $mainGreen;
        text-align: center;
      }
    }
  }
</style>
