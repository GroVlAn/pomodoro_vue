<template>
  <div
    v-show="isLoading"
    class="loader"
  ></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { globalStore } from '../../shared/api/store/store';

export default defineComponent({
  setup() {
    const isLoading = computed(() => globalStore.isLoading);
    return {
      isLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.loader {
  height: 5px;
  width: 100vw;

  &::after {
    position: relative;
    content: '';
    display: block;
    height: 5px;
    width: 10%;
    background-color: #0787f0;
    animation: loading 3s ease-in-out infinite;
  }
}

@keyframes loading {
  0% {
    width: 10%;
    left: 0;
  }
  20% {
    width: 20%;
  }
  40% {
    width: 30%;
  }
  40% {
    width: 40%;
  }
  60% {
    width: 30%;
  }
  80% {
    width: 20%;
  }
  100% {
    width: 10%;
    left: 100%;
  }
}
</style>
