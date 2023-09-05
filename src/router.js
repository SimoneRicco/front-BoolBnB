import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import AppAbout from "./components/partials/AppAbout.vue";
import AppContacts from "./components/partials/AppContacts.vue";
import App404 from "./components/App404.vue";
import AppSignUp from "./components/partials/AppSignUp.vue";
import AppRegister from "./components/partials/AppRegister.vue";
import AppLoadAppartment from "./components/partials/AppLoadAppartment.vue";
import AppSearch from "./components/partials/AppSearch.vue";
import AppShow from "./components/partials/AppShow.vue";
import AppAdvancedResearch from "./components/partials/AppAdvancedResearch.vue"

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
      path: "/signup",
      name: "signup",
      component: AppSignUp,
    },
    {
      path: "/register",
      name: "register",
      component: AppRegister,
    },
    {
      path: "/loadApartment",
      name: "loadApartment",
      component: AppLoadAppartment,
    },
    {
      path: "/search",
      name: "search",
      component: AppSearch,
    },
    {
      path: "/apartments/:slug",
      name: "apartments.show",
      component: AppShow,
    },
    {
      path: "/AdvancedSearch",
      name: "search.advancedSearch",
      component: AppAdvancedResearch,
    },
  ],
});

export { router };
