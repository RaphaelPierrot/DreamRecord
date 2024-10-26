// main.js ou main.ts
import { createApp } from "vue";
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

const app = createApp(App);
app.use(router); // Utiliser le routeur
// Enregistrer le composant FontAwesomeIcon globalement
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
