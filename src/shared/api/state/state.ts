import { UnwrapNestedRefs, reactive } from 'vue';
import { TState } from './types';

export class GlobalState {
  private static instance: GlobalState | null;
  public state: UnwrapNestedRefs<TState> | null = null;

  private constructor() {
    // private GlobalState Construcetor
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GlobalState();
    }

    return this.instance;
  }

  public set setState(state: TState) {
    if (this.state == null) {
      this.state = reactive(state);
    }
  }

  public get getState() {
    return this.state;
  }
}
