import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AccountService,
  NotificationService,
  DataService
} from 'src/app/services';
import { PasswordValidator } from 'src/app/validators';
import { SendPassResetConfirmationRequestModel } from 'src/app/models';

@Component({
  selector: 'app-reset-password-step2',
  templateUrl: './reset-password-step2.component.html',
  styleUrls: ['./reset-password-step2.component.less']
})
export class ResetPasswordStep2Component implements OnInit {
  passChangeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountSrv: AccountService,
    private notificationSrv: NotificationService,
    private dataSrv: DataService
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
        ]
      },
      {
        validator: PasswordValidator.MatchPassword // your validation method
      }
    );
  }

  resetPassword = () => {
    const formValue = this.passChangeForm.value;
    const email = this.dataSrv.showTour;

    const changePayload: SendPassResetConfirmationRequestModel = {
      email: formValue.email,
      confirmation_code: formValue.email,
      new_password: formValue.password
    };
    this.accountSrv.resetPassSendChage(changePayload).subscribe(res => {
      if (!res.HasError) {
        console.log(JSON.stringify(res));
        this.router.navigate(['/reset/step3', {}]);
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  };
}
