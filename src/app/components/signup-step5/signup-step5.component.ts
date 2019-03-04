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
  private latitude: number;
  private longitude: number;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,  private googleSrvPlaces: GooglePlacesService, private signupSrv: SignupService) { }

  setAddress = (address: string, city: string, state: string, zipCode: string, latitude: number, longitude: number) => {
    this.signupForm.get('zipCode').enable();
    this.signupForm.get('city').enable();
    this.signupForm.get('state').enable();
    this.signupForm.controls.zipCode.setValue(zipCode);
    this.signupForm.controls.city.setValue(city);
    this.signupForm.controls.state.setValue(state);
    this.signupForm.controls.address1.setValue(address);
    this.latitude = latitude;
    this.longitude = longitude;
    this.signupForm.get('zipCode').disable();
    this.signupForm.get('city').disable();
    this.signupForm.get('state').disable();
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
      currentStep: [this.step]
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
        const memberAddress = this.signupSrv.getMemberAddress();
        console.log(memberAddress);
        this.signupForm.controls.address1.setValue(memberAddress.address1);
        this.signupForm.controls.city.setValue(memberAddress.city);
        this.signupForm.controls.state.setValue(memberAddress.state);
        this.signupForm.controls.zipCode.setValue(memberAddress.zipCode);
        this.signupForm.get('address1').disable();
        this.signupForm.get('city').disable();
        this.signupForm.get('state').disable();
        this.signupForm.get('zipCode').disable();

      } else {
        address1.setValidators([Validators.required]);
        city.setValidators([Validators.required]);
        state.setValidators([Validators.required]);
        this.signupForm.controls.address1.setValue('');
        this.signupForm.controls.city.setValue('');
        this.signupForm.controls.state.setValue('');
        this.signupForm.controls.zipCode.setValue('');
        this.signupForm.get('address1').enable();
        this.signupForm.get('city').enable();
        this.signupForm.get('state').enable();
        this.signupForm.get('zipCode').enable();
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
        const memberPhoneNumber = this.signupSrv.getMemberPhoneNumber();
        this.signupForm.controls.phoneNumber.setValue(memberPhoneNumber);
        this.signupForm.get('phoneNumber').disable();

      } else {
        mobilePhoneNumber.setValidators([Validators.required]);
        this.signupForm.controls.phoneNumber.setValue('');
        this.signupForm.get('phoneNumber').enable();
      }

      mobilePhoneNumber.updateValueAndValidity();

    });

  }


  doSignup() {
    this.userAction('advance');
  }

}
