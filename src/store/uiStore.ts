import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
  const isSidebarVisible = ref(true);

  const hideSidebar = () => {
    isSidebarVisible.value = false;
  };

  const showSidebar = () => {
    isSidebarVisible.value = true;
  };

  return {
    isSidebarVisible,
    hideSidebar,
    showSidebar,
  };
});
