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
import { GlobalState } from '@/shared/api/state/state';
import { timeToSecond } from '@/shared/api/helpers/timeHelper';

const segmetns: TSegment[] = [
  {
    name: 'Focus',
    time: '00:00:05',
    color: '#d34b4b',
  },
  {
    name: 'Break',
    time: '00:00:10',
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

const firstSegment = segmetnsTime.getSegment(0);

const globalState = GlobalState.getInstance();

export default defineComponent({
  setup() {
    return {
      currentTime: ref(timeToSecond(firstSegment.time)),
      segments: ref(segmetns),
    };
  },
  methods: {
    changeCurrentSegment(key: number) {
      try {
        const currentSegment = segmetnsTime.getSegment(key);
        this.currentTime = timeToSecond(currentSegment.time);

        if (!globalState.state) return;

        globalState.state.activeColor = currentSegment.color;
      } catch (e) {
        console.log(e);
      }
    },
    nextSegment() {
      try {
        const currentSegment = segmetnsTime.getNext();

        this.currentTime = timeToSecond(currentSegment.time);
        if (!globalState.state) return;
        globalState.state.activeColor = currentSegment.color;
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
