import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.less']
})
export class ConditionsComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

}
