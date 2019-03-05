import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AccountService,
  NotificationService,
  DataService
} from 'src/app/services';
import { PasswordValidator } from 'src/app/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {
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
        phone: ['']
      },
      {
        validator: PasswordValidator.LookEmptyness // your validation method
      }
    );
  }

  resetPassword = () => {
    const formValue = this.resetForm.value;
    const emailReq = { email: formValue.email };

    this.accountSrv.resetPassSendEmail(emailReq).subscribe(res => {
      if (!res.HasError) {
        console.log(JSON.stringify(res));
        this.router.navigate(['/reset/step1']);
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  };
}
