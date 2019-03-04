import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-step1',
  templateUrl: './signup-step1.component.html',
  styleUrls: ['./signup-step1.component.less']
})
export class SignupStep1Component implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required]],
      confirm: ['', [Validators.required]]
    });

  }

  userAction(action: string) {
    const step = action === 'back' ? this.step -= 1 : this.step += 1;
    this.action.emit(step);
  }

  doSignup() {
    this.userAction('advance');
  }

}
