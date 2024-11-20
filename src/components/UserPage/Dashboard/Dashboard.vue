<!-- src/components/Dashboard/Dashboard.vue -->
<template>
  <div class="dashboard">
    <h2>Tableau de Bord</h2>
    <div class="dashboard-cards">
      <DashboardCard
        v-for="(feature, index) in features"
        :key="index"
        :icon="feature.icon"
        :title="feature.title"
        :description="feature.description"
        :link="feature.link"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DashboardCard from "./DashboardCard.vue";
import type { Feature } from "@/Interfaces";

export default defineComponent({
  name: "Dashboard",
  components: {
    DashboardCard,
  },
  setup() {
    const features = ref<Feature[]>([
      {
        title: "Mon Journal de Rêves",
        description: "Consignez et relisez vos rêves.",
        icon: "book",
        link: "/dream-diaries",
      },
      {
        title: "Analyse de Rêves",
        description: "Analysez vos rêves pour en extraire des significations.",
        icon: "brain",
        link: "/analysis",
      },
      {
        title: "Suggestions",
        description: "Recevez des conseils personnalisés.",
        icon: "lightbulb",
        link: "/suggestions",
      },
      {
        title: "Statistiques",
        description: "Visualisez vos tendances oniriques.",
        icon: "chart-bar",
        link: "/statistics",
      },
    ]);

    return {
      features,
    };
  },
});
</script>

<style scoped lang="scss">
@use "@/scss/variables.scss" as *;
@use "@/scss/mixins.scss" as *;

.dashboard {
  padding: 2em;

  h2 {
    text-align: center;
    color: $color-heading-primary;
    margin-bottom: 1.5em;
  }

  .dashboard-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;
  }
}
</style>
