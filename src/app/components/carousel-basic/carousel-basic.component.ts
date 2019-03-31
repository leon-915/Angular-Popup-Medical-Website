import { Component } from '@angular/core';

@Component({
  selector: 'app-ngbd-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.less']
})
export class NgbdCarouselBasicComponent {

  plans = [
    {id: 1, name: 'Plan #1'},
    {id: 2, name: 'Plan #2'},
    {id: 3, name: 'Plan #3'},
    {id: 4, name: 'Plan #4'},
    {id: 5, name: 'Plan #5'}
  ];

  selectedPlan = {};
  disableBack = true;
  disableNext = false;
  currentPlan = 0;

  constructor() {

    this.selectedPlan = this.plans[0];
    if (this.plans.length <= 1) {
      this.disableNext = true;
    }

  }

  back() {
    console.log(this.selectedPlan);
    this.currentPlan -= 1;
    this.selectedPlan = this.plans[this.currentPlan];
    this.disableNext = false;
    if (this.currentPlan === 0) {
      this.disableBack =  true;
    }
  }

  next() {
    console.log(this.selectedPlan);
    this.currentPlan += 1;
    this.selectedPlan = this.plans[this.currentPlan];
    this.disableBack = false;
    if (this.currentPlan === (this.plans.length - 1)) {
      this.disableNext = true;
    }
  }


}
