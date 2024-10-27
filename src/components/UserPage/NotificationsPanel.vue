<!-- src/components/NotificationsPanel.vue -->
<template>
  <div class="notifications-panel">
    <h3>Notifications</h3>
    <ul>
      <li
        v-for="(notification, index) in notifications"
        :key="'notification-' + index"
      >
        {{ notification.message }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Notification {
  message: string;
  read: boolean;
}

export default defineComponent({
  name: "NotificationsPanel",
  props: {
    notifications: {
      type: Array as () => Notification[],
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@use "@/scss/variables.scss" as *;
@use "@/scss/mixins.scss" as *;

.notifications-panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background: $color-background-secondary;
  color: $color-text-alternate;
  padding: 1em;
  z-index: 2;

  h3 {
    margin-top: 0;
    color: $color-heading-primary;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 1em;
      background: $color-card-background;
      padding: 1em;
      border-radius: $border-radius;
      color: $color-text-primary;
    }
  }
}
</style>
