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
import { SendPassResetConfirmationRequestModel } from 'src/app/models';

@Component({
  selector: 'app-reset-password-step2',
  templateUrl: './reset-password-step2.component.html',
  styleUrls: ['./reset-password-step2.component.less']
})
export class ResetPasswordStep2Component implements OnInit {
  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  passChangeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountSrv: AccountService,
    private notificationSrv: NotificationService
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
  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  resetPassword() {
    const formValue = this.passChangeForm.value;

    const changePayload: SendPassResetConfirmationRequestModel = {
      email: formValue.email,
      confirmation_code: formValue.email,
      new_password: formValue.password
    };
    this.accountSrv.resetPassSendChage(changePayload).subscribe(res => {
      if (!res.HasError) {
        console.log(JSON.stringify(res));
        this.userAction('advance');
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }
}
