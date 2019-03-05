import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterContentInit
} from '@angular/core';

@Component({
  selector: 'app-reset-password-step1',
  templateUrl: './reset-password-step1.component.html',
  styleUrls: ['./reset-password-step1.component.less']
})
export class ResetPasswordStep1Component implements OnInit, AfterContentInit {
  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  constructor(private router: Router) {}
  ngOnInit() {}
  ngAfterContentInit(): void {
    setTimeout(this.goToStep3.bind(this), 3000);
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }
  goToStep3() {
    this.userAction('advance');
  }
}
