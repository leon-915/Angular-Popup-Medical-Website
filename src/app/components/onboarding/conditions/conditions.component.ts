import { ConditionsService } from './../../../services/index';
import { LookupModel, ConditionsModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.less']
})
export class ConditionsComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  public commonConditions: ConditionsModel[];
  public uncommonConditions: ConditionsModel[];

  public commonConditionsSelected: Array<number> = new Array<number>();
  public uncommonConditionsSelected: Array<number> = new Array<number>();
  public showUncommon = false;

  constructor(private conditionSrv: ConditionsService) {

    this.conditionSrv.getConditions().subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.commonConditions = response.Result.common_conditions;
        this.uncommonConditions = response.Result.uncommon_conditions;
      }
    }, (error) => { console.log(error); });

  }

  ngOnInit() {

    console.log('Personal info step: ', this.step);

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  addCommonCondition(condition: LookupModel) {
    console.log(condition);
    if (condition.display_value === 'Other') {
      this.showUncommon = !this.showUncommon;
    } else {
      if (condition.selected) {
        this.commonConditionsSelected.push(condition.lookup_condition_id);
      } else {
        const index = this.commonConditionsSelected.indexOf(condition.lookup_condition_id);
        if (index > -1) {
          this.commonConditionsSelected.splice(index, 1);
        }
      }
      console.log(this.commonConditionsSelected);
    }
  }

  nextStep() {
    const myConditions = this.commonConditionsSelected.concat(this.uncommonConditionsSelected);
    console.log(myConditions);
    this.step = 4;
    this.action.emit(this.step);
  }


}
