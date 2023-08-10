import { TIME_PATTERN } from '@/shared/api/helpers/timeHelper';
import { MinimalRangeError, ValidationError } from '../../shared/api/exceptions/exceptions';
import { TSegment } from './types';

export class SegmetnsTime {
  private segmetns: TSegment[];
  private nextSegment: number;
  private prevSegnent: number;
  private queue: Array<number>;

  public constructor(segments: TSegment[]) {
    this.segmetns = segments;
    this.nextSegment = -1;
    this.prevSegnent = -1;
    this.queue = [];
  }

  public set SetQueue(items: Array<number>) {
    if (items.length < 2) {
      throw new MinimalRangeError('Segment queue must have more 2 items');
    }
    this.queue = items;
  }

  private timeToSecond(timeString: string) {
    const partsTime = timeString.split(':');

    const hours = Number.parseInt(partsTime[0]);
    const minutes = Number.parseInt(partsTime[1]);
    const seconds = Number.parseInt(partsTime[2]);

    return hours * 3600 + minutes * 60 + seconds;
  }

  public getTime(segmetnName: string) {
    const currentSegment = this.segmetns.filter((item) => item.name == segmetnName.trim());

    if (currentSegment.length == 0) {
      throw new ValidationError(`Segmetn ${segmetnName} not found`);
    }

    if (!currentSegment[0].time.match(TIME_PATTERN)) {
      throw new ValidationError('Incorrect time format');
    }

    return this.timeToSecond(currentSegment[0].time);
  }

  public getNext() {
    if (this.nextSegment >= this.queue.length) {
      this.nextSegment = -1;
    }
    this.nextSegment++;
    this.prevSegnent =
      this.nextSegment == 0 ? this.queue[this.queue.length - 1] : this.queue[this.nextSegment];
    const currentItem = this.queue[this.nextSegment];

    return this.timeToSecond(this.segmetns[currentItem].time);
  }
}
