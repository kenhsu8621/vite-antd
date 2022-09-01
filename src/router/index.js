import { createRouter, createWebHistory } from "vue-router"

let history = createWebHistory()
const routes = [
  {
    path: "/vite-antd/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/vite-antd/model_viewer",
    name: "ModelViewer",
    component: () => import("../components/ModelViewer.vue")
  },
  // finally the default route, when none of the above matches: 
  {
    path: "/vite-antd/404",
    name: "PageNotFound",
    component: () => import("../views/PageNotFound.vue")
  },
  {
    path: "/:pathMatch(.*)",
    name: "PageNotFound",
    component: () => import("../views/PageNotFound.vue")
  }
]

export default createRouter({ history, routes })