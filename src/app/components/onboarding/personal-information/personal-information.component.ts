import { GenderModel, OnboardingRequestModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnboardingService, NotificationService } from '../../../services/index';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.less']
})
export class PersonalInformationComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  public genders: GenderModel[] = new Array<GenderModel>();
  public days: Array<string> = new Array<string>();
  public years: Array<string> = new Array<string>();
  onboardingForm: FormGroup;

  constructor(private fb: FormBuilder, private onboardingSrv: OnboardingService, private notificationSrv: NotificationService) {

    this.genders.push({gender_id: 1, gender: 'Male'}, {gender_id: 2, gender: 'Female'}, {gender_id: 3, gender: 'Not to say'});
    this.days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    this.years = ['2000', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011'];

  }

  ngOnInit() {

    console.log('Personal info step: ', this.step);

    this.onboardingForm = this.fb.group({
      genderId: ['', [Validators.required]],
      month: [null, [Validators.required]],
      day: [null, [Validators.required]],
      year: [null, [Validators.required]],
      physicianFirstName: ['', [Validators.required]],
      physicianLastName: ['', [Validators.required]],
      physicianPhoneNumber: ['', [Validators.required]],
      physicianFax: ['', [Validators.required]],
      emergencyContactFirstName: ['', [Validators.required]],
      emergencyContactPhoneNumber: ['', [Validators.required]],
      emergencyContactRelationship: ['', [Validators.required]],
      currentStep: [this.step]
    });

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step = 2);
    this.action.emit(step);
  }

  loadPersonalInformation() {

    /**
     * In process
     */
    const onboardingInfo = new OnboardingRequestModel();
    onboardingInfo.currentStep = this.step;
    this.onboardingSrv.getOnboardingInfo(onboardingInfo).subscribe((response) => {
      console.log(response);
    }, error => { console.log(error); });

  }

  nextStep() {
    console.log(this.onboardingForm.value);
    this.onboardingSrv.onboarding(this.onboardingForm.value).subscribe(response => {
      console.log(response);
      if (!response.HasError) {
        this.userAction('advance');
      } else {
        this.notificationSrv.showError(response.Message);
      }
    });
  }

}
