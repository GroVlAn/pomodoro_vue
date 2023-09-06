<template>
  <div class="pomodoro_timer">
    <div class="pomodoro_timer__wrapper">
      <div class="pomodoro_timer__timer">
        <div class="pomodoro_timer__current_time">
          {{ state.stringTime }}
        </div>
      </div>
      <div class="pomodoro_timer__buttons">
        <div class="pomodoro_timer__button">
          <button
            class="btn"
            @click="start"
            v-show="!isRunning"
          >
            Start
          </button>
          <button
            class="btn"
            @click="pause"
            v-show="isRunning"
          >
            Pause
          </button>
        </div>
        <div class="pomodoro_timer__button">
          <button
            class="btn"
            @click="stop"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { prettyTime } from '../../../shared/api/helpers/timeHelper';
import { TEventNextSegment } from '../../../entity/timer';

export default defineComponent({
  props: {
    startTime: Number,
    isRunning: Boolean,
  },
  setup(props, { emit }) {
    const state = reactive({
      currentTime: props.startTime,
      initialTime: props.startTime,
      stringTime: prettyTime(props.startTime ?? 0),
    });
    const timer = ref(0);

    watch(
      () => props.startTime,
      (value) => {
        state.currentTime = value;
        state.initialTime = value;
        state.stringTime = prettyTime(value ?? 0);
      },
    );

    watch(
      () => props.isRunning,
      (value) => {
        if (!value) {
          clearInterval(timer.value);
          timer.value = 0;
        }
      },
    );

    watch(
      () => state.currentTime,
      (value) => {
        state.currentTime = value;
        state.stringTime = prettyTime(value ?? 0);
      },
    );

    const start = () => {
        if (timer.value == 0) {
          emit('nextSegment', { isRun: true, isNextSegment: false } as TEventNextSegment);

          timer.value = setInterval(() => {
            if (!state.currentTime) {
              return;
            }

            state.currentTime--;
            if (state.currentTime === 0) {
              emit('nextSegment', { isRun: true, isNextSegment: true } as TEventNextSegment);
            }
          }, 1000);
        }
      },
      stop = () => {
        state.currentTime = state.initialTime;
        emit('nextSegment', { isRun: false, isNextSegment: false } as TEventNextSegment);
      },
      pause = () => {
        emit('nextSegment', { isRun: false, isNextSegment: false } as TEventNextSegment);
      };

    return {
      start,
      pause,
      stop,
      state,
      timer,
    };
  },
});
</script>

<style scoped>
.pomodoro_timer {
  padding: 30px 40px;
}

.pomodoro_timer__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pomodoro_timer__timer {
  margin-bottom: 30px;
}

.pomodoro_timer__current_time {
  font-weight: 900;
  font-size: 82px;
  color: var(--c_main);
}

.pomodoro_timer__buttons {
  display: flex;
  margin-left: -30px;
}

.pomodoro_timer__button {
  flex: 0 0 clac(50% - 30px);
  margin-left: 30px;
}
</style>
