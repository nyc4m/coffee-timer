import { Component } from '@angular/core';
import { timer, BehaviorSubject, Observable } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass'],
})
export class TimerComponent {
  private readonly timeToWait = 45;

  started = false;

  clock$ = timer(1000, 1000).pipe(map((s) => s + 1));

  private timer45seconds$ = this.clock$.pipe(take(this.timeToWait));

  private timer$ = new BehaviorSubject(this.timer45seconds$);

  timeToPoor$ = new BehaviorSubject(false);

  shownTimer$ = this.timer$.asObservable().pipe(switchMap((e) => e));

  onReset() {
    this.timeToPoor$.next(false);
    this.timer$.next(this.timer45seconds$.pipe(this.notifyWhenTimeIsDone));
  }

  private readonly notifyWhenTimeIsDone = (obs: Observable<number>) => {
    const { timeToWait, timeToPoor$ } = this;
    return obs.pipe(
      tap((t) => {
        if (t >= timeToWait) {
          timeToPoor$.next(true);
        }
      })
    );
  };

  onStart() {
    this.started = true;
    this.timer$.next(this.timer45seconds$.pipe(this.notifyWhenTimeIsDone));
  }
}
