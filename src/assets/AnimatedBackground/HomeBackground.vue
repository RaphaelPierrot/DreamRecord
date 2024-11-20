<!-- src/components/AnimatedBackground/HomeBackground.vue -->
<template>
  <div class="animated-background">
    <div class="twilight-sky">
      <!-- Sun or Moon -->
      <div class="sun-moon"></div>
      <!-- Clouds -->
      <div
        class="cloud"
        v-for="n in 5"
        :key="'cloud-' + n"
        :class="'cloud-' + n"
      ></div>
      <!-- Stars -->
      <div
        class="star"
        v-for="(star, index) in stars"
        :key="'star-' + index"
        :style="{
          top: star.top + '%',
          left: star.left + '%',
          animationDelay: star.delay + 's',
        }"
      ></div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Star, ShootingStar } from "@/Interfaces";

export default defineComponent({
  name: "HomeBackground",
  setup() {
    const stars = ref<Star[]>([]);
    const shootingStars = ref<ShootingStar[]>([]);

    const generateStars = (count: number) => {
      for (let i = 0; i < count; i++) {
        stars.value.push({
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 5,
        });
      }
    };

    const generateShootingStars = (count: number) => {
      for (let i = 0; i < count; i++) {
        shootingStars.value.push({
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 20,
        });
      }
    };

    generateStars(100);
    generateShootingStars(5);

    return {
      stars,
      shootingStars,
    };
  },
});
</script>
<style lang="scss">
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    #2c3e50,
    #f39c12
  ); // Crépuscule éclairé avec teintes jaunes
  overflow: hidden;
  z-index: -1;

  .twilight-sky {
    position: relative;
    width: 100%;
    height: 100%;

    // Sun or Moon
    .sun-moon {
      position: absolute;
      bottom: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, #ffffff, #f1c40f);
      border-radius: 50%;
      box-shadow: 0 0 50px rgba(241, 196, 15, 0.5);
    }

    // Clouds
    .cloud {
      position: absolute;
      bottom: 50%;
      background: #ecf0f1;
      border-radius: 50px;
      opacity: 0.8;

      &.cloud-1 {
        width: 200px;
        height: 60px;
        left: 10%;
        animation: moveClouds 60s linear infinite;
      }

      &.cloud-2 {
        width: 250px;
        height: 70px;
        left: 30%;
        bottom: 55%;
        animation: moveClouds 80s linear infinite;
      }

      &.cloud-3 {
        width: 180px;
        height: 50px;
        left: 60%;
        bottom: 52%;
        animation: moveClouds 70s linear infinite;
      }

      &.cloud-4 {
        width: 220px;
        height: 65px;
        left: 80%;
        bottom: 48%;
        animation: moveClouds 90s linear infinite;
      }

      &.cloud-5 {
        width: 200px;
        height: 60px;
        left: 50%;
        bottom: 60%;
        animation: moveClouds 85s linear infinite;
      }
    }

    @keyframes moveClouds {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    // Stars
    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: #ffffff;
      border-radius: 50%;
      opacity: 0.8;
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
}
</style>
