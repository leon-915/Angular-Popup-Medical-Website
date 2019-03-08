import { LookupModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.less']
})
export class ConditionsComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  public conditions: Array<LookupModel> = new Array<LookupModel>();
  public selectedConditions: Array<number> = new Array<number>();

  constructor() { }

  ngOnInit() {

    for (let i = 0; i < 10; i++) {
      this.conditions.push({lookup_condition_id: i, display_value: 'Condition #' + i, is_common: true, selected: false});
    }

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  addCommonCondition(condition: LookupModel) {
    console.log(condition);
    if (condition.selected) {
      this.selectedConditions.push(condition.lookup_condition_id);
    } else {
      const index = this.selectedConditions.indexOf(condition.lookup_condition_id);
      if (index > -1) {
        this.selectedConditions.splice(index, 1);
      }
    }

    console.log(this.selectedConditions);
  }

}
