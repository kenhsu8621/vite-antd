<template>
  <div class="navbar">
    <a-row>
      <a-col :span="6" class="left">
        <a class="kh-logo"> <img src="../assets/images/kh-frame.svg" alt="kh-logo" width="50" /> </a>
      </a-col>
      <a-col :span="12" class="center">
        <a-space>
          <a class="nav-link">Home</a>
          <a class="nav-link">Catagories</a>
          <a class="nav-link">About</a>
          <a class="nav-link">Links</a>
        </a-space>
      </a-col>
      <a-col :span="6" class="right">
        <div class="lang-select" :class="{ expand: expandLangList }">
          <GlobalOutlined
            :style="{ fontSize: '20px', position: 'absolute', top: '8px', right: '8px' }"
            @click="toggleLangList"
          />
          <div class="current-lang" v-if="!showLangList">
            <span class="tw" v-if="language == 0">中文</span>
            <span class="en" v-if="language == 1">EN</span>
          </div>

          <div class="lang-list" v-if="showLangList">
            <button class="tw" :class="language == 0 ? 'btn-active' : 'btn-inactive'" @click="setActiveLang(0)">
              中文
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
  @import "../assets/scss/variables.scss";

  .navbar {
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 70px;
    background-color: $bgThreeQuartersOpacity;
    filter: blur(0px);
    box-shadow: $mainBoxShadow;
    .ant-col {
      line-height: 70px;
    }

    .center {
      display: flex;
      justify-content: center;
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
        width: 70px;
        line-height: 22px;
        position: absolute;
        padding: 6px;
        top: 16px;
        right: 15px;
        color: $darkgrey;
        background-color: $bgThreeQuartersOpacity;
        border-radius: 19px;
        border: 1px solid #ddd;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
        cursor: pointer;

        svg {
          margin-top: 2px;
          margin-right: 2px;
          font-size: 20px;
        }

        .current-lang {
          font-size: 14px;
          font-weight: bold;
          line-height: 24px;
          padding-left: 3px;
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
            box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
          }

          .btn-active {
            background-color: $activeBtn;
            border: 1px solid #ddd;
          }

          .btn-inactive {
            color: $darkgrey;
            background-color: transparent;
            border: 1px solid #ddd;
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
