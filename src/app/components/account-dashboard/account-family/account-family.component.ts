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
  selector: 'app-account-family',
  templateUrl: './account-family.component.html',
  styleUrls: ['./account-family.component.less']
})
export class AccountFamilyComponent implements OnInit {
  addMemberForm: FormGroup;

  addGuestMemberForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private accountSrv: AccountService,
    private notificationSrv: NotificationService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private router: Router
  ) {}

  ngOnInit() {
    this.addMemberForm = this.fb.group(
      {
        email: ['', [Validators.required]]
      },
      {}
    );
    this.addGuestMemberForm = this.fb.group(
      {
        email: ['', [Validators.required]]
      },
      {}
    );
  }

  addMember() {}
  addGuestMember() {}
  removeGuestMember() {}

  get email() {
    return this.addMemberForm.get('email');
  }
  get memberEmail() {
    return this.addGuestMemberForm.get('email');
  }
}
