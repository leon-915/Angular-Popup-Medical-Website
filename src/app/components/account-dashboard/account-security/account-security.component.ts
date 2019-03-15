import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, NotificationService } from 'src/app/services';
import { PasswordValidator } from 'src/app/validators';
import { ReCaptchaV3Service } from 'ngx-captcha';

import { SendPassResetConfirmationRequestModel } from 'src/app/models';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-account-security',
  templateUrl: './account-security.component.html',
  styleUrls: ['./account-security.component.less']
})
export class AccountSecurityComponent implements OnInit {
  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  siteKey = environment.recaptchaSiteKey;

  passwordForm: FormGroup;

  textPinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountSrv: AccountService,
    private notificationSrv: NotificationService,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {
    {
    }
  }

  ngOnInit() {
    this.passwordForm = this.fb.group(
      {
        curerentPassword: ['', [Validators.required]],
        recaptcha: ['', Validators.required],
        pwd: [
          '',
          [
            Validators.required,
            PasswordValidator.patternValidator(/\d/, { hasNumber: true }),
            PasswordValidator.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            PasswordValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
            PasswordValidator.patternValidator(/[!@#$%^&*(),.?":{}|<>]/g, {
              hasSpecialCharacters: true
            }),
            Validators.minLength(8)
          ]
        ],
        confirm: ['', [Validators.required]]
      },
      { validator: PasswordValidator.checkPasswordEquality }
    );
    this.textPinForm = this.fb.group({
      pin: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(6)]
      ]
    });
    this.reCaptchaV3Service.execute(
      this.siteKey,
      'homepage',
      token => {
        this.passwordForm.patchValue({ recaptcha: token });
      },
      {
        useGlobalDomain: false // optional
      }
    );
  }
  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  sendPasswordForm() {
    const formValue = this.passwordForm.value;

    this.accountSrv.resetPassValidateCode(formValue).subscribe(res => {
      if (!res.HasError) {
        this.userAction('advance');
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }
  sendTextPinForm() {
    const formValue = this.passwordForm.value;

    this.accountSrv.resetPassValidateCode(formValue).subscribe(res => {
      if (!res.HasError) {
        this.userAction('advance');
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }

  get curerentPassword() {
    return this.passwordForm.get('curerentPassword');
  }
  get pwd() {
    return this.passwordForm.get('pwd');
  }

  get confirm() {
    return this.passwordForm.get('confirm');
  }
  get pin() {
    return this.textPinForm.get('pin');
  }
}
