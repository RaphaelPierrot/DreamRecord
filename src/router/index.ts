// src/router/index.ts ou src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import WelcomePage from "../components/WelcomePage.vue";
import AuthPage from "@/components/Authentification/AuthPage.vue";
import HomePage from "@/components/UserPage/HomePage.vue";
import DreamDiaries from "@/components/UserPage/composant/DreamDiaries/DreamDiaries.vue";
import Dashboard from "@/components/UserPage/composant/Dashboard/Dashboard.vue";
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
/*// Fonction pour vérifier si l'utilisateur est authentifié
const isAuthenticated = () => {
  // Implémentez la logique pour vérifier le statut d'authentification
  // Par exemple, vérifier si un token valide existe dans localStorage
  return !!localStorage.getItem('authToken');
};

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'auth' });
  } else {
    next();
  }
});*/
export default router;
