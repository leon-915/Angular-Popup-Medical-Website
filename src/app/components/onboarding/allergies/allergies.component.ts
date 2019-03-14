import { AllergiesService, OnboardingService, NotificationService } from '../../../services/index';
import { AllergiesModel, LookupModel, OnboardingRequestModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrls: ['./allergies.component.less']
})
export class AllergiesComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  public allergies: AllergiesModel = new AllergiesModel();

  public commonAllergies: Array<LookupModel> = new Array<LookupModel>();
  public uncommonAllergies: Array<LookupModel> = new Array<LookupModel>();
  public showUncommon = false;

  constructor(
    private allergieSrv: AllergiesService,
    private onboardingSrv: OnboardingService,
    private notificationSrv: NotificationService) {
    this.allergieSrv.getAllergies().subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.allergies = response.Result;
        console.log(this.allergies);
        this.loadAllergies();
      }
    });
  }

  ngOnInit() {

    console.log('Personal info step: ', this.step);

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step = 1) : (this.step = 3);
    this.action.emit(step);
  }

  addCommonAllergy(allergy: LookupModel) {
    console.log(allergy);
    if (allergy.display_value === 'Other') {
      this.showUncommon = !this.showUncommon;
      this.uncommonAllergies = [];
    } else {

      if (allergy.selected) {
        this.commonAllergies.push(allergy);
      } else {
        const index = this.commonAllergies.findIndex(i =>  i.display_value === allergy.display_value);
        if (index > -1) {
          this.commonAllergies.splice(index, 1);
        }
      }
      console.log(this.commonAllergies);
    }
  }

  loadAllergies() {

    const onboardingInfo = new OnboardingRequestModel();
    onboardingInfo.currentStep = this.step;
    this.onboardingSrv.getOnboardingInfo(onboardingInfo).subscribe((response) => {
      if (!response.HasError && response.Result) {
        const myAllergies = JSON.parse(response.Result.allergies);
        this.commonAllergies = myAllergies.common;
        this.uncommonAllergies = myAllergies.uncommon;
        this.checkSelectedAllergies();
      }
    }, error => { console.log(error); });

  }

  compareWithFunc(a, b) {
    return a.display_value === b.display_value;
  }

  checkSelectedAllergies() {
    for (const commonAllergie of this.commonAllergies) {
      for (const allergie of this.allergies.common_allergies) {
        if (commonAllergie.lookup_allergy_id === allergie.lookup_allergy_id) {
          allergie.selected = true;
        }
      }
    }

    if (this.uncommonAllergies.length > 0) {
      this.showUncommon = true;
      const indexOther = this.allergies.common_allergies.findIndex(i =>  i.display_value === 'Other');
      this.allergies.common_allergies[indexOther].selected = true;
    }
  }

  nextStep() {

    console.log(this.uncommonAllergies);

    const myAllergies = JSON.stringify({
      common: this.commonAllergies,
      uncommon: this.uncommonAllergies
    });
    console.log(myAllergies);
    const onboardingModel = new OnboardingRequestModel();
    onboardingModel.myAllergies = myAllergies;
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
