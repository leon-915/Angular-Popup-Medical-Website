import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '../../services/index';
import { environment } from '../../../environments/environment';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  siteKey = environment.recaptchaSiteKey;


  constructor(
    private fb: FormBuilder,
    private accountSrv: AccountService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private notifierSrv: NotifierService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });


    this.reCaptchaV3Service.execute(this.siteKey, 'homepage', (token) => {
      this.loginForm.patchValue({ recaptcha: token });
    }, {
        useGlobalDomain: false // optional
      });

  }

  doLogin() {
    // debugger;

    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    const recaptcha = this.loginForm.controls.recaptcha.value;

    this.accountSrv.signin(email, password, recaptcha).subscribe(res => {
      if (!res.HasError) {

      } else {
        this.notifierSrv.notify('error', res.Message );
      }
    });

  }

}
