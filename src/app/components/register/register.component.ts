import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService, NotificationService } from 'src/app/services';
import { Router } from '@angular/router';
import { PasswordValidator } from 'src/app/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private signupSrv: SignupService,
    private notificationSrv: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        pwd: [
          '',
          [
            Validators.required,
            PasswordValidator.patternValidator(/\d/, { hasNumber: true }),
            PasswordValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            PasswordValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
            PasswordValidator.patternValidator(/[!@#$%^&*(),.?":{}|<>]/, { hasSpecialCharacters: true }),
            Validators.minLength(8)
          ]
        ],
        confirm: ['', [Validators.required]],
        awsAccountId: [''],
        languageCodeId: [1]
      },
      { validator: PasswordValidator.checkPasswordEquality }
    );
  }

  doRegister() {
    this.signupSrv.signupCognito(this.signupForm.value).subscribe(
      response => {
        if (!response.HasError) {
          this.signupSrv.register(this.signupForm.value).subscribe(
            resp => {
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

  get phoneNumber() {
    return this.signupForm.get('phoneNumber');
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get pwd() {
    return this.signupForm.get('pwd');
  }

  get confirm() {
    return this.signupForm.get('confirm');
  }

}
