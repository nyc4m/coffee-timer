import { Component } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent{

  started = false

  clock$ = timer(1000, 1000).pipe(map(s => s+1))

  private timer45seconds$ = this.clock$.pipe(take(45))

  private timer$ = new BehaviorSubject(this.timer45seconds$)

  shownTimer$ = this.timer$.asObservable().pipe(switchMap(e => e))

  onReset() {
      this.timer$.next(this.timer45seconds$)
  }

  onStart() {
    this.started = true;
    this.timer$.next(this.timer45seconds$)
  }
  
}

