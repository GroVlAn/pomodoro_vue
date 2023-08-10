<template>
  <div class="container">
    <div>
      <div class="section">
        <app-pomodoro></app-pomodoro>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppPomodoro from '../../components/timer/app-pomodoro.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    'app-pomodoro': AppPomodoro,
  },
});
</script>

<style scoped></style>
