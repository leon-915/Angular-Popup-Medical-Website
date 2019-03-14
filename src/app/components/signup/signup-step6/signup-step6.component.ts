import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService, NotificationService } from 'src/app/services';
import { SignupRequestModel, OrderModel } from 'src/app/models';

@Component({
  selector: 'app-signup-step6',
  templateUrl: './signup-step6.component.html',
  styleUrls: ['./signup-step6.component.less']
})
export class SignupStep6Component implements OnInit {
  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  orderInfo: OrderModel;

  constructor(
    private signupSrv: SignupService,
    private router: Router,
    private notificationSrv: NotificationService
  ) {
    const member = new SignupRequestModel();
    member.currentStep = 6;
    this.signupSrv.getSignupInformation(member).subscribe(
      response => {
        console.log(response);
        if (!response.HasError) {
          this.orderInfo = new OrderModel();
          this.orderInfo.address1 = response.Result.address1;
          this.orderInfo.city = response.Result.city;
          this.orderInfo.firstName = response.Result.first_name;
          this.orderInfo.lastName = response.Result.last_name;
          this.orderInfo.orderPrice = response.Result.order_price;
          this.orderInfo.paymentPeriod = response.Result.payment_period;
          this.orderInfo.planName = response.Result.plan_name;
          this.orderInfo.state = response.Result.state;
          this.orderInfo.zipcode = response.Result.zipcode;
          this.orderInfo.lastFour = response.Result.lastfour;
          this.orderInfo.email = response.Result.email;
          console.log(this.orderInfo);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {}

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  goToOnboarding() {
    const memberModel = new SignupRequestModel();
    memberModel.currentStep = this.step;
    this.signupSrv.signup(memberModel).subscribe(
      response => {
        console.log(response);
        if (!response.HasError) {
          this.router.navigateByUrl('/onboarding');
        } else {
          this.notificationSrv.showError(response.Message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
