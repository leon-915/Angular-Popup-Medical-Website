import { GenderModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.less']
})
export class PersonalInformationComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  public genders: GenderModel[] = new Array<GenderModel>();

  constructor() {
    this.genders.push({gender_id: 1, gender: 'Male'}, {gender_id: 2, gender: 'Female'}, {gender_id: 3, gender: 'Not to say'});
    console.log(this.genders);
  }

  ngOnInit() {
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  nextStep() {
    console.log(this.step);
  }

}
