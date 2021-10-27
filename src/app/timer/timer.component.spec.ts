import { Component } from '@angular/core';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClockComponent } from '../clock/clock.component';
import { SecondsToClockPipe } from '../seconds-to-clock.pipe';
import { TimerComponent } from './timer.component';

@Component({
  template: '<app-timer></app-timer>',
})
class TestHostComponent {}

describe('Timer component', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  function startButton() {
    return fixture.debugElement.query(By.css('button#startButton'));
  }

  function stopButton() {
    return fixture.debugElement.query(By.css('button#stopButton'));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, TimerComponent, SecondsToClockPipe, ClockComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should create component', () => {
    expect(fixture).not.toBeNull();
  });

  describe('stop button', () => {
    beforeEach(() => {
      fixture.detectChanges();
      startButton().nativeElement.click();
      fixture.detectChanges();
    });

    it('should be visible once the timer has started', fakeAsync(() => {
      expect(stopButton()).toBeTruthy();

      discardPeriodicTasks();
    }));

    it('should reset completely the timer', () => {
      stopButton().nativeElement.click();
      fixture.detectChanges();

      expect(startButton()).toBeTruthy();
    });
  });
});
