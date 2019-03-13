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
  public consumingMedication = true;

  public options: Array<any> = new Array<any>();
  public medications: MedicationModel = new MedicationModel();
  public commonMedications: Array<LookupModel> = new Array<LookupModel>();
  public uncommonMedications: Array<LookupModel> = new Array<LookupModel>();
  public showUncommon = false;

  constructor(
    private onboardingSrv: OnboardingService,
    private notificationSrv: NotificationService,
    private medicationSrv: MedicationsService) {
    this.options.push({value: true, description: 'I am not currently taking other medications or supplements'},
    {value: false, description: 'I am taking other medications or supplements'} );
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

  getMedicationSupplements() {

    this.medicationSrv.getMedicationSupplements().subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.medications = response.Result;
        console.log(this.medications);
      }
    }, (error) => { console.log(error); });

  }

  nextStep() {
    const onboardingModel = new OnboardingRequestModel();
    onboardingModel.currentStep = this.step;
    this.onboardingSrv.onboarding(onboardingModel).subscribe(response => {
      console.log(response);
      if (!response.HasError) {
        this.userAction('advance');
      } else {
        this.notificationSrv.showError(response.Message);
      }
    });
  }


}
