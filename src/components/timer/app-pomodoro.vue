<template>
  <div class="white_conteiner">
    <pomodoro-segments
      :segments="segments"
      @changeCurrentSegment="changeCurrentSegment"
    ></pomodoro-segments>
    <pomodoro-timer
      @nextSegment="nextSegment"
      :startTime="currentTime"
    ></pomodoro-timer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { SegmetnsTime } from './segmentsTime';
import { TSegment } from './types';

import PomodoroTimer from '../../components/timer/pomodoro-timer.vue';
import PomodoroSegments from '../../components/timer/pomodoro-segments.vue';

const segmetns: TSegment[] = [
  {
    name: 'Focus',
    time: '00:25:00',
    color: '#d34b4b',
  },
  {
    name: 'Break',
    time: '00:05:00',
    color: '#4bb8d3',
  },
  {
    name: 'Long break',
    time: '00:15:00',
    color: '#744bd3',
  },
];

const segmetnsTime = new SegmetnsTime(segmetns);

segmetnsTime.SetQueue = [0, 1, 0, 1, 2];

export default defineComponent({
  setup() {
    return {
      currentTime: ref(segmetnsTime.getTime('Focus')),
      segments: ref(segmetns),
    };
  },
  methods: {
    changeCurrentSegment(name: string) {
      if (!name) return;
      try {
        this.currentTime = segmetnsTime.getTime(name);
      } catch (e) {
        console.log(e);
      }
    },
    nextSegment() {
      try {
        this.currentTime = segmetnsTime.getNext();
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: {
    'pomodoro-timer': PomodoroTimer,
    'pomodoro-segments': PomodoroSegments,
  },
});
</script>

<style scoped></style>
