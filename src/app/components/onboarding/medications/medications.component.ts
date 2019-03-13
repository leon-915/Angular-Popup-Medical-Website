import { LookupModel, OnboardingRequestModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OnboardingService, NotificationService } from '../../../services/index';

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
  public selectedConditions: LookupModel;

  constructor(private onboardingSrv: OnboardingService, private notificationSrv: NotificationService) {
    this.options.push({value: true, description: 'I am not currently taking other medications or supplements'},
    {value: false, description: 'I am taking other medications or supplements'} );
  }

  ngOnInit() {
    console.log('Current step: ', this.step);
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step = 3) : (this.step = 5);
    this.action.emit(step);
  }

  radioChanged() {
    console.log(this.consumingMedication);
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
