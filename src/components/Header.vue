<template>
  <div class="navbar">
  <a-menu v-model:selectedKeys="current" mode="horizontal">
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
      <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
        Links
      </a>
    </a-menu-item>
  </a-menu>
  </div>
</template>

<script setup>
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';

</script>

<style lang="scss" scoped>
  .navbar {
    // height:80px;
    // background-color: aqua;
  }
</style>
