<template>
  <div class="pomodoro_segments">
    <div class="pomodoro_segments__wrapper">
      <div class="pomodoro_segments__items">
        <div
          class="pomodoro_segments__item"
          v-for="(item, key) in segments"
          :key="key"
          :style="{ backgroundColor: item.color }"
          @click="changeCurrentSegment(item.name)"
        >
          {{ item.name }}
          <a
            href="#"
            class="pomodoro_segments__segment"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { TSegment } from './types';

export default defineComponent({
  props: {
    segments: Array as PropType<TSegment[]>,
  },
  setup() {
    return {};
  },
  methods: {
    changeCurrentSegment(name: string) {
      this.$emit('changeCurrentSegment', name);
    },
  },
});
</script>

<style scoped>
.pomodoro_segments__wrapper {
  padding: 20px 10px;
}

.pomodoro_segments__items {
  display: flex;
  flex-wrap: wrap;
  margin-left: -20px;
}

.pomodoro_segments__item {
  flex: 0 0 calc(33.3333% - 20px);
  margin-left: 20px;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;

  &.this--work {
    background-color: #d34b4b;
  }

  &.this--break {
    background-color: #4bb8d3;
  }

  &.this--long-break {
    background-color: #744bd3;
  }
}
</style>
