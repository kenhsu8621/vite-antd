<template>
  <div class="navbar">
    <a-row>
      <a-col :span="6" class="left">
        <a href="" class="kh-logo"> <img src="../assets/images/kh-frame.svg" alt="kh-logo" width="50" /> </a>
      </a-col>
      <a-col :span="12" class="center">
        <!-- <a-menu class="" v-model:selectedKeys="current" mode="horizontal">
          <a-menu-item key="mail">
            <template #icon>
              <mail-outlined />
            </template>
            Avatar
          </a-menu-item>

          <a-sub-menu key="sub1">
            <template #icon>
              <setting-outlined />
            </template>
            <template #title>Catagories</template>
            <a-menu-item-group title="Item 1">
              <a-menu-item key="setting:1">Option 1</a-menu-item>
              <a-menu-item key="setting:2">Option 2</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="Item 2">
              <a-menu-item key="setting:3">Option 3</a-menu-item>
              <a-menu-item key="setting:4">Option 4</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>

          <a-menu-item key="app" disabled>
            <template #icon>
              <appstore-outlined />
            </template>
            About
          </a-menu-item>

          <a-menu-item key="alipay">
            <a href="https://antdv.com" target="_blank" rel="noopener noreferrer"> Links </a>
          </a-menu-item>
        </a-menu> -->
        <a-space>
          <a class="nav-link">Home</a>
          <a class="nav-link">Catagories</a>
          <a class="nav-link">About</a>
          <a class="nav-link">Links</a>
        </a-space>
      </a-col>
      <a-col :span="6" class="right">
        <!-- <a-button shape="circle">
          <template #icon><GlobalOutlined /></template>
        </a-button> -->
        <div class="lang-select" :class="{ expand: expandLangList }">
          <GlobalOutlined
            :style="{ fontSize: '20px', position: 'absolute', top: '8px', right: '8px' }"
            @click="toggleLangList"
          />
          <div class="current-lang" v-if="!showLangList">
            <span class="tw" v-if="language == 0">繁中</span>
            <span class="en" v-if="language == 1">EN</span>
          </div>

          <div class="lang-list" v-if="showLangList">
            <button class="tw" :class="language == 0 ? 'btn-active' : 'btn-inactive'" @click="setActiveLang(0)">
              繁中
            </button>
            <button class="en" :class="language == 1 ? 'btn-active' : 'btn-inactive'" @click="setActiveLang(1)">
              English
            </button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { GlobalOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons-vue";
  const showLangList = ref(false);
  const expandLangList = ref(false);
  const language = ref(0);

  function setActiveLang(lang) {
    language.value = lang;
    expandLangList.value = false;
    showLangList.value = false;
    // this.$cookies.set("language", lang);
    // return history.go(0);
  }

  function toggleLangList() {
    if (showLangList.value) {
      expandLangList.value = false;
      showLangList.value = false;
    } else {
      expandLangList.value = true;
      setTimeout(() => {
        showLangList.value = true;
      }, 200);
    }
  }
</script>

<style lang="scss" scoped>
  $bg-half-opacity: rgba(255, 255, 255, 0.5);
  .navbar {
    height: 70px;
    // border-bottom: 1px solid #ccc;
    background-color: $bg-half-opacity;
    filter: blur(0px);
    box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.25);
    // background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    // background-size: 400% 400%;
    // animation: gradient 15s ease infinite;

    // @keyframes gradient {
    //   0% {
    //     background-position: 0% 50%;
    //   }
    //   50% {
    //     background-position: 100% 50%;
    //   }
    //   100% {
    //     background-position: 0% 50%;
    //   }
    // }
    .ant-col {
      line-height: 70px;
    }

    .center {
      text-align: center;
      a {
        font-size: 20px;
        color: #213547;
      }
    }

    .left {
      .kh-logo {
        margin-left: 15px;
      }
    }

    .right {
      .lang-select {
        width: 80px;
        line-height: 22px;
        position: absolute;
        padding: 6px;
        top: 16px;
        right: 15px;
        color: #2173c9;
        background-color: $bg-half-opacity;
        border-radius: 19px;
        border: 1px solid #2173c9;
        transition: all 0.2s ease-in-out;

        svg {
          margin-top: 2px;
          margin-right: 2px;
          font-size: 20px;
        }

        .current-lang {
          font-size: 14px;
          font-weight: bold;
          line-height: 24px;
          padding-left: 6px;
        }

        .en {
          margin-left: 6px;
        }

        .lang-list {
          width: 146px;

          .btn-active,
          .btn-inactive {
            width: 38%;
            height: 23px;
            padding: 0 6px;
            font-size: 12px;
            border-radius: 15px;
            cursor: pointer;
          }

          .btn-active {
            color: #fff;
            background-color: #2173c9;
            border: 1px solid #2173c9;
          }

          .btn-inactive {
            color: #2173c9;
            background-color: transparent;
            border: 1px solid #2173c9;
          }
        }
      }

      .expand {
        width: 160px;
        transition: all 0.2s ease-in-out;
      }
    }
  }
</style>
