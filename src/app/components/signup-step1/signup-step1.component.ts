import { PasswordValidator } from './../../validators/password.validator';
import { SignupService, NotificationService } from '../../services/index';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupRequestModel } from '../../models/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-step1',
  templateUrl: './signup-step1.component.html',
  styleUrls: ['./signup-step1.component.less']
})
export class SignupStep1Component implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private signupSrv: SignupService,
    private notificationSrv: NotificationService,
    private router: Router) { }

  ngOnInit() {

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, PasswordValidator.checkPasswordStrength]],
      confirm: ['', [Validators.required]]
    }, { validator: PasswordValidator.checkPasswordEquality});

  }

  doSignup() {
    this.signupSrv.signupCognito(this.signupForm.value).subscribe((response) => {
      console.log(response);
      if (!response.HasError) {

        const member = new SignupRequestModel();
        member.email = this.signupForm.controls.email.value;
        member.pwd = this.signupForm.controls.pwd.value;
        member.awsAccountId = response.Result.userSub;
        member.currentStep = 1;
        console.log(member);
        this.signupSrv.register(member).subscribe((resp) => {
          console.log(resp);
          if (!resp.HasError) {
            this.router.navigateByUrl('/signup-confirm');
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
