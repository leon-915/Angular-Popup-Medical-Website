import { SignupService  } from '../../services/index';
import { PoliciesService } from '../../services/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupRequestModel } from '../../models/index';

@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.component.html',
  styleUrls: ['./signup-step2.component.less']
})
export class SignupStep2Component implements OnInit {
  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private signupSrv: SignupService) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      acceptTerms: ['', [Validators.required]],
      acceptPrivacyPolicy: ['', [Validators.required]],
      acceptDataSharing: ['', [Validators.required]],
      optInEmail: ['', [Validators.required]],
      optInSms: ['', [Validators.required]],
      currentStep: [this.step],
      languageCodeId: [1]
    });

    const member = new SignupRequestModel();
    member.currentStep = 2;
    this.signupSrv.getSignupInformation(member).subscribe((response) => {
      console.log(response);
      if (!response.HasError && response.Result) {
        this.signupForm.controls.acceptTerms.setValue(true);
        this.signupForm.controls.acceptPrivacyPolicy.setValue(true);
        this.signupForm.controls.acceptDataSharing.setValue(true);
        this.signupForm.controls.optInEmail.setValue(true);
        this.signupForm.controls.optInSms.setValue(true);
      }
    }, (error) => { console.log(error); });
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  doSignup() {
    this.signupSrv.signup(this.signupForm.value).subscribe((resp) => {
      console.log(resp);
      if (!resp.HasError) {
        this.userAction('advance');
      } else {
        // this.notificationSrv.showError(resp.Message);
        console.log('Error');
      }
    }, (error) => { console.log(error); });
  }
}
