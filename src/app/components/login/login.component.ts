import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService, NotificationService, SignupService  } from '../../services/index';
import { environment } from '../../../environments/environment';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { Router } from '@angular/router';

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
    private notificationSrv: NotificationService,
    private router: Router,
    private singupSrv: SignupService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['josechaconvargas02@gmail.com', [Validators.required, Validators.email]],
      pwd: ['Lanceloth02!', Validators.required],
      recaptcha: ['', Validators.required],
      currentStep: [1]
    });


    this.reCaptchaV3Service.execute(this.siteKey, 'homepage', (token) => {
      this.loginForm.patchValue({ recaptcha: token });
    }, {
        useGlobalDomain: false // optional
      });

  }

  doLogin() {

    /*this.accountSrv.signin(this.loginForm.value).subscribe(res => {
      if (!res.HasError) {
        localStorage.setItem('token', res.Result.accessToken.jwtToken);
        this.router.navigate(['/']);
      } else {
        this.notificationSrv.showError( res.Message );
      }
    });*/
    console.log(this.loginForm.value);
    this.singupSrv.signup(this.loginForm.value).subscribe(response => {
      console.log(response);
      if (!response.HasError) {
        if (response.Result.last_step_completed === 5 || response.Result.last_step_completed === 6) {
          console.log('Signup already done. Go to home page');
        } else {
          console.log('Last step was: ', response.Result.last_step_completed);
          // this.singupSrv.setSignupStep(response.Result.current_step);
          this.router.navigate(['/signup']);
        }
      }
    }, (error) => { console.log(error); });

  }

}
