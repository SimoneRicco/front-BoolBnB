import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import AppContacts from "./components/partials/AppContacts.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/contacts",
      name: "contacts",
      component: AppContacts,
    },
  ],
});

export { router };
