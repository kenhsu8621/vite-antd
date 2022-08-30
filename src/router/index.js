import { createRouter, createWebHistory } from "vue-router"

let history = createWebHistory()
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("/src/views/Home.vue")
  },
  // finally the default route, when none of the above matches: 
  {
    path: "/404",
    name: "PageNotFound",
    component: () => import("/src/views/PageNotFound.vue")
  },
  {
    path: "/:pathMatch(.*)",
    name: "PageNotFound",
    component: () => import("/src/views/PageNotFound.vue")
  }
]

export default createRouter({ history, routes })