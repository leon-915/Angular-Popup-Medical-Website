import { CardValidator } from './../../../validators/card.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../../services/common.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SignupService } from 'src/app/services';
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

  constructor(private signupSrv: SignupService, private commonSrv: CommonService, private fb: FormBuilder) {
    this.getStates();
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
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      textMessagingPin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      currentStep: this.step,
      latitude: null,
      longitude: null,
      billingSameShipping: false,
      planName: null
    });


    this.loadInformation();

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step = 2) : (this.step = 4);
    this.action.emit(step);
  }

  loadInformation() {
    const member = new SignupRequestModel();
    member.currentStep = this.step;
    this.signupSrv.getSignupInformation(member).subscribe(response => {
      console.log(response);
      if (!response.HasError && response.Result) {
        this.signupForm.controls.address1.setValue(response.Result.address1);
        this.signupForm.controls.address2.setValue(response.Result.address2);
        this.signupForm.controls.city.setValue(response.Result.city);
        this.signupForm.controls.state.setValue(response.Result.state);
        this.signupForm.controls.zipCode.setValue(response.Result.zipcode);
        this.signupForm.controls.textMessagingPin.setValue(response.Result.text_messaging_pin);
        this.signupForm.controls.latitude.setValue(response.Result.latitude);
        this.signupForm.controls.longitude.setValue(response.Result.longitude);
        this.signupForm.controls.planName.setValue(response.Result.plan_name);
      }
    },error => { console.log(error); });
  }

  getStates() {
    this.commonSrv.getStates().subscribe((response) => { this.states = response; });
  }

  getCreditCardType(creditCardNumber) {
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

  billingCheckbox(event) {
    this.billingSameShipping.setValue(event.checked);
    console.log('Billing same as shipping is: ', this.billingSameShipping.value);
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

  get textMessagingPin() {
    return this.signupForm.controls.textMessagingPin;
  }

  get billingSameShipping() {
    return this.signupForm.controls.billingSameShipping;
  }

  get planName() {
    return this.signupForm.controls.planName;
  }

  onChange() {
    this.typeMask = this.getCreditCardType(this.creditCardNumber);
    this.currentMask = this.getMaskType(this.typeMask);
    console.log('Credit card number: ', this.creditCardNumber);
    console.log('Type mask: ', this.typeMask);
    console.log('Current mask: ', this.currentMask);
  }

  doSignup() {

    console.log(this.signupForm.value);
    this.signupSrv.signup(this.signupForm.value).subscribe(
      response => {
        console.log(response);
        if (!response.HasError) {
          if(this.billingSameShipping.value) {
            console.log('billing and shipping ==');
            this.step = 5;
            this.action.emit(this.step);
            
          } else {
            console.log('hay que enviarlo a la pantalla de shipping address');
            this.userAction('advance');
          }
        }
      },
      error => {
        console.log(error);
      }
    );

  }

}
