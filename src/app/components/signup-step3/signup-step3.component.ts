import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlanService, SignupService  } from '../../services/index';
import { PlanModel, SignupRequestModel } from '../../models/index';

@Component({
  selector: 'app-signup-step3',
  templateUrl: './signup-step3.component.html',
  styleUrls: ['./signup-step3.component.less']
})
export class SignupStep3Component implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  public plans: PlanModel[] = new Array<PlanModel>();

  constructor(private planSrv: PlanService, private signupSrv: SignupService) {
    this.planSrv.getPlans().subscribe((response) => {
      if (!response.HasError) {
        this.plans = response.Result;
      }
    }, (error) => { console.log(error); });
  }

  ngOnInit() {
  }

  userAction(action: string) {
    const step = action === 'back' ? this.step -= 1 : this.step += 1;
    this.action.emit(step);
  }

  goToStep(step: number) {
    this.action.emit(step);
  }

  selectPlan(plan: PlanModel) {
    const planMember = new SignupRequestModel();
    planMember.planId = plan.plan_id;
    planMember.currentStep = 3;
    this.signupSrv.signup(planMember).subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.userAction('advance');
      }
    }, (error) => { console.log(error); });

  }

}
