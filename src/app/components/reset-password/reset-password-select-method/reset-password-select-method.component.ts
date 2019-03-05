import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, NotificationService } from 'src/app/services';
import { PasswordValidator } from 'src/app/validators';

@Component({
  selector: 'app-reset-password-select-method',
  templateUrl: './reset-password-select-method.component.html',
  styleUrls: ['./reset-password-select-method.component.less']
})
export class ResetPasswordSelectMethodComponent implements OnInit {
  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountSrv: AccountService,
    private notificationSrv: NotificationService
  ) {}

  ngOnInit() {
    this.resetForm = this.fb.group(
      {
        email: ['', [Validators.email]],
        phone: [''],
        currentStep: [this.step]
      },
      {
        validator: PasswordValidator.LookEmptyness // your validation method
      }
    );
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  resetPassword() {
    const formValue = this.resetForm.value;
    const emailReq = { email: formValue.email };

    this.accountSrv.resetPassSendEmail(emailReq).subscribe(res => {
      if (!res.HasError) {
        console.log(JSON.stringify(res));
        this.userAction('advance');
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }
}
