import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.less']
})
export class OnboardingComponent implements OnInit {

  public currentStep = 1;

  constructor() {
    console.log('Onboarding step: ',this.currentStep);
  }

  ngOnInit() {
  }

  userAction(step: number) {
    console.log('Step received: ',step);
    this.currentStep = step;
    console.log(this.currentStep);
  }

}
