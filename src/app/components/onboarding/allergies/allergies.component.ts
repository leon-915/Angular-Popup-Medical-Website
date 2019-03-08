import { LookupModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrls: ['./allergies.component.less']
})
export class AllergiesComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  public allergies: Array<LookupModel> = new Array<LookupModel>();
  public selectedAllergies;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.allergies.push({ lookup_allergy_id: i, display_value: 'Allergie #' + i, is_common: true, selected: false });
    }
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  addCommonCondition(condition: LookupModel) {
    console.log(condition);
    if (condition.selected) {
      this.selectedAllergies.push(condition.lookup_allergy_id);
    } else {
      const index = this.selectedAllergies.indexOf(condition.lookup_allergy_id);
      if (index > -1) {
        this.selectedAllergies.splice(index, 1);
      }
    }

    console.log(this.selectedAllergies);
  }

  nextStep() {
    console.log('adsa');
    console.log(this.step);
    this.step = 3;
    this.action.emit(this.step);
  }

}
