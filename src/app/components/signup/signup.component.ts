import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  public currentStep = 1;

  constructor() { }

  ngOnInit() {
  }

  userAction(step: number) {
    this.currentStep = step;
  }

}
