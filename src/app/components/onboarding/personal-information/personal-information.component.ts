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
  public months: Array<any> = Array<any>();
  onboardingForm: FormGroup;

  constructor(private fb: FormBuilder, private onboardingSrv: OnboardingService, private notificationSrv: NotificationService) {

    this.genders.push({gender_id: 1, gender: 'Male'}, {gender_id: 2, gender: 'Female'}, {gender_id: 3, gender: 'Not to say'});
    this.days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    this.years = ['2000', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011'];
    this.months = [{id: 1, name: 'January'}, {id: 2, name: 'February'}, {id: 3, name: 'March'},
    {id: 4, name: 'April'}, {id: 5, name: 'May'}, {id: 6, name: 'June'}, {id: 7, name: 'July'},
    {id: 8, name: 'August'}, {id: 9, name: 'September'}, {id: 10, name: 'October'},
    {id: 11, name: 'November'}, {id: 12, name: 'December'}];

  }

  ngOnInit() {
    this.onboardingForm = this.fb.group({
      genderId: ['', [Validators.required]],
      month: [null, [Validators.required]],
      day: [null, [Validators.required]],
      year: [null, [Validators.required]],
      physicianFirstName: ['', [Validators.required]],
      physicianLastName: ['', [Validators.required]],
      physicianPhoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      physicianFax: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      emergencyContactFirstName: ['', [Validators.required]],
      emergencyContactPhoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      emergencyContactRelationship: ['', [Validators.required]],
      currentStep: [this.step]
    });

    this.loadPersonalInformation();

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step = 2);
    this.action.emit(step);
  }

  // Load member information in case he didn't complete the entire onboarding process
  loadPersonalInformation() {
    const onboardingInfo = new OnboardingRequestModel();
    onboardingInfo.currentStep = this.step;
    this.onboardingSrv.getOnboardingInfo(onboardingInfo).subscribe((response) => {
      console.log(response);
      if (!response.HasError && response.Result) {
        this.onboardingForm.controls.genderId.setValue(response.Result.gender_id);
        this.onboardingForm.controls.month.setValue(response.Result.month);
        this.onboardingForm.controls.day.setValue(response.Result.day.toString());
        this.onboardingForm.controls.year.setValue(response.Result.year.toString());
        this.onboardingForm.controls.physicianFirstName.setValue(response.Result.physician_first_name);
        this.onboardingForm.controls.physicianLastName.setValue(response.Result.physician_last_name);
        this.onboardingForm.controls.physicianPhoneNumber.setValue(response.Result.physician_phone);
        this.onboardingForm.controls.physicianFax.setValue(response.Result.physician_fax);
        this.onboardingForm.controls.emergencyContactFirstName.setValue(response.Result.emergency_contact_first_name);
        this.onboardingForm.controls.emergencyContactPhoneNumber.setValue(response.Result.emergency_contact_phone);
        this.onboardingForm.controls.emergencyContactRelationship.setValue(response.Result.emergency_contact_relationship);
      }
    }, error => { console.log(error); });

  }

  get physicianFirstName() {
    return this.onboardingForm.get('physicianFirstName');
  }

  get physicianLastName() {
    return this.onboardingForm.get('physicianLastName');
  }

  get physicianPhoneNumber() {
    return this.onboardingForm.get('physicianPhoneNumber');
  }

  get physicianFax() {
    return this.onboardingForm.get('physicianFax');
  }

  get emergencyContactFirstName() {
    return this.onboardingForm.get('emergencyContactFirstName');
  }

  get emergencyContactPhoneNumber() {
    return this.onboardingForm.get('emergencyContactPhoneNumber');
  }

  get emergencyContactRelationship() {
    return this.onboardingForm.get('emergencyContactRelationship');
  }

  nextStep() {
    this.onboardingSrv.onboarding(this.onboardingForm.value).subscribe(response => {
      if (!response.HasError) {
        this.userAction('advance');
      } else {
        this.notificationSrv.showError(response.Message);
      }
    });
  }

}
