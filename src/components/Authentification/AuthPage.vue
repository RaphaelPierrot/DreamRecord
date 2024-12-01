<template>
  <div class="auth-page">
    <!-- Animated Background -->
    <div class="animated-background">
      <!-- Milky Way -->
      <div class="milky-way">
        <div
          class="star"
          v-for="(star, index) in milkyWayStars"
          :key="'milky-star-' + index"
          :style="{
            top: star.top + '%',
            left: star.left + '%',
            animationDelay: star.delay + 's',
            width: star.size + 'px',
            height: star.size + 'px',
          }"
        ></div>
      </div>

      <!-- Moon with Phases -->
      <div class="moon">
        <div class="moon-shadow"></div>
      </div>

      <!-- Shooting Stars -->
      <div
        class="shooting-star"
        v-for="(star, index) in shootingStars"
        :key="'shooting-star-' + index"
        :style="{
          top: star.top + '%',
          left: star.left + '%',
          animationDelay: star.delay + 's',
        }"
      ></div>
    </div>

    <!-- Speech Bubble Container -->
    <div class="speech-bubble-container">
      <div class="tabs">
        <button :class="{ active: isLogin }" @click="setMode('login')">
          Connexion
        </button>
        <button :class="{ active: !isLogin }" @click="setMode('signup')">
          Inscription
        </button>
      </div>

      <div class="form-container">
        <transition name="form" mode="out-in">
          <form v-if="isLogin" @submit.prevent="handleLogin" key="login">
            <h2>Connexion</h2>
            <div class="input-group">
              <font-awesome-icon icon="envelope" />
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                required
                aria-label="Email"
                @input="validateEmail"
                :class="{ invalid: emailError }"
              />
            </div>
            <div class="input-group">
              <font-awesome-icon icon="lock" />
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Mot de passe"
                required
                aria-label="Mot de passe"
                @input="validatePassword"
                :class="{ invalid: passwordError }"
              />
              <font-awesome-icon
                :icon="showPassword ? 'eye-slash' : 'eye'"
                class="toggle-password"
                @click="togglePasswordVisibility"
              />
            </div>
            <div class="options">
              <label class="remember-me">
                <input type="checkbox" v-model="rememberMe" />
                Se souvenir de moi
              </label>
              <a href="#" class="forgot-password">Mot de passe oublié ?</a>
            </div>
            <button type="submit" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Se connecter</span>
              <span v-else class="spinner"></span>
            </button>
            <div v-if="loginError" class="error-message">{{ loginError }}</div>
          </form>

          <form v-else @submit.prevent="handleSignup" key="signup">
            <h2>Inscription</h2>
            <div class="input-group">
              <font-awesome-icon icon="user" />
              <input
                type="text"
                v-model="username"
                placeholder="Nom d'utilisateur"
                required
                aria-label="Nom d'utilisateur"
                @input="validateUsername"
                :class="{ invalid: usernameError }"
              />
            </div>
            <div class="input-group">
              <font-awesome-icon icon="envelope" />
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                required
                aria-label="Email"
                @input="validateEmail"
                :class="{ invalid: emailError }"
              />
            </div>
            <div class="input-group">
              <font-awesome-icon icon="lock" />
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Mot de passe"
                required
                aria-label="Mot de passe"
                @input="validatePassword"
                :class="{ invalid: passwordError }"
              />
              <font-awesome-icon
                :icon="showPassword ? 'eye-slash' : 'eye'"
                class="toggle-password"
                @click="togglePasswordVisibility"
              />
            </div>
            <button type="submit" :disabled="isSubmitting">
              <span v-if="!isSubmitting">S'inscrire</span>
              <span v-else class="spinner"></span>
            </button>
            <div v-if="signupError" class="error-message">
              {{ signupError }}
            </div>
          </form>
        </transition>
        <!-- Social Login Options -->
        <div class="social-login">
          <p>Ou connectez-vous avec :</p>
          <button @click="loginWithGoogle" class="google">
            <font-awesome-icon :icon="['fab', 'google']" />
          </button>
          <button @click="loginWithFacebook" class="facebook">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </button>
          <!-- Add more social login buttons if needed -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiClient from "@/services/apiClient";
interface ShootingStar {
  top: number;
  left: number;
  delay: number;
}

interface Star {
  top: number;
  left: number;
  delay: number;
  size: number;
}

export default defineComponent({
  name: "AuthPage",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const mode = computed(() => (route.query.mode as string) || "login");

    const isLogin = ref(mode.value !== "signup");
    const setMode = (modeValue: string) => {
      router.push({ query: { ...route.query, mode: modeValue } });
    };

    watch(
      () => mode.value,
      (newMode) => {
        isLogin.value = newMode !== "signup";
      }
    );

    const email = ref("");
    const password = ref("");
    const username = ref("");
    const rememberMe = ref(false);
    const showPassword = ref(false);
    const isSubmitting = ref(false);
    const loginError = ref("");
    const signupError = ref("");

    // Validation errors
    const emailError = ref(false);
    const passwordError = ref(false);
    const usernameError = ref(false);

    // Shooting stars and Milky Way stars
    const shootingStars = ref<ShootingStar[]>([]);
    const milkyWayStars = ref<Star[]>([]);

    const generateShootingStars = (count: number) => {
      for (let i = 0; i < count; i++) {
        shootingStars.value.push({
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 20,
        });
      }
    };

    const generateMilkyWayStars = (count: number) => {
      const bandWidth = 10; // Adjust the width of the Milky Way band
      for (let i = 0; i < count; i++) {
        const left = Math.random() * 100;
        const offset = (Math.random() - 0.5) * bandWidth;
        milkyWayStars.value.push({
          top: 100 - left + offset,
          left: left,
          delay: Math.random() * 5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    generateShootingStars(5);
    generateMilkyWayStars(200);

    const handleLogin = async () => {
      isSubmitting.value = true;
      loginError.value = "";

      // Validation avant l'envoi
      validateEmail();
      validatePassword();

      if (emailError.value || passwordError.value) {
        isSubmitting.value = false;
        return;
      }

      try {
        const response = await axios.post(
          "https://api.dreamrecord.net/auth/login.php",
          {
            email: email.value,
            password: password.value,
          }
        );

        if (response.data.status === "success") {
          // Stocker les informations de l'utilisateur si nécessaire
          // Rediriger vers la page d'accueil
          // Stocker le token ou l'ID de l'utilisateur
          localStorage.setItem("userId", response.data.userId);
          router.push({ name: "home" });
        } else {
          loginError.value = response.data.message;
        }
      } catch (error) {
        loginError.value = "Une erreur s'est produite. Veuillez réessayer.";
      } finally {
        isSubmitting.value = false;
      }
    };

    const handleSignup = async () => {
      isSubmitting.value = true;
      signupError.value = "";

      // Validation avant l'envoi
      validateEmail();
      validatePassword();
      validateUsername();

      if (emailError.value || passwordError.value || usernameError.value) {
        isSubmitting.value = false;
        return;
      }

      try {
        const response = await apiClient.post("/auth/signup.php", {
          email: email.value,
          password: password.value,
          username: username.value,
        });
        if (response.data.status === "success") {
          // Rediriger vers la page de connexion ou autre action
          router.push({ name: "home" });
        } else {
          signupError.value = response.data.message;
        }
      } catch (error) {
        signupError.value = "Une erreur s'est produite. Veuillez réessayer.";
      } finally {
        isSubmitting.value = false;
      }
    };

    const validateEmail = () => {
      const regex = /\S+@\S+\.\S+/;
      emailError.value = !regex.test(email.value);
    };

    const validatePassword = () => {
      passwordError.value = password.value.length < 6;
    };

    const validateUsername = () => {
      usernameError.value = username.value.trim().length < 3;
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const loginWithGoogle = () => {
      // Logic for Google login
    };

    const loginWithFacebook = () => {
      // Logic for Facebook login
    };

    return {
      isLogin,
      email,
      password,
      username,
      rememberMe,
      showPassword,
      isSubmitting,
      loginError,
      signupError,
      emailError,
      passwordError,
      usernameError,
      shootingStars,
      milkyWayStars,
      handleLogin,
      handleSignup,
      validateEmail,
      validatePassword,
      validateUsername,
      togglePasswordVisibility,
      loginWithGoogle,
      loginWithFacebook,
      setMode,
    };
  },
});
</script>
<style lang="scss" scoped>
@use "sass:color";
@use "@/scss/variables.scss" as *;
@use "@/scss/mixins.scss" as *;

.auth-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .animated-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #00111a, #000022);
    overflow: hidden;
    z-index: -1;

    // Milky Way
    .milky-way {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .star {
        position: absolute;
        background: radial-gradient(circle, white 0%, transparent 70%);
        border-radius: 50%;
        opacity: 0;
        animation: twinkle 5s infinite;
      }

      @keyframes twinkle {
        0%,
        100% {
          opacity: 0.5;
        }
        50% {
          opacity: 1;
        }
      }
    }

    // Moon with Phases
    .moon {
      position: absolute;
      top: 10%;
      right: 10%;
      width: 100px;
      height: 100px;
      background: #f0e68c;
      border-radius: 50%;
      overflow: hidden;

      .moon-shadow {
        position: absolute;
        width: 100px;
        height: 100px;
        background: #00111a;
        border-radius: 50%;
        animation: lunarPhase 10s infinite;
      }

      @keyframes lunarPhase {
        0% {
          transform: translateX(-100%);
        }
        50% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    }

    // Shooting Stars
    .shooting-star {
      position: absolute;
      width: 2px;
      height: 80px;
      background: linear-gradient(45deg, transparent, white, transparent);
      opacity: 0;
      transform: rotate(45deg);
      animation: shootingStar 5s infinite;
    }

    @keyframes shootingStar {
      0% {
        opacity: 1;
        transform: translateX(0) translateY(0) rotate(45deg);
      }
      100% {
        opacity: 0;
        transform: translateX(-200px) translateY(200px) rotate(45deg);
      }
    }
  }

  .speech-bubble-container {
    position: relative;
    width: 90%;
    max-width: 400px;
    background: $color-floating-elements;
    padding: 2em;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    border: 2px solid $color-border;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:after {
      content: "";
      position: absolute;
      bottom: -20px;
      left: 60px;
      border-width: 20px 20px 0;
      border-style: solid;
      border-color: $color-floating-elements transparent transparent transparent;
    }

    animation: bubbleAppear 1s ease-out forwards;
    opacity: 0;

    @keyframes bubbleAppear {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .tabs {
      display: flex;
      justify-content: center;
      margin-bottom: 1em;

      button {
        background: transparent;
        border: none;
        font-family: $font-title;
        font-size: 1.2em;
        color: $color-text-primary;
        cursor: pointer;
        padding: 0.5em 1em;
        transition: color $transition-duration;

        &.active {
          color: $color-heading-secondary;
          border-bottom: 2px solid $color-heading-secondary;
        }
      }
    }

    .form-container {
      width: 100%;

      .input-group {
        position: relative;
        margin-bottom: 1em;
        display: flex;
        align-items: center;
        gap: 5px;
        font-awesome-icon {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          color: $color-icon;
        }

        input {
          width: 100%;
          padding: 0.75em 0.75em 0.75em 2.5em;
          border: 1px solid $color-border;
          border-radius: $border-radius;
          @include body-text;
          @include transition;

          &:focus {
            border-color: $color-focus;
            outline: none;
          }

          &.invalid {
            border-color: $color-error;
          }
        }

        .toggle-password {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          cursor: pointer;
          color: $color-icon;
        }
      }

      .options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em;

        .remember-me {
          display: flex;
          align-items: center;
          font-size: 0.9em;

          input {
            margin-right: 0.5em;
          }
        }

        .forgot-password {
          font-size: 0.9em;
          color: $color-link;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      button[type="submit"] {
        @include button($color-button-primary, $color-button-primary-text);
        width: 100%;
        position: relative;

        .spinner {
          border: 2px solid transparent;
          border-top: 2px solid $color-button-primary-text;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
          display: block;
          margin: 0 auto;
        }
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .error-message {
        color: $color-error;
        margin-top: 1em;
        text-align: center;
      }

      // Form transitions
      .form-enter-active,
      .form-leave-active {
        transition: opacity 0.5s ease;
      }

      .form-enter,
      .form-leave-to {
        opacity: 0;
      }
    }

    .social-login {
      margin-top: 1em;
      text-align: center;

      p {
        margin-bottom: 0.5em;
      }

      button {
        @include button($color-button-secondary, $color-button-secondary-text);
        margin: 0.5em;
        display: inline-flex;
        align-items: center;
        font-size: 0.9em;

        font-awesome-icon {
          margin-right: 0.5em;
        }
      }
    }
  }

  // Responsive Design
  @media (max-width: 600px) {
    .speech-bubble-container {
      padding: 1.5em;
    }

    .tabs button {
      font-size: 1em;
    }

    .form-container {
      .input-group input {
        padding: 0.75em 0.75em 0.75em 2.2em;
      }
    }
  }
}
</style>
