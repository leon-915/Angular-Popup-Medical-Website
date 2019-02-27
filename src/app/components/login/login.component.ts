import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {AccountService } from '../../services/index';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  siteKey = '6LcRX5QUAAAAAJH1hKu5r-uYDuPX_nFnanFbNzCP';

  constructor(private fb: FormBuilder, private accountSrv: AccountService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
       recaptcha: ['', Validators.required]
     });
  }

  doLogin() {

      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;
      const recaptcha = this.loginForm.controls.recaptcha.value;

      this.accountSrv.signin(email, password, recaptcha).subscribe( res => {
          if (!res.HasError) {
            console.log('great');
          } else {
            console.log('not so great');
          }
      });

  }

}
