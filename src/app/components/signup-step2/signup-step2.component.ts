import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.component.html',
  styleUrls: ['./signup-step2.component.less']
})
export class SignupStep2Component implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.signupForm = this.fb.group({
      accept_terms: ['', [Validators.required]],
      accept_privacy_policy: ['', [Validators.required]],
      accept_data_sharing: ['', [Validators.required]],
      opt_in_email: ['', [Validators.required]],
      opt_in_sms: ['', [Validators.required]]
    });

  }

  userAction(action: string) {
    const step = action === 'back' ? this.step -= 1 : this.step += 1;
    /*if(action === 'back') {
      this.step -= 1;
    } else {
      this.step += 1;
    }*/
    this.action.emit(step);
  }

  doSignup() {
    console.log('do login...');
    this.userAction('advance');
  }

}
