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

  public currentStep = -1;

  constructor(private signupSrv: SignupService, private router: Router) {
    // this.currentStep = this.signupSrv.getSignupStep();
    // console.log('User current step: ',this.currentStep);
    // Only if the user is log in. Simulating the process.
    // Tambien se debe validad el boton de atras del navegador.
    // Si le da next va al onboarding y si le da back? deberia llevarlo al onboarding de nuevo?
    const token: string = sessionStorage.getItem('token');
    console.log(token);

    if (token) {
      const member = new SignupRequestModel();
      member.currentStep = this.currentStep;
      console.log(member.currentStep);
      this.signupSrv.getSignupInformation(member).subscribe((response) => {
        console.log(response);
        if (!response.HasError) {
          if (response.Result.current_step === 7) {
            this.router.navigateByUrl('/onboarding');
          } else {
            this.currentStep = response.Result.current_step;
          }
        }
      }, (error) => { console.log(error); });
    } else {
      console.log('user no login');
      this.currentStep = 1;
    }
  }

  ngOnInit() {
  }

  userAction(step: number) {
    this.currentStep = step;
  }

}
