import { SignupService } from '../../services/index';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupRequestModel } from 'src/app/models';

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.less']
})
export class MyHomeComponent implements OnInit {

  constructor(private signupSrv: SignupService, private router: Router) { }

  ngOnInit() {

    // Get the user information here to send to the server (email, and sub)
    const member = new SignupRequestModel();
    // member.email = 'josechaconvargas02@gmail.com';
    member.currentStep = 1;
    this.signupSrv.signup(member).subscribe(response => {
      console.log(response);
      if (!response.HasError) {
        if (response.Result.last_step_completed === 5 || response.Result.last_step_completed === 6) {
          console.log('Signup already done. Go to home page');
          this.router.navigate(['/dashboard']);
        } else {
          console.log('Last step was: ', response.Result.last_step_completed);
          this.router.navigate(['/signup']);
        }
      }
    }, (error) => { console.log(error); });


  }

}
