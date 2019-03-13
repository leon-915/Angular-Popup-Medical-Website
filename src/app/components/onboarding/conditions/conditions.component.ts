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
        this.loadConditions();
      }
    }, (error) => { console.log(error); });

  }

  ngOnInit() {

    console.log('Personal info step: ', this.step);

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step = 2) : (this.step = 4);
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
        const index = this.commonConditions.findIndex(i =>  i.display_value === condition.display_value);
        if (index > -1) {
          this.commonConditions.splice(index, 1);
        }
      }
      console.log(this.commonConditions);
    }
  }

  loadConditions() {

    const onboardingInfo = new OnboardingRequestModel();
    onboardingInfo.currentStep = this.step;
    this.onboardingSrv.getOnboardingInfo(onboardingInfo).subscribe((response) => {
      console.log(response);
      if (!response.HasError && response.Result) {
        const myConditions = JSON.parse(response.Result.conditions);
        this.commonConditions = myConditions.common;
        this.uncommonConditions = myConditions.uncommon;
        console.log(this.commonConditions);
        console.log(this.uncommonConditions);
        this.checkSelectedConditions();
      }
    }, error => { console.log(error); });

  }

  compareWithFunc(a, b) {
    return a.display_value === b.display_value;
  }

  checkSelectedConditions() {
    /*for (let c = 0; c < this.commonConditions.length; c++) {
      for (let i = 0; i < this.conditions.common_conditions.length; i++) {
        if (this.commonConditions[c].lookup_condition_id === this.conditions.common_conditions[i].lookup_condition_id) {
          this.conditions.common_conditions[i].selected = true;
        }
      }
    }*/

    for (const commonCondition of this.commonConditions) {
      for (const condition of this.conditions.common_conditions) {
        if (commonCondition.lookup_condition_id === condition.lookup_condition_id) {
          // this.allergies.common_allergies[i].selected = true;
          condition.selected = true;
        }
      }
    }

    if (this.uncommonConditions.length > 0) {
      this.showUncommon = true;
      const indexOther = this.conditions.common_conditions.findIndex(i =>  i.display_value === 'Other');
      this.conditions.common_conditions[indexOther].selected = true;
    }
  }

  nextStep() {
    const myConditions = JSON.stringify({
      common: this.commonConditions,
      uncommon: this.uncommonConditions
    });
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
