import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import AppAbout from "./components/partials/AppAbout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: AppAbout,
    },
  ],
});

export { router };
