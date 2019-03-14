import { LookupModel, OnboardingRequestModel, MedicationModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OnboardingService, NotificationService, MedicationsService } from '../../../services/index';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.less']
})
export class MedicationsComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  public consumingMedication = false;

  public options: Array<any> = new Array<any>();
  public medications: MedicationModel = new MedicationModel();
  public myMedicationSupplements: Array<LookupModel> = new Array<LookupModel>();

  constructor(
    private onboardingSrv: OnboardingService,
    private notificationSrv: NotificationService,
    private medicationSrv: MedicationsService) {
    this.options.push({value: false, description: 'I am not currently taking other medications or supplements'},
    {value: true, description: 'I am taking other medications or supplements'} );
  }

  ngOnInit() {
    console.log('Current step: ', this.step);
    this.getMedicationSupplements();
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step = 3) : (this.step = 5);
    this.action.emit(step);
  }

  radioChanged() {
    console.log(this.consumingMedication);
  }

  compareWithFunc(a, b) {
    return a.display_value === b.display_value;
  }

  getMedicationSupplements() {

    this.medicationSrv.getMedicationSupplements().subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.medications = response.Result;
        console.log(this.medications);
        this.loadMedicationSupplements();
      }
    }, (error) => { console.log(error); });

  }

  loadMedicationSupplements() {
    const onboardingInfo = new OnboardingRequestModel();
    onboardingInfo.currentStep = this.step;
    this.onboardingSrv.getOnboardingInfo(onboardingInfo).subscribe((response) => {
      console.log(response);
      if (!response.HasError && response.Result) {
        this.myMedicationSupplements = JSON.parse(response.Result.medications_supplements);
        console.log(this.myMedicationSupplements);
      }
    }, error => { console.log(error); });

  }

  nextStep() {
    console.log(this.myMedicationSupplements);
    const myMedicationsSupp = JSON.stringify(this.myMedicationSupplements);
    console.log(myMedicationsSupp);
    const onboardingModel = new OnboardingRequestModel();
    onboardingModel.myMedicationSupplements = myMedicationsSupp;
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
