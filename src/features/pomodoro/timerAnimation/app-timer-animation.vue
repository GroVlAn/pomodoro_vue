<template>
  <div
    class="timer_animation"
    :class="isStartClass"
  >
    <div class="timer_animation__wrapper">
      <div class="timer_animation__circle this--1"></div>
      <div class="timer_animation__circle this--2"></div>
      <div class="timer_animation__circle this--3"></div>
      <div class="timer_animation__circle this--4"></div>

      <div class="timer_animation__center"></div>

      <div class="timer_animation__ball this--1"></div>
      <div class="timer_animation__ball this--2"></div>
      <div class="timer_animation__ball this--3"></div>
      <div class="timer_animation__ball this--4"></div>
      <div class="timer_animation__ball this--5"></div>
      <div class="timer_animation__ball this--6"></div>
      <div class="timer_animation__ball this--7"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    isRunning: Boolean,
  },
  setup(props) {
    const isStartClass = computed(() => (props.isRunning ? 'start' : ''));

    return {
      isStartClass,
    };
  },
});
</script>

<style lang="scss" scoped>
.timer_animation {
  display: flex;
  align-items: center;
  padding: 10px 0;
  justify-content: center;

  &.start {
    .timer_animation__circle {
      &::after {
        animation-play-state: running;
      }
    }

    .timer_animation__ball {
      animation-play-state: running;
    }
  }

  .timer_animation__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
  }

  .timer_animation__circle {
    position: absolute;
    border: 30px solid transparent;
    border-radius: 100%;

    &.this--1 {
      width: 100%;
      height: 100%;

      &::after {
        animation-duration: 10s;
        border-color: #f55b5b transparent transparent transparent;
      }
    }

    &.this--2 {
      width: 80%;
      height: 80%;

      &::after {
        animation-duration: 15s;
        border-color: transparent #5fc6f5 transparent transparent;
      }
    }
    &.this--3 {
      width: 60%;
      height: 60%;

      &::after {
        animation-duration: 20s;
        border-color: transparent transparent #c16af3 transparent;
      }
    }

    &.this--4 {
      width: 40%;
      height: 40%;

      &::after {
        animation-duration: 12s;
        border-color: transparent transparent transparent #70f3bd;
      }
    }

    &::after {
      content: ' ';
      display: block;
      width: 100%;
      height: 100%;
      margin: -30px;
      border-radius: 100%;
      border: 30px solid #ffffff;
      animation-play-state: paused;
      animation-name: circle;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }

  .timer_animation__ball {
    position: absolute;
    margin: 10px;
    border: 30px solid transparent;
    border-radius: 100%;
    animation-play-state: paused;
    animation-name: circle;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    &.this--1 {
      width: 100%;
      height: 100%;
      animation-duration: 17s;

      &::after {
        top: 30%;
        left: 10%;
        background: linear-gradient(#d752f1, #7f2e8f);
      }
    }

    &.this--2 {
      width: 80%;
      height: 80%;
      animation-duration: 9s;

      &::after {
        top: 30%;
        left: 20%;
        width: 20px;
        height: 20px;
        background: linear-gradient(#369643, #196423);
      }
    }

    &.this--3 {
      width: 60%;
      height: 60%;

      animation-duration: 22s;

      &::after {
        top: 90%;
        left: 45%;
        width: 10px;
        height: 10px;
        background: linear-gradient(#e96363, #ce4d4d);
      }
    }

    &.this--4 {
      width: 110%;
      height: 110%;
      animation-duration: 13s;

      &::after {
        top: 14%;
        left: 14%;
        width: 40px;
        height: 40px;
        background: linear-gradient(#34d4fc, #24aacc);
      }
    }

    &.this--5 {
      width: 110%;
      height: 110%;
      animation-duration: 20s;

      &::after {
        top: 90%;
        left: 90%;
        width: 35px;
        height: 35px;
        background: linear-gradient(#fcde34, #bba527);
      }
    }

    &.this--6 {
      width: 60%;
      height: 60%;
      animation-duration: 9s;

      &::after {
        top: 10%;
        left: 75%;
        width: 25px;
        height: 25px;
        background: linear-gradient(#369643, #196423);
      }
    }

    &.this--7 {
      width: 80%;
      height: 80%;
      animation-duration: 22s;

      &::after {
        top: 20%;
        left: 25%;
        width: 15px;
        height: 15px;
        background: linear-gradient(#e96363, #ce4d4d);
      }
    }

    &::after {
      content: ' ';
      position: absolute;
      display: block;
      width: 15px;
      height: 15px;
      margin: -30px;
      border-radius: 100%;
    }
  }

  @keyframes circle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .timer_animation__center {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    width: 15%;
    height: 15%;
    background: linear-gradient(#fce834, #d6c527);
    transform: translate(-50%, -50%);
  }
}
</style>
