import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import AppAbout from "./components/partials/AppAbout.vue";
import AppContacts from "./components/partials/AppContacts.vue";
import App404 from "./components/App404.vue";
import AppRegister from "./components/partials/AppRegister.vue";

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
    {
      path: "/contacts",
      name: "contacts",
      component: AppContacts,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "page404",
      component: App404,
    },
    {
      path: "/register",
      name: "register",
      component: AppRegister,
    },
  ],
});

export { router };
