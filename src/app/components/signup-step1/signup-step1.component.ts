import { PasswordValidator } from './../../validators/password.validator';
import { SignupService, NotificationService } from '../../services/index';
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

  constructor(private fb: FormBuilder, private signupSrv: SignupService, private notificationSrv: NotificationService) { }

  ngOnInit() {

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, PasswordValidator.checkPasswordStrength]],
      confirm: ['', [Validators.required]],
      currentStep: [this.step]
    }, { validator: PasswordValidator.checkPasswordEquality});

  }

  confirmAccount() {
    this.step = 0;
    this.action.emit(this.step);
  }

  doSignup() {
    this.signupSrv.signupCognito(this.signupForm.value).subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        // create the user in the database consuming the other API. Create new model? Use the login one?
        // Remove this comments after we have the sub-id from cognito in the token
        /*const member = new SignupRequestModel();
        member.email = this.signupForm.controls.email.value;
        member.pwd = this.signupForm.controls.pwd.value;
        member.awsAccountId = response.Result.userSub;
        member.currentStep = 1;
        console.log(member);*/
        this.signupSrv.signup(this.signupForm.value).subscribe((resp) => {
          console.log(resp);
          if (!resp.HasError) {
            this.confirmAccount();
          } else {
            this.notificationSrv.showError(resp.Message);
          }
        }, (error) => { console.log(error); });
      } else {
        this.notificationSrv.showError(response.Message);
      }
    }, (error) => { console.log(error); });
  }

}
