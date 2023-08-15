<template>
  <div class="white_conteiner">
    <pomodoro-segments
      :segments="segments"
      @changeCurrentSegment="changeCurrentSegment"
    ></pomodoro-segments>
    <app-timer-animation :isRunning="isRunning"></app-timer-animation>
    <pomodoro-timer
      @nextSegment="nextSegment($event)"
      :isRunning="isRunning"
      :startTime="currentTime"
    ></pomodoro-timer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { SegmetnsTime } from './segmentsTime';

import PomodoroTimer from '../../components/timer/pomodoro-timer.vue';
import PomodoroSegments from '../../components/timer/pomodoro-segments.vue';
import { timeToSecond } from '@/shared/api/helpers/timeHelper';
import { globalStore } from '@/shared/api/store/store';
import { segmetns } from './data';
import { TEventNextSegment } from './types';
import AppTimerAnimation from './app-timer-animation.vue';

export default defineComponent({
  setup() {
    const segmetnsTime = new SegmetnsTime(segmetns);
    const audioStarTimer = new Audio('/sounds/start.mp3');

    try {
      segmetnsTime.setQueue = [0, 1, 0, 1, 2];
    } catch (e) {
      console.log(e);
    }

    const firstSegment = segmetnsTime.getSegment(0);

    const currentTime = ref(timeToSecond(firstSegment.time));
    const segments = ref(segmetns);
    const isRunning = ref(false);

    const changeCurrentSegment = (key: number) => {
      const currentSegment = segmetnsTime.getSegment(key);
      currentTime.value = timeToSecond(currentSegment.time);
      isRunning.value = false;

      globalStore.activeColor = currentSegment.color;
    };

    const nextSegment = (eventNextSegment: TEventNextSegment) => {
      isRunning.value = eventNextSegment.isRun;

      if (isRunning.value) {
        try {
          audioStarTimer.play();
        } catch {
          console.log('audio file not found');
        }
      }

      if (eventNextSegment.isNextSegment) {
        const currentSegment = segmetnsTime.getNext();

        currentTime.value = timeToSecond(currentSegment.time);

        globalStore.activeColor = currentSegment.color;
      }
    };

    return {
      changeCurrentSegment,
      nextSegment,
      currentTime,
      segments,
      isRunning,
    };
  },
  components: {
    'pomodoro-timer': PomodoroTimer,
    'pomodoro-segments': PomodoroSegments,
    'app-timer-animation': AppTimerAnimation,
  },
});
</script>

<style lang="scss" scoped></style>
