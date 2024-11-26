// main.js ou main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router"; // Importer le routeur
// Importation des composants Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Importation des icônes spécifiques
import {
  faBook,
  faMoon,
  faBrain,
  faEnvelope,
  faLock,
  faUser,
  faEye,
  faEyeSlash,
  faBell,
  faTimes,
  faLightbulb,
  faChartBar,
  faSignOutAlt,
  faTachometerAlt,
  faBars,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./registerServiceWorker";

// Ajouter les icônes à la bibliothèque
library.add(
  faBook,
  faMoon,
  faBrain,
  faEnvelope,
  faLock,
  faUser,
  faEye,
  faEyeSlash,
  faFacebook,
  faGoogle,
  faBell,
  faTimes,
  faLightbulb,
  faChartBar,
  faSignOutAlt,
  faTachometerAlt,
  faBars,

  faChevronLeft,
  faChevronRight
);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

const app = createApp(App);
const pinia = createPinia();
app.use(router); // Utiliser le routeur
app.use(pinia);
// Enregistrer le composant FontAwesomeIcon globalement
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
