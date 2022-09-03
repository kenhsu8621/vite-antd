<script setup>
  defineProps({
    size: Number,
  });
</script>

<template>
  <div class="backdrop">
    <span
      class="custom-spin dot-animation"
      :style="{
        fontSize: size + 'px',
        width: size + 'px',
        height: size + 'px',
      }"
    >
      <i :style="{ width: size / 2 - 1 + 'px', height: size / 2 - 1 + 'px' }"></i>
      <i :style="{ width: size / 2 - 1 + 'px', height: size / 2 - 1 + 'px' }"></i>
      <i :style="{ width: size / 2 - 1 + 'px', height: size / 2 - 1 + 'px' }"></i>
      <i :style="{ width: size / 2 - 1 + 'px', height: size / 2 - 1 + 'px' }"></i>
    </span>
  </div>
</template>

<style lang="scss" scoped>
  .backdrop {
    position: fixed;
    height: 100vh;
    background: rgba(50, 50, 50, 0.3);
    .custom-spin {
      position: fixed;
      display: inline-block;
      font-size: 20px;
      width: 20px;
      height: 20px;
      top: 45vh;
      left: 0;
      right: 0;
      margin: 0 auto;

      i {
        width: 9px;
        height: 9px;
        border-radius: 100%;
        transform: scale(0.75);
        display: block;
        position: absolute;
        opacity: 0.3;
        animation: antSpinMove 1s infinite linear alternate;
        transform-origin: 50% 50%;

        // &:nth-child(1) {
        //   left: 0;
        //   top: 0;
        //   background-color: rgb(237, 175, 104);
        // }
        // &:nth-child(2) {
        //   right: 0;
        //   top: 0;
        //   animation-delay: 0.4s;
        //   background-color: rgb(39, 209, 135);
        // }
        // &:nth-child(3) {
        //   right: 0;
        //   bottom: 0;
        //   animation-delay: 0.8s;
        //   background-color: rgb(92, 92, 255);
        // }
        // &:nth-child(4) {
        //   left: 0;
        //   bottom: 0;
        //   animation-delay: 1.2s;
        //   background-color: rgb(115, 43, 170);
        // }
        &:nth-child(1) {
          left: 0;
          top: 0;
          background-color: rgb(191, 255, 227);
        }
        &:nth-child(2) {
          right: 0;
          top: 0;
          animation-delay: 0.4s;
          background-color: rgb(149, 255, 209);
        }
        &:nth-child(3) {
          right: 0;
          bottom: 0;
          animation-delay: 0.8s;
          background-color: rgb(86, 247, 177);
        }
        &:nth-child(4) {
          left: 0;
          bottom: 0;
          animation-delay: 1.2s;
          background-color: rgb(39, 209, 135);
        }
      }
    }

    .dot-animation {
      transform: rotate(45deg);
      animation: antRotate 1.2s infinite linear;
    }

    @keyframes antSpinMove {
      to {
        opacity: 1;
      }
    }
    @keyframes antRotate {
      to {
        transform: rotate(405deg);
      }
    }
  }
</style>
