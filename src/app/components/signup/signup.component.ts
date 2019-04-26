import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/index';
import { SignupRequestModel } from '../../models/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  public currentStep = 1;

  constructor(private signupSrv: SignupService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const member = new SignupRequestModel();
    member.currentStep = this.currentStep;
    console.log(member.currentStep);
    this.signupSrv.getSignupInformation(member).subscribe(
      response => {
        console.log(response);
        if (!response.HasError) {
          const result = response.Result;
          const memberType = result.member_type_id ? String(result.member_type_id) : '';
          localStorage.setItem('member_type_id', memberType);

          if (response.Result.current_step === 5) {
            this.router.navigate(['../onboarding'], { relativeTo: this.activatedRoute });
          } else {
            this.currentStep = response.Result.current_step;
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  userAction(step: number) {
    this.currentStep = step;
  }
}
