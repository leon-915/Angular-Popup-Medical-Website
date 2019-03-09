import { GenderModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.less']
})
export class PersonalInformationComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  public genders: GenderModel[] = new Array<GenderModel>();
  onboardingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.genders.push({gender_id: 1, gender: 'Male'}, {gender_id: 2, gender: 'Female'}, {gender_id: 3, gender: 'Not to say'});
  }

  ngOnInit() {

    console.log('Personal info step: ', this.step);

    this.onboardingForm = this.fb.group({
      gender: ['', [Validators.required]],
      month: ['', [Validators.required]],
      day: ['', [Validators.required]],
      year: ['', [Validators.required]],
      physicianFirstName: ['', [Validators.required]],
      physicianLastName: ['', [Validators.required]],
      physicianPhoneNumber: ['', [Validators.required]],
      physicianFax: ['', [Validators.required]],
      emergencyContactFirstName: ['', [Validators.required]],
      emergencyContactPhoneNumber: ['', [Validators.required]],
      emergencyContactRelationship: ['', [Validators.required]]
    });

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  nextStep() {
    console.log(this.onboardingForm.value);
    /*this.step = 2;
    this.action.emit(this.step);*/
    this.userAction('advance');
  }

}
