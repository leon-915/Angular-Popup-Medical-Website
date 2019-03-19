import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService, NotificationService } from 'src/app/services';
import { PasswordValidator } from 'src/app/validators';
import { SignupRequestModel } from 'src/app/models';

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
    private router: Router
  ) {}

  ngOnInit() {
    /*this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        pwd: [
          '',
          [Validators.required, PasswordValidator.checkPasswordStrength]
        ],
        confirm: ['', [Validators.required]]
      },
      { validator: PasswordValidator.checkPasswordEquality }
    );*/
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        pwd: [
          '',
          [
            Validators.required,
            PasswordValidator.patternValidator(/\d/, { hasNumber: true }),
            PasswordValidator.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            PasswordValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
            PasswordValidator.patternValidator(/[!@#$%^&*(),.?":{}|<>]/, {
              hasSpecialCharacters: true
            }),
            Validators.minLength(8)
          ]
        ],
        confirm: ['', [Validators.required]]
      },
      { validator: PasswordValidator.checkPasswordEquality }
    );
  }

  doRegister() {
    this.signupSrv.signupCognito(this.signupForm.value).subscribe(
      response => {
        console.log(response);
        if (!response.HasError) {
          const member = new SignupRequestModel();
          member.email = this.signupForm.controls.email.value;
          member.pwd = this.signupForm.controls.pwd.value;
          member.awsAccountId = response.Result.userSub;
          member.currentStep = 1;
          console.log(member);
          this.signupSrv.register(member).subscribe(
            resp => {
              console.log(resp);
              if (!resp.HasError) {
                this.router.navigateByUrl('/signup-confirm');
              } else {
                this.notificationSrv.showError(resp.Message);
              }
            },
            error => {
              console.log(error);
            }
          );
        } else {
          this.notificationSrv.showError(response.Message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  get email() {
    return this.signupForm.get('email');
  }

  get pwd() {
    return this.signupForm.get('pwd');
  }

  get confirm() {
    return this.signupForm.get('confirm');
  }
}
