<template>
  <div class="pomodoro_timer">
    <div class="pomodoro_timer__wrapper">
      <div class="pomodoro_timer__timer">
        <div class="pomodoro_timer__current_time">{{ pretyTime }}</div>
      </div>
      <div class="pomodoro_timer__buttons">
        <div class="pomodoro_timer__button">
          <button
            class="btn"
            @click="start"
            v-show="!isRunnitng"
          >
            Start
          </button>
          <button
            class="btn"
            @click="pause"
            v-show="isRunnitng"
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
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
  props: {
    startTime: Number,
  },
  setup(props) {
    return {
      currentTime: ref(props.startTime),
      initialTime: props.startTime,
      timer: ref(0),
      isRunnitng: ref(false),
    };
  },
  computed: {
    pretyTime() {
      if (!this.currentTime) {
        return '00:00:00';
      }
      const hours = Math.floor(this.currentTime / 3600);
      const remainderHours = this.currentTime - hours * 3600;
      const minutes = Math.floor(remainderHours / 60);
      const seconds = remainderHours - minutes * 60;

      const strTimer = {
        hours: Math.floor(hours / 10) == 0 ? `0${hours}` : hours,
        minutes: Math.floor(minutes / 10) == 0 ? `0${minutes}` : minutes,
        seconds: Math.floor(seconds / 10) == 0 ? `0${seconds}` : seconds,
      };

      return `${strTimer.hours}:${strTimer.minutes}:${strTimer.seconds}`;
    },
  },
  methods: {
    start() {
      if (this.timer == 0) {
        this.isRunnitng = true;

        this.timer = setInterval(() => {
          if (!this.currentTime) {
            this.timer = 0;
            return;
          }
          this.currentTime--;
        }, 1000);
      }
    },
    stop() {
      if (!this.currentTime) return;

      this.isRunnitng = false;
      clearInterval(this.timer);
      this.timer = 0;
      this.currentTime = this.initialTime;
    },
    pause() {
      if (!this.currentTime) return;

      this.isRunnitng = false;
      clearInterval(this.timer);
      this.timer = 0;
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
