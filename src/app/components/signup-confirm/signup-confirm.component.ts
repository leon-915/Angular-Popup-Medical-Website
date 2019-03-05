import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup-confirm',
  templateUrl: './signup-confirm.component.html',
  styleUrls: ['./signup-confirm.component.less']
})
export class SignupConfirmComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  goLogin() {

    /*this.accountSrv.signin(this.loginForm.value).subscribe(res => {
      if (!res.HasError) {
        localStorage.setItem('token', res.Result.accessToken.jwtToken);
        this.router.navigate(['/', {}]);
      } else {
        this.notificationSrv.showError( res.Message );
      }
    });*/
    console.log('login');

  }
}
