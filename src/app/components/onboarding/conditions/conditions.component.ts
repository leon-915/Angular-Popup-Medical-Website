import { ConditionsService, OnboardingService, NotificationService } from './../../../services/index';
import { LookupModel, ConditionsModel, OnboardingRequestModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.less']
})
export class ConditionsComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  public conditions: ConditionsModel = new ConditionsModel();

  public commonConditions: Array<LookupModel> = new Array<LookupModel>();
  public uncommonConditions: Array<LookupModel> = new Array<LookupModel>();
  public showUncommon = false;

  constructor(
    private conditionSrv: ConditionsService,
    private onboardingSrv: OnboardingService,
    private notificationSrv: NotificationService) {

    this.conditionSrv.getConditions().subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.conditions = response.Result;
        console.log(this.conditions);
      }
    }, (error) => { console.log(error); });

  }

  ngOnInit() {

    console.log('Personal info step: ', this.step);

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step = 5);
    this.action.emit(step);
  }

  addCommonCondition(condition: LookupModel) {
    console.log(condition);
    if (condition.display_value === 'Other') {
      this.showUncommon = !this.showUncommon;
      this.uncommonConditions = [];
    } else {
      if (condition.selected) {
        this.commonConditions.push(condition);
      } else {
        const index = this.commonConditions.indexOf(condition);
        if (index > -1) {
          this.commonConditions.splice(index, 1);
        }
      }
      console.log(this.commonConditions);
    }
  }

  nextStep() {
    const myConditions = JSON.stringify(this.commonConditions.concat(this.uncommonConditions));
    console.log(myConditions);

    const onboardingModel = new OnboardingRequestModel();
    onboardingModel.myConditions = myConditions;
    onboardingModel.currentStep = this.step;
    this.onboardingSrv.onboarding(onboardingModel).subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.userAction('advance');
      } else {
        this.notificationSrv.showError(response.Message);
      }
    }, error => { console.log(error); });
  }


}
