import { GooglePlacesService } from './../../services/google-places.service';
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlanService, SignupService  } from '../../services/index';
import { PlanModel, AddressModel } from '../../models/index';
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
    private fb: FormBuilder, private googleSrvPlaces: GooglePlacesService, private planSrv: PlanService,
    private signupSrv: SignupService) {
    this.planSelected = this.planSrv.getPlanSelected();
  }

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
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      country: [{value: this.countries[0].value, disabled: true}, Validators.required],
      address1: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: [''],
      lastFour: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      paymentPeriod: ['', [Validators.required]],
      currentStep: [this.step]
    });
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

  setPlanPaymentMethod(method: string) {
    this.paymentMethodSelected = method;
    this.signupForm.controls.paymentPeriod.setValue(method);
  }

  setMemberAddress() {
    const memberAddress = new AddressModel();
    memberAddress.address1 = this.signupForm.controls.address1.value;
    memberAddress.city = this.signupForm.controls.city.value;
    memberAddress.state = this.signupForm.controls.state.value;
    memberAddress.zipCode = this.signupForm.controls.zipCode.value;
    this.signupSrv.setMemberAddress(memberAddress);
    this.signupSrv.setMemberPhoneNumber(this.signupForm.controls.phoneNumber.value);
  }

  doSignup() {
    this.setMemberAddress();
    this.userAction('advance');
  }

}
