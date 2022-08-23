import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import "./main.scss"

createApp(App).use(Antd).use(router).mount("#app")
