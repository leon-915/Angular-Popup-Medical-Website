import { CardValidator } from './../../../validators/card.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../../services/common.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SignupService, PlanService, DateService, NotificationService } from 'src/app/services';
import { SignupRequestModel } from '../../../models/index';

@Component({
  selector: 'app-billing-information',
  templateUrl: './billing-information.component.html',
  styleUrls: ['./billing-information.component.less']
})
export class BillingInformationComponent implements OnInit {
  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  public states: Array<any> = new Array<any>();

  public signupForm: FormGroup;
  public currentMask = '';
  public typeMask = '';
  public years = [];

  constructor(
    private signupSrv: SignupService,
    private commonSrv: CommonService,
    private fb: FormBuilder,
    private planSrv: PlanService,
    private dateSrv: DateService,
    private notificationSrv: NotificationService
  ) {
    this.getStates();
    this.getDateInfo();
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      creditCardNumber: ['', [Validators.required, CardValidator.checkCardFormat]],
      expirationMonth: [null, [Validators.required]],
      expirationYear: [null, [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      nameOnCard: ['', [Validators.required]],
      promoCode: [''],
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      // textMessagingPin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      currentStep: this.step,
      latitude: 0,
      longitude: 0,
      planName: null,
      paymentMethod: [false, [Validators.required]], // true = ACH & false = credit card
      routingNumber: [''],
      bankAccountNumber: [''],
    });

    this.loadInformation();
    this.onChangePaymentMethod();
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step = 2) : (this.step = 4);
    this.action.emit(step);
  }

  onChangePaymentMethod() {
    this.paymentMethod.valueChanges.subscribe((status) => {
      console.log(status);
      if (status) {
        this.creditCardNumber.setValidators(null);
        this.expirationMonth.setValidators(null);
        this.expirationYear.setValidators(null);
        this.cvv.setValidators(null);
        this.nameOnCard.setValidators(null);
        this.routingNumber.setValidators([Validators.required]);
        this.bankAccountNumber.setValidators([Validators.required]);
      } else {
        this.creditCardNumber.setValidators([Validators.required, CardValidator.checkCardFormat]);
        this.expirationMonth.setValidators([Validators.required]);
        this.expirationYear.setValidators([Validators.required]);
        this.cvv.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
        this.nameOnCard.setValidators([Validators.required]);
        this.routingNumber.setValidators(null);
        this.bankAccountNumber.setValidators(null);
      }

      this.creditCardNumber.updateValueAndValidity();
      this.expirationMonth.updateValueAndValidity();
      this.expirationYear.updateValueAndValidity();
      this.cvv.updateValueAndValidity();
      this.nameOnCard.updateValueAndValidity();
      this.routingNumber.updateValueAndValidity();
      this.bankAccountNumber.updateValueAndValidity();
    });
  }

  getDateInfo() {
    this.dateSrv.getDateInfo().subscribe(
      response => {
        if (!response.HasError) {
          this.years = response.Result.years;
          const cardYears = [];
          for (let i = 0; i < 10; i++) {
            cardYears.unshift(parseInt(this.years[0], 10) + i);
          }
          this.years = cardYears;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  loadInformation() {
    const member = new SignupRequestModel();
    member.currentStep = this.step;
    this.signupSrv.getSignupInformation(member).subscribe(
      response => {
        if (!response.HasError && response.Result) {
          this.signupForm.controls.address1.setValue(response.Result.address1);
          this.signupForm.controls.address2.setValue(response.Result.address2);
          this.signupForm.controls.city.setValue(response.Result.city);
          this.signupForm.controls.state.setValue(response.Result.state);
          this.signupForm.controls.zipCode.setValue(response.Result.zipcode);
          // this.signupForm.controls.textMessagingPin.setValue(response.Result.text_messaging_pin);
          this.signupForm.controls.latitude.setValue(response.Result.latitude);
          this.signupForm.controls.longitude.setValue(response.Result.longitude);
          this.signupForm.controls.planName.setValue(response.Result.plan_name);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getStates() {
    this.signupSrv.getCommonFormData().subscribe(
      response => {
        console.log(response);
        if (!response.HasError) {
          this.states = response.Result.stateList;
          console.log(this.states);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getCreditCardType(creditCardNumber) {
    console.log(creditCardNumber);
    let result = 'unknown';

    if (/^5[1-5]/.test(creditCardNumber)) {
      result = 'mastercard';
    } else if (/^4/.test(creditCardNumber)) {
      result = 'visa';
    } else if (/^3[47]/.test(creditCardNumber)) {
      result = 'amex';
    } else if (/3(?:0[0-5]|[68][0-9])[0-9]{11}/.test(creditCardNumber)) {
      result = 'diners';
    } else if (/6(?:011|5[0-9]{2})[0-9]{12}/.test(creditCardNumber)) {
      result = 'discover';
    }
    return result;
  }

  public getMaskType(cardType) {
    const masks = {
      mastercard: '0000 0000 0000 0000',
      visa: '0000-0000-0000-0000',
      amex: '0000 000000 00000',
      diners: '0000 0000 0000 00',
      discover: '0000 0000 0000 0000',
      unknown: '0000 0000 0000 0000'
    };
    return masks[cardType];
  }

  // Getters

  get creditCardNumber() {
    return this.signupForm.controls.creditCardNumber;
  }

  get expirationMonth() {
    return this.signupForm.controls.expirationMonth;
  }

  get expirationYear() {
    return this.signupForm.controls.expirationYear;
  }

  get cvv() {
    return this.signupForm.controls.cvv;
  }

  get nameOnCard() {
    return this.signupForm.controls.nameOnCard;
  }

  get promoCode() {
    return this.signupForm.controls.promoCode;
  }

  get address1() {
    return this.signupForm.controls.address1;
  }

  get address2() {
    return this.signupForm.controls.address2;
  }

  get city() {
    return this.signupForm.controls.city;
  }

  get state() {
    return this.signupForm.controls.state;
  }

  get zipCode() {
    return this.signupForm.controls.zipCode;
  }

  /*get textMessagingPin() {
    return this.signupForm.controls.textMessagingPin;
  }*/

  get planName() {
    return this.signupForm.controls.planName;
  }

  get paymentMethod() {
    return this.signupForm.controls.paymentMethod;
  }

  get routingNumber() {
    return this.signupForm.controls.routingNumber;
  }

  get bankAccountNumber() {
    return this.signupForm.controls.bankAccountNumber;
  }

  onChange() {
    this.typeMask = this.getCreditCardType(this.creditCardNumber.value);
    this.currentMask = this.getMaskType(this.typeMask);
    /*console.log('Credit card number: ', this.creditCardNumber.value);
    console.log('Type mask: ', this.typeMask);
    console.log('Current mask: ', this.currentMask);*/

    if (this.typeMask === 'amex') {
      this.cvv.setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
    } else {
      this.cvv.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
    }
    this.cvv.updateValueAndValidity();
  }

  doSignup() {
    console.log(this.signupForm.getRawValue());
    this.signupSrv.signup(this.signupForm.getRawValue()).subscribe(
      response => {
        console.log(response);
        if (!response.HasError) {
          console.log('go to order overall information component');
          this.userAction('advance');
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
