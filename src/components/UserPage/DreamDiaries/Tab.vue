<!-- src/components/Tab.vue -->
<template>
  <div v-if="isActive">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, computed, type Ref } from "vue";

export default defineComponent({
  name: "Tab",
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const registerTab =
      inject<(name: string, title: string) => void>("registerTab");
    const activeTab = inject<Ref<string>>("activeTab");

    onMounted(() => {
      if (registerTab) {
        registerTab(props.name, props.title);
      }
    });

    const isActive = computed(() => activeTab?.value === props.name);

    return {
      isActive,
    };
  },
});
</script>

<style scoped>
/* Aucun style supplémentaire nécessaire */
</style>
