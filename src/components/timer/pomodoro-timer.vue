<template>
  <div class="pomodoro_timer">
    <div class="pomodoro_timer__wrapper">
      <div class="pomodoro_timer__timer">
        <div class="pomodoro_timer__current_time">{{ state.stringTime }}</div>
      </div>
      <div class="pomodoro_timer__buttons">
        <div class="pomodoro_timer__button">
          <button
            class="btn"
            @click="start"
            v-show="!state.isRunnitng"
          >
            Start
          </button>
          <button
            class="btn"
            @click="pause"
            v-show="state.isRunnitng"
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
import { defineComponent, reactive, watch } from 'vue';
import { prettyTime } from '../../shared/api/helpers/timeHelper';

export default defineComponent({
  props: {
    startTime: Number,
  },
  setup(props) {
    const state = reactive({
      currentTime: props.startTime,
      initialTime: props.startTime,
      timer: 0,
      isRunnitng: false,
      stringTime: prettyTime(props.startTime ?? 0),
    });

    watch(
      () => props.startTime,
      (value) => {
        if (state.isRunnitng && state.currentTime != props.startTime) {
          state.isRunnitng = false;
          clearInterval(state.timer);
          state.timer = 0;
        }
        state.currentTime = value;
        state.initialTime = value;
        state.stringTime = prettyTime(value ?? 0);
      },
    );

    watch(
      () => state.currentTime,
      (value) => {
        state.currentTime = value;
        state.stringTime = prettyTime(value ?? 0);
      },
    );

    return {
      state,
    };
  },
  methods: {
    start() {
      if (this.state.timer == 0) {
        this.state.isRunnitng = true;

        this.state.timer = setInterval(() => {
          if (!this.state.currentTime) {
            this.state.timer = 0;
            this.$emit('nextSegment');
            return;
          }

          this.state.currentTime--;
        }, 1000);
      }
    },
    stop() {
      if (!this.state.currentTime) return;

      this.state.isRunnitng = false;
      clearInterval(this.state.timer);
      this.state.timer = 0;
      this.state.currentTime = this.state.initialTime;
    },
    pause() {
      if (!this.state.currentTime) return;

      this.state.isRunnitng = false;
      clearInterval(this.state.timer);
      this.state.timer = 0;
    },
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
