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
import { Star, ShootingStar } from "@/interfaces";

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
