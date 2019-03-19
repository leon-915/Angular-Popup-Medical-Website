import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/index';
import { SignupRequestModel } from '../../models/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  public currentStep = 4;

  constructor(private signupSrv: SignupService, private router: Router) {}

  ngOnInit() {

    const member = new SignupRequestModel();
    member.currentStep = this.currentStep;
    console.log(member.currentStep);
    this.signupSrv.getSignupInformation(member).subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        if (response.Result.current_step === 4) {
          this.router.navigateByUrl('/onboarding');
        } else {
          this.currentStep = response.Result.current_step;
        }
      }
    }, (error) => { console.log(error); });

  }

  userAction(step: number) {
    this.currentStep = step;
  }

}
