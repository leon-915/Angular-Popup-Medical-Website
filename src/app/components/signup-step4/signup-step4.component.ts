import { CardValidator } from './../../validators/card.validator';
import { GooglePlacesService } from './../../services/google-places.service';
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlanService, SignupService  } from '../../services/index';
import { PlanModel, AddressModel, SignupRequestModel } from '../../models/index';
import { PhoneValidator } from 'src/app/validators';
@Component({
  selector: 'app-signup-step4',
  templateUrl: './signup-step4.component.html',
  styleUrls: ['./signup-step4.component.less']
})
export class SignupStep4Component implements OnInit, AfterViewInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('address') address: ElementRef;
  countries = [ { text: 'United States', value: 'US' } ];
  private latitude: number;
  private longitude: number;
  signupForm: FormGroup;
  planSelected: PlanModel;
  paymentMethodSelected: string;

  constructor(
    private fb: FormBuilder, private googleSrvPlaces: GooglePlacesService, private signupSrv: SignupService) {}

  setAddress = (address: string, city: string, state: string, zipCode: string, latitude: number, longitude: number) => {
    this.signupForm.controls.zipCode.setValue(zipCode);
    this.signupForm.controls.city.setValue(city);
    this.signupForm.controls.state.setValue(state);
    this.signupForm.controls.address1.setValue(address);
    this.latitude = latitude;
    this.longitude = longitude;
  }

  ngOnInit() {

    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      country: [{value: this.countries[0].value, disabled: true}, Validators.required],
      address1: ['', [Validators.required]],
      city: ['', [Validators.required]], // {value: '', disabled: true}
      state: ['' , [Validators.required]], // {value: '', disabled: true}
      zipCode: [''], // {value: '', disabled: true}
      lastFour: ['', [Validators.required, CardValidator.checkCardFormat]],
      phoneNumber: ['', [Validators.required]], // PhoneValidator.checkPhone
      paymentPeriod: ['', [Validators.required]],
      currentStep: [this.step],
      latitude: [],
      longitude: []
    });

    const member = new SignupRequestModel();
    member.currentStep = 4;
    this.signupSrv.getSignupInformation(member).subscribe((response) => {
      console.log(response);
      if (!response.HasError && response.Result) {
        this.signupForm.controls.firstName.setValue(response.Result.first_name);
        this.signupForm.controls.lastName.setValue(response.Result.last_name);
        this.signupForm.controls.address1.setValue(response.Result.address1);
        this.signupForm.controls.city.setValue(response.Result.city);
        this.signupForm.controls.state.setValue(response.Result.state);
        this.signupForm.controls.zipCode.setValue(response.Result.zipcode);
        /*this.signupForm.controls.lastFour.setValue(response.Result.lastfour);*/
        this.signupForm.controls.phoneNumber.setValue(response.Result.phone_number);
        this.signupForm.controls.latitude.setValue(response.Result.latitude);
        this.signupForm.controls.longitude.setValue(response.Result.longitude);
      }

      /**
       * Store the plan selected information
       */
      this.planSelected = new PlanModel();
      this.planSelected.plan_name = response.Result.plan_name;
      this.planSelected.price_quarter = response.Result.price_quarter;
      this.planSelected.price_month = response.Result.price_month;
      this.planSelected.price_ninety_days = response.Result.price_ninety_days;
      this.planSelected.price_year = response.Result.price_year;
      this.planSelected.price_quarter_active = response.Result.price_quarter_active;
      this.planSelected.price_month_active = response.Result.price_month_active;
      this.planSelected.price_ninety_days_active = response.Result.price_ninety_days_active;
      this.planSelected.price_year_active = response.Result.price_year_active;
      this.signupForm.controls.paymentPeriod.setValue(response.Result.payment_period);
      this.paymentMethodSelected = response.Result.payment_period;
      console.log(this.planSelected);


    }, (error) => { console.log(error); });
  }

  ngAfterViewInit() {

    this.googleSrvPlaces.loadMaps(this.address, this.setAddress).then(() => {
      console.log('Google maps loaded');
    }).catch((error) => {
      console.log('error loading map', error);
    });

  }

  userAction(action: string) {
    const step = action === 'back' ? this.step -= 1 : this.step += 1;
    this.action.emit(step);
  }

  goToStep(step: number) {
    this.action.emit(step);
  }

  setPlanPaymentMethod(method: string) {
    this.paymentMethodSelected = method;
    this.signupForm.controls.paymentPeriod.setValue(method);
  }

  /*setMemberAddressAndPhone() {
    const memberAddress = new AddressModel();
    memberAddress.address1 = this.signupForm.controls.address1.value;
    memberAddress.city = this.signupForm.controls.city.value;
    memberAddress.state = this.signupForm.controls.state.value;
    memberAddress.zipCode = this.signupForm.controls.zipCode.value;
  }*/

  doSignup() {

    this.signupForm.controls.latitude.setValue(this.latitude);
    this.signupForm.controls.longitude.setValue(this.longitude);
    console.log(this.signupForm.value);
    this.signupSrv.signup(this.signupForm.value).subscribe((response) => {
      if (!response.HasError) {
        this.userAction('advance');
      } else {
        console.log(response.Message);
      }
    }, (error) => { console.log(error); });
  }

}
