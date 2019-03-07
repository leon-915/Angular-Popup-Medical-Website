import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, NotificationService } from 'src/app/services';
import { PasswordValidator } from 'src/app/validators';
import { ReCaptchaV3Service } from 'ngx-captcha';

import { SendPassResetConfirmationRequestModel } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password-step2',
  templateUrl: './reset-password-step2.component.html',
  styleUrls: ['./reset-password-step2.component.less']
})
export class ResetPasswordStep2Component implements OnInit {
  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  siteKey = environment.recaptchaSiteKey;

  passChangeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountSrv: AccountService,
    private notificationSrv: NotificationService,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {
    {
    }
  }

  ngOnInit() {
    this.passChangeForm = this.fb.group(
      {
        confirmationCode: ['', [Validators.required]],
        password: [
          '',
          [Validators.required, PasswordValidator.checkPasswordStrength]
        ],
        confirmPassword: [
          '',
          [Validators.required, PasswordValidator.checkPasswordStrength]
        ],
        recaptcha: ['', Validators.required]
      },
      {
        validator: PasswordValidator.MatchPassword // your validation method
      }
    );
    this.reCaptchaV3Service.execute(
      this.siteKey,
      'homepage',
      token => {
        this.passChangeForm.patchValue({ recaptcha: token });
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

  resetPassword() {
    const formValue = this.passChangeForm.value;

    const changePayload: SendPassResetConfirmationRequestModel = {
      email: formValue.email,
      confirmation_code: this.accountSrv.getUserEmail(),
      new_password: formValue.password
    };
    this.accountSrv.resetPassValidateCode(changePayload).subscribe(res => {
      if (!res.HasError) {
        this.userAction('advance');
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }
}
