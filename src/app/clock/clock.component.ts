import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.sass'],
})
export class ClockComponent {
  @Input() time: Record<'minutes' | 'seconds', number>;

  @Input() display: 'all' | 'seconds' = 'all';

  constructor() {}
}
