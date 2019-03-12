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

        /*const allergyModel = new LookupModel();
        allergyModel.lookup_allergy_id = allergy.lookup_allergy_id;
        allergyModel.display_value = allergy.display_value;*/

        this.commonAllergies.push(allergy);
      } else {
        const index = this.commonAllergies.indexOf(allergy);
        if (index > -1) {
          this.commonAllergies.splice(index, 1);
        }
      }
      console.log(this.commonAllergies);
    }
  }

  nextStep() {

    // Set undefined this properties to save only needed information in database
    /*this.uncommonAllergies.forEach(function(item) {
      item.is_common = undefined;
      item.selected = undefined;
    });*/
    const myAllergies = JSON.stringify({
      common: this.commonAllergies,
      uncommon: this.uncommonAllergies
    });
    // JSON.stringify(this.commonAllergies.concat(this.uncommonAllergies));
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
