import { Component } from '@angular/core';
import { timer, BehaviorSubject, Observable } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass'],
})
export class TimerComponent {
  readonly timeToWait = environment.timeToWait;

  started = false;

  overallClock$ = timer(0, 1000).pipe(map((s) => s));

  private subTimer$ = this.overallClock$.pipe(take(this.timeToWait));

  private timer$ = new BehaviorSubject(this.subTimer$);

  timeToPoor$ = new BehaviorSubject(false);

  shownTimer$ = this.timer$.asObservable().pipe(switchMap((e) => e));

  onReset() {
    this.timeToPoor$.next(false);
    this.timer$.next(this.subTimer$.pipe(this.notifyWhenTimeIsDone));
  }

  private readonly notifyWhenTimeIsDone = (obs: Observable<number>) => {
    const { timeToWait, timeToPoor$ } = this;
    return obs.pipe(
      tap((t) => {
        if (t >= timeToWait - 1) {
          timeToPoor$.next(true);
        }
      })
    );
  };

  onStart() {
    this.started = true;
    this.timer$.next(this.subTimer$.pipe(this.notifyWhenTimeIsDone));
  }

  onStop() {
    this.started = false;
    this.timeToPoor$.next(false);
  }
}
