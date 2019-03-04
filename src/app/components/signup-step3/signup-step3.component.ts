import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlanService  } from '../../services/index';
import { PlanResult } from 'src/app/models';

@Component({
  selector: 'app-signup-step3',
  templateUrl: './signup-step3.component.html',
  styleUrls: ['./signup-step3.component.less']
})
export class SignupStep3Component implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  public plans: Array<PlanResult> = [];

  constructor(private planSrv: PlanService) {
    this.planSrv.getPlans().subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        /**
         * Preguntar a Jorge como corregir el [] por .
         */
        this.plans = response.Result['rows'];
        console.log(this.plans);
      }
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  userAction(action: string) {
    const step = action === 'back' ? this.step -= 1 : this.step += 1;
    this.action.emit(step);
  }

  selectPlan() {
    this.userAction('advance');
  }

}
