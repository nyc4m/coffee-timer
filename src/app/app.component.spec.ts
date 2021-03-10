import { async, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ElapsedTimePipe } from './elapsed-time.pipe';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ElapsedTimePipe
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe("on startup", () => {
    it("should have a button to start the timer", ()=>{
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges()
      expect(fixture.debugElement.query(By.css('button'))).not.toBeNull()
    })

    it("should hide start button on click", () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges()

      const button = fixture.debugElement.query(By.css('#startButton'))
      button.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges()

      expect(fixture.debugElement.query(By.css('#startButton'))).toBeNull()
    })
  })
});
