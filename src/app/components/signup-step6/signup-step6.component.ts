import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup-step6',
  templateUrl: './signup-step6.component.html',
  styleUrls: ['./signup-step6.component.less']
})
export class SignupStep6Component implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  userAction(action: string) {
    const step = action === 'back' ? this.step -= 1 : this.step += 1;
    this.action.emit(step);
  }

  doSignup() {
    this.userAction('advance');
  }

}
