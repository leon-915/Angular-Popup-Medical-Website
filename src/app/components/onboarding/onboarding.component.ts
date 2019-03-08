import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.less']
})
export class OnboardingComponent implements OnInit {

  public currentStep = 2;

  constructor() { }

  ngOnInit() {
  }

}
