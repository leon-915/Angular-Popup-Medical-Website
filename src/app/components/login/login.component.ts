import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginRequestModel } from './../../models/account.model';
import { AccountService, NotificationService  } from '../../services/index';
import { environment } from '../../../environments/environment';
import { ReCaptchaV3Service } from 'ngx-captcha';


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
    private notificationSrv: NotificationService
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

    this.accountSrv.signin(this.loginForm.value).subscribe(res => {
      if (!res.HasError) {
        localStorage.setItem('token', res.Result.accessToken.jwtToken);

      } else {
        this.notificationSrv.showError( res.Message );
      }
    });

  }

}
