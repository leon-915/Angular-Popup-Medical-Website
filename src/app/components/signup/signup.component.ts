import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  public currentStep = 3;

  constructor() { }

  ngOnInit() {
  }

  userAction(step: number) {
    console.log(step);
    console.log(this.currentStep);
    this.currentStep = step;
  }

}
