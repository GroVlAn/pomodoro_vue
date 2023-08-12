import { MinimalRangeError } from '../../shared/api/exceptions/exceptions';
import { TSegment } from './types';

export class SegmetnsTime {
  private segmetns: TSegment[];
  private nextSegment: number;
  private prevSegnent: number;
  private queue: Array<number>;

  public constructor(segments: TSegment[]) {
    this.segmetns = segments;
    this.nextSegment = 0;
    this.prevSegnent = -1;
    this.queue = [];
  }

  public set setQueue(items: Array<number>) {
    if (items.length < 2) {
      throw new MinimalRangeError('Segment queue must have more 2 items');
    }
    this.queue = items;
  }

  public getSegment(key: number) {
    this.nextSegment = key;

    return this.segmetns[key];
  }

  public getNext() {
    if (this.nextSegment >= this.queue.length) {
      this.nextSegment = -1;
    }
    this.nextSegment++;
    this.prevSegnent =
      this.nextSegment == 0 ? this.queue[this.queue.length - 1] : this.queue[this.nextSegment];

    const currentItem = this.queue[this.nextSegment];

    return this.segmetns[currentItem];
  }
}
