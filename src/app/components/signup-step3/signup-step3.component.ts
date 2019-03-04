import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlanService  } from '../../services/index';
import { PlanModel } from '../../models/index';

@Component({
  selector: 'app-signup-step3',
  templateUrl: './signup-step3.component.html',
  styleUrls: ['./signup-step3.component.less']
})
export class SignupStep3Component implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  public plans: PlanModel[] = new Array<PlanModel>();

  constructor(private planSrv: PlanService) {
    this.planSrv.getPlans().subscribe((response) => {
      if (!response.HasError) {
        this.plans = response.Result;
        console.log(this.plans);
      }
    }, (error) => { console.log(error); });
  }

  ngOnInit() {
  }

  userAction(action: string) {
    const step = action === 'back' ? this.step -= 1 : this.step += 1;
    this.action.emit(step);
  }

  selectPlan(plan: PlanModel) {
    this.planSrv.setPlanSelected(plan);
    this.userAction('advance');
  }

}
