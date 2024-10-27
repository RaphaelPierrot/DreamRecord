<!-- src/components/UserPage/DreamDiaries/Tabs.vue -->
<template>
  <div class="tabs">
    <div class="tab-headers">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ active: activeTab === tab.name }"
        @click="selectTab(tab.name)"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from "vue";

export default defineComponent({
  name: "Tabs",
  setup() {
    const activeTab = ref<string>("");
    const tabs = ref<Array<{ name: string; title: string }>>([]);

    const registerTab = (name: string, title: string) => {
      tabs.value.push({ name, title });
      if (!activeTab.value) {
        activeTab.value = name;
      }
    };

    const selectTab = (name: string) => {
      activeTab.value = name;
    };

    provide("registerTab", registerTab);
    provide("activeTab", activeTab);

    return {
      activeTab,
      tabs,
      selectTab,
    };
  },
});
</script>

<style scoped lang="scss">
.tabs {
  .tab-headers {
    display: flex;
    justify-content: center;
    margin-bottom: 1em;

    button {
      background: none;
      border: none;
      padding: 0.5em 1em;
      cursor: pointer;
      font-size: 1em;
      transition: color 0.3s ease, border-bottom 0.3s ease;
      color: #333;
      border-bottom: 2px solid transparent;

      &.active {
        color: #007bff;
        border-bottom: 2px solid #007bff;
      }

      &:hover {
        color: #0056b3;
      }
    }
  }

  .tab-content {
    padding: 1em;
  }
}
</style>
