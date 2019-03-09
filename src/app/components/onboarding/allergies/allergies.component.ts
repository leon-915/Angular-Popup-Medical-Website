import { AllergiesService } from '../../../services/index';
import { AllergiesModel, LookupModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrls: ['./allergies.component.less']
})
export class AllergiesComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  public commonAllergies: AllergiesModel[];
  public uncommonAllergies: AllergiesModel[];

  public commonAllergiesSelected: Array<number> = new Array<number>();
  public uncommonAllergiesSelected: Array<number> = new Array<number>();
  public showUncommon = false;

  constructor(private allergieSrv: AllergiesService) {
    this.allergieSrv.getAllergies().subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.commonAllergies = response.Result.common_allergies;
        this.uncommonAllergies = response.Result.uncommon_allergies;
      }
    });
  }

  ngOnInit() {

    console.log('Personal info step: ', this.step);

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  addCommonAllergies(condition: LookupModel) {
    console.log(condition);
    if (condition.display_value === 'Other') {
      this.showUncommon = !this.showUncommon;
    } else {

      if (condition.selected) {
        this.commonAllergiesSelected.push(condition.lookup_allergy_id);
      } else {
        const index = this.commonAllergiesSelected.indexOf(condition.lookup_allergy_id);
        if (index > -1) {
          this.commonAllergiesSelected.splice(index, 1);
        }
      }
      console.log(this.commonAllergiesSelected);
    }
  }

  nextStep() {
    const myAllergies = this.commonAllergiesSelected.concat(this.uncommonAllergiesSelected);
    console.log(myAllergies);
    console.log(this.step);
    this.step = 3;
    console.log(this.step);
    this.action.emit(this.step);
  }

}
