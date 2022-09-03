import { createApp } from "vue";
import i18n from "./plugins/i18n"
import App from "./App.vue";
import router from "./router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./assets/scss/main.scss";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABEXrvdXjAYdXGD87yQD2H1oQhUPviX94",
    authDomain: "kenhsu-dev.firebaseapp.com",
    projectId: "kenhsu-dev",
    storageBucket: "kenhsu-dev.appspot.com",
    messagingSenderId: "331320821944",
    appId: "1:331320821944:web:7e9114586153f39ef7cc4d",
    measurementId: "G-JS1RXKD30S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createApp(App).use(i18n).use(Antd).use(router).mount("#app")
