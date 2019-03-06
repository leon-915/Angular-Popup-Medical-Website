import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/index';
import { SignupRequestModel } from '../../models/index';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  public currentStep = 1;

  constructor(private signupSrv: SignupService) {
    // this.currentStep = this.signupSrv.getSignupStep();
    // console.log('User current step: ',this.currentStep);
    const member = new SignupRequestModel();
    member.currentStep = this.currentStep;
    this.signupSrv.getSignupInformation(member).subscribe((response) => {
      if (!response.HasError) {
        this.currentStep = response.Result.current_step;
      }
    }, (error) => { console.log(error); });
  }

  ngOnInit() {
  }

  userAction(step: number) {
    this.currentStep = step;
  }

}
