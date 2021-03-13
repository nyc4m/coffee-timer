import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToClock',
})
export class SecondsToClockPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]) {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;
    return { minutes, seconds };
  }
}
