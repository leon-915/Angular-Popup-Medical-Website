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
  constructor(private signupSrv: SignupService, private router: Router) {}

  ngOnInit() {
    this.getCommonFormData();
    const member = new SignupRequestModel();
    member.currentStep = 1;
    this.signupSrv.signup(member).subscribe(
      response => {
        console.log(response);
        if (!response.HasError) {
          // response.Result.last_step_completed === 5 ||
          if (response.Result.last_step_completed === 6) {
            console.log('Signup already done. Go to home page');
            this.router.navigate(['/onboarding']);
          } else {
            console.log('Last step was: ', response.Result.last_step_completed);
            this.router.navigate(['/signup']);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  getCommonFormData() {
    this.signupSrv.getCommonFormData().subscribe(res => {
      if (!res.HasError) {
        // response.Result.last_step_completed === 5 ||
        localStorage.setItem(
          'genderList',
          JSON.stringify(res.Result.genderList)
        );
      }
    });
  }
}
