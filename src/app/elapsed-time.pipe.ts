import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elapsedTime'
})
export class ElapsedTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const minutes = Math.floor(value / 60);
    const secondes = value - (minutes*60)
    if(minutes > 0) {
      return `${this.minute(minutes)} ${this.second(secondes)}`
    }
    return `${secondes} second${secondes > 1 ? 's': ''}`
  }

  private formatTime(value: number, unit: string): string {
      return `${value} ${unit}${value>1?'s':''}`
  }

  private readonly second = (second: number) => {
      return this.formatTime(second, 'second')
  }

  private readonly minute = (minute: number) => {
      return this.formatTime(minute, 'minute')
  }

}

