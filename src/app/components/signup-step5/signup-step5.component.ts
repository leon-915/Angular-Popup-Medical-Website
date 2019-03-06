import { SignupRequestModel } from '../../models/index';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GooglePlacesService, SignupService } from '../../services/index';

@Component({
  selector: 'app-signup-step5',
  templateUrl: './signup-step5.component.html',
  styleUrls: ['./signup-step5.component.less']
})
export class SignupStep5Component implements OnInit, AfterViewInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('address') address: ElementRef;
  countries = [ { text: 'United States', value: 'US' } ];
  signupForm: FormGroup;
  memberInfo: SignupRequestModel;

  constructor(private fb: FormBuilder,  private googleSrvPlaces: GooglePlacesService, private signupSrv: SignupService) {
    const member = new SignupRequestModel();
    member.currentStep = 5;
    this.signupSrv.getSignupInformation(member).subscribe((response) => {
      if (!response.HasError) {
        // const member = new SignupRequestModel();
        member.address1 = response.Result.address1;
        member.city = response.Result.city;
        member.firstName = response.Result.first_name;
        member.lastName = response.Result.last_name;
        member.phoneNumber = response.Result.phone_number;
        member.state = response.Result.state;
        member.zipCode = response.Result.zipcode;
        member.latitude = response.Result.latitude;
        member.longitude = response.Result.longitude;
        this.memberInfo = member;
      }
    }, (error) => { console.log(error); });

  }

  setAddress = (address: string, city: string, state: string, zipCode: string, latitude: number, longitude: number) => {
    this.signupForm.controls.zipCode.setValue(zipCode);
    this.signupForm.controls.city.setValue(city);
    this.signupForm.controls.state.setValue(state);
    this.signupForm.controls.address1.setValue(address);
    this.memberInfo.latitude = latitude;
    this.memberInfo.longitude = longitude;
  }

  ngOnInit() {

    this.signupForm = this.fb.group({
      sameBillingAddress: [false],
      samePhoneNumber: [false],
      country: [{value: this.countries[0].value, disabled: true}, Validators.required],
      address1: ['', [Validators.required]],
      city: [ '' , [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: [''],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      textMessagingPin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      currentStep: [this.step],
      latitude: [],
      longitude: [],
      address2: ['shipping_address']
    });

    this.setShippingInfoValidators();
    this.setMobilePhoneNumber();

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

  setShippingInfoValidators() {

    const address1 = this.signupForm.get('address1');
    const city = this.signupForm.get('city');
    const state = this.signupForm.get('state');

    this.signupForm.get('sameBillingAddress').valueChanges.subscribe((status) => {
      if (status) {
        address1.setValidators(null);
        city.setValidators(null);
        state.setValidators(null);
        this.signupForm.controls.address1.setValue(this.memberInfo.address1);
        this.signupForm.controls.city.setValue(this.memberInfo.city);
        this.signupForm.controls.state.setValue(this.memberInfo.state);
        this.signupForm.controls.zipCode.setValue(this.memberInfo.zipCode);

      } else {
        address1.setValidators([Validators.required]);
        city.setValidators([Validators.required]);
        state.setValidators([Validators.required]);
        this.signupForm.controls.address1.setValue('');
        this.signupForm.controls.city.setValue('');
        this.signupForm.controls.state.setValue('');
        this.signupForm.controls.zipCode.setValue('');
      }

      address1.updateValueAndValidity();
      city.updateValueAndValidity();
      state.updateValueAndValidity();

    });
  }

  setMobilePhoneNumber() {
    const mobilePhoneNumber = this.signupForm.get('phoneNumber');
    this.signupForm.get('samePhoneNumber').valueChanges.subscribe((status) => {
      if (status) {
        mobilePhoneNumber.setValidators(null);
        this.signupForm.controls.phoneNumber.setValue(this.memberInfo.phoneNumber);
      } else {
        mobilePhoneNumber.setValidators([Validators.required]);
        this.signupForm.controls.phoneNumber.setValue('');
      }
      mobilePhoneNumber.updateValueAndValidity();
    });
  }

  doSignup() {
    this.signupForm.controls.latitude.setValue(this.memberInfo.latitude);
    this.signupForm.controls.longitude.setValue(this.memberInfo.longitude);
    this.signupSrv.signup(this.signupForm.value).subscribe((response) => {
      if (!response.HasError) {
        this.userAction('advance');
      }
    }, (error) => { console.log(error); });
  }

}
