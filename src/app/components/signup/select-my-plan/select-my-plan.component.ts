import { PlanService, SignupService } from 'src/app/services/index';
import { PlanModel, SignupRequestModel } from './../../../models/index';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-my-plan',
  templateUrl: './select-my-plan.component.html',
  styleUrls: ['./select-my-plan.component.less']
})
export class SelectMyPlanComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  public plans: PlanModel[] = new Array<PlanModel>();
  public planSelected: PlanModel = new PlanModel();

  constructor(private planSrv: PlanService, private signupSrv: SignupService) {}

  ngOnInit() {

    this.getPlans();

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  getPlans() {

    this.planSrv.getPlans().subscribe(response => {
      if (!response.HasError) {
        this.plans = response.Result;
        console.log(this.plans);
      }
    }, error => { console.log(error); });

  }

  selectPlan(plan: PlanModel) {
    console.log(this.step);
    const planMember = new SignupRequestModel();
    planMember.planId = plan.plan_id;
    planMember.currentStep = this.step;
    console.log(planMember);
    this.signupSrv.signup(planMember).subscribe(
      response => {
        console.log(response);
        if (!response.HasError) {
          this.step = 3;
          this.action.emit(this.step);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}