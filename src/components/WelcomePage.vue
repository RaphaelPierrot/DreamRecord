<template>
  <div class="home-page">
    <!-- Fond ciel étoilé animé -->
    <div class="starry-sky">
      <div
        class="star"
        v-for="(star, index) in stars"
        :key="'star-' + index"
        :style="{
          top: star.top + '%',
          left: star.left + '%',
          animationDelay: star.delay + 's',
          width: star.size + 'px',
          height: star.size + 'px',
        }"
      ></div>
      <div
        class="shooting-star"
        v-for="(shootingStar, index) in shootingStars"
        :key="'shooting-star-' + index"
        :style="{
          top: shootingStar.top + '%',
          left: shootingStar.left + '%',
          animationDelay: shootingStar.delay + 's',
          animationDuration: shootingStar.duration + 's',
        }"
      ></div>
    </div>

    <!-- Contenu principal -->
    <div class="content">
      <!-- Slogan accrocheur -->
      <section class="slogan-section">
        <h1>{{ slogan }}</h1>
        <div class="auth-buttons">
          <button class="nav-button" @click="navigateTo('auth')">
            Connexion
          </button>

          <button class="nav-button primary" @click="navigateTo('signup')">
            Inscription
          </button>
        </div>
      </section>

      <!-- Présentation des fonctionnalités -->
      <section
        class="features-section"
        v-for="(feature, index) in features"
        :key="index"
        :data-aos="'fade-up'"
        :data-aos-delay="index * 200"
      >
        <div class="feature-content">
          <div class="feature-icon">
            <font-awesome-icon
              :icon="feature.iconName"
              style="color: #ffd43b"
            />
          </div>
          <div class="feature-text">
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AOS from "aos";
import router from "../router/index";
interface Star {
  top: number;
  left: number;
  delay: number;
  size: number;
}

interface ShootingStar {
  top: number;
  left: number;
  delay: number;
  duration: number;
}

export default defineComponent({
  name: "WelcomePage",
  data() {
    return {
      stars: [] as Star[],
      shootingStars: [] as ShootingStar[],
      slogan: "Explorez vos rêves avec DreamRecords",
      features: [
        {
          title: "Journal de rêve",
          description:
            "Enregistrez et consultez vos rêves facilement grâce à notre interface intuitive. Gardez une trace de vos expériences nocturnes et observez les thèmes récurrents au fil du temps.",
          iconName: "book",
        },
        {
          title: "Techniques de rêve lucide",
          description:
            "Apprenez diverses techniques éprouvées pour induire des rêves lucides. Nos guides vous aideront à prendre le contrôle de vos rêves et à explorer votre subconscient en profondeur.",
          iconName: "moon",
        },
        {
          title: "Analyse de rêves",
          description:
            "Comprenez les symboles et les significations cachées dans vos rêves. Utilisez nos outils d’analyse pour déchiffrer les messages de votre inconscient et favoriser votre développement personnel.",
          iconName: "brain",
        },
      ],
    };
  },
  created() {
    this.generateStars(150);
    this.startShootingStars();
  },
  mounted() {
    AOS.init({
      duration: 1000,
    });
  },
  methods: {
    generateStars(count: number) {
      for (let i = 0; i < count; i++) {
        this.stars.push({
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          size: Math.random() * 2 + 1,
        });
      }
    },
    startShootingStars() {
      setInterval(() => {
        const shootingStar = {
          top: Math.random() * 50,
          left: Math.random() * 100,
          delay: 0,
          duration: Math.random() * 1 + 1,
        };
        this.shootingStars.push(shootingStar);
        // Retirer l'étoile filante après l'animation
        setTimeout(() => {
          const index = this.shootingStars.indexOf(shootingStar);
          if (index > -1) {
            this.shootingStars.splice(index, 1);
          }
        }, (shootingStar.duration + 0.5) * 1000);
      }, Math.random() * 5000 + 3000);
    },
    navigateTo(page: string) {
      this.$router.push({ name: "auth", query: { mode: page } });
    },
  },
});
</script>

<style lang="scss" scoped>
@use "sass:color";

@use "@/scss/mixins.scss" as *;
@use "@/scss/variables.scss" as *;

@import "aos/dist/aos.css";
@import "font-awesome/css/font-awesome.min.css";

.home-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  .starry-sky {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    overflow: hidden;
    z-index: -1;

    .star {
      position: absolute;
      background: radial-gradient(circle, yellow 0%, transparent 70%);
      border-radius: 50%;
      opacity: 0;
      animation: twinkle 5s infinite;
    }

    .shooting-star {
      position: absolute;
      width: 2px;
      height: 80px;
      background: linear-gradient(45deg, transparent, white, transparent);
      opacity: 0;
      animation: shooting linear forwards;
    }

    @keyframes twinkle {
      0%,
      100% {
        opacity: 0;
      }
      50% {
        opacity: 0.8;
      }
    }

    @keyframes shooting {
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

  .content {
    position: relative;
    z-index: 1;
    color: white;
    text-align: center;

    .slogan-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;

      h1 {
        @include heading(3em);
        color: $color-heading-primary;
        text-shadow: 2px 2px 5px rgba(255, 255, 0, 0.3);
      }

      .auth-buttons {
        margin-top: 2em;
        display: flex;
        justify-content: center;
        gap: 2em;

        .nav-button {
          @include button(
            $color-button-secondary,
            $color-button-secondary-text
          );
          font-size: 1.2em;
          padding: 0.75em 2em;
          cursor: pointer;
          @include transition;
          transition: all $transition-duration ease-in-out, transform 0.2s;

          &:hover {
            background-color: color.adjust(
              $color-button-secondary,
              $lightness: 10%
            );
            transform: scale(1.05);
          }

          &.primary {
            @include button($color-button-primary, $color-button-primary-text);

            &:hover {
              background-color: color.adjust(
                $color-button-primary,
                $lightness: 10%
              );
              transform: scale(1.05);
            }
          }
        }
      }
    }

    .features-section {
      margin: 3em auto;
      padding: 2em;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: $border-radius;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      max-width: 800px;
      width: 100%;
      @include transition;

      &:hover {
        transform: translateY(-10px);
        background-color: rgba(255, 255, 255, 0.2);
      }

      .feature-content {
        display: flex;
        align-items: center;
        text-align: left;

        .feature-icon {
          flex: 0 0 80px;
          margin-right: 1em;
          text-align: center;
          font-size: 4em;
          color: $color-heading-secondary;
        }

        .feature-text {
          flex: 1;
          cursor: default;
          h2 {
            @include heading(2em);
            color: $color-heading-secondary;
            margin-bottom: 0.5em;
          }

          p {
            @include body-text;
            color: white;
          }
        }
      }
    }
  }
}
</style>
