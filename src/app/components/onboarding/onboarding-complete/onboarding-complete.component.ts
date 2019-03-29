import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  OnboardingService,
  NotificationService
} from '../../../services/index';
import { OnboardingRequestModel } from '../../../models/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-complete',
  templateUrl: './onboarding-complete.component.html',
  styleUrls: ['./onboarding-complete.component.less']
})
export class OnboardingCompleteComponent implements OnInit {
  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private onboardingSrv: OnboardingService,
    private notificationSrv: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {}

  userAction(action: string) {
    const step = action === 'back' ? (this.step = 5) : (this.step = 7);
    this.action.emit(step);
  }

  goToDashboard(url: string) {
    const onboardingModel = new OnboardingRequestModel();
    onboardingModel.currentStep = this.step;
    this.onboardingSrv.onboarding(onboardingModel).subscribe(
      response => {
        console.log(response);
        if (!response.HasError) {
          console.log('my account');
          this.router.navigateByUrl(url);
        } else {
          this.notificationSrv.showError(response.Message);
        }
      },
      error => { console.log(error); }
    );
  }
}
