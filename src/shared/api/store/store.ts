import { reactive } from 'vue';

import { TState } from './types';

export const globalStore = reactive({
  activeColor: '#ff5a5a',
  userId: localStorage.getItem('user') ?? null,
} as TState);
