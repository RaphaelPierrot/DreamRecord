// src/router/index.ts ou src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import WelcomePage from "../components/WelcomePage.vue";
import AuthPage from "@/components/Authentification/AuthPage.vue";
import HomePage from "@/components/UserPage/HomePage.vue";
import DreamDiaries from "@/components/UserPage/DreamDiaries/DreamDiaries.vue";
import Dashboard from "@/components/UserPage/Dashboard/Dashboard.vue";
import { useUserStore } from "@/store";
const routes = [
  {
    path: "/",
    name: "welcome",
    component: WelcomePage,
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthPage,
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/dream-diaries",
        name: "dream-diaries",
        component: DreamDiaries,
      },
    ],
  },

  // Ajoutez d'autres routes si nécessaire
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Guard de navigation
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    await userStore.fetchUser();
    if (!userStore.isAuthenticated) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
