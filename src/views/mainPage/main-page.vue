<template>
  <div class="container">
    <div>
      <div class="section">
        <pomodoro-timer
          class="white_conteiner"
          :startTime="100000"
        ></pomodoro-timer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PomodoroTimer from '../../components/timer/pomodoro-timer.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    PomodoroTimer,
  },
});
</script>

<style scoped></style>
