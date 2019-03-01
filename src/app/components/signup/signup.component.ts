import { PasswordValidator } from './../../validators/password.validator';
import { GooglePlacesService } from './../../services/google-places.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit, AfterViewInit {

  // Add documentation comments for each form
  signupStep1Form: FormGroup;
  signupStep2Form: FormGroup;
  signupStep4Form: FormGroup;
  signupStep5Form: FormGroup;
  // signupForm: FormGroup;


  currentStep = 5;
  // location: any;
  latitude: number;
  longitude: number;
  latitudeShipping: number;
  longitudeShipping: number;
  countries = [ { text: 'United States', value: 'US' } ];
  @ViewChild('searchElement') searchElement: ElementRef;

  @ViewChild('shippingAddress') shippingAddress: ElementRef;

  constructor(private fb: FormBuilder, private googlePlaceService: GooglePlacesService) {}

  // modify this. create separate components

  setAddress = (
    address: string,
    city: string,
    state: string,
    zipcode: string,
    latitude: number,
    longitude: number
  ) => {
    if (this.currentStep === 4) {
      this.signupStep4Form.get('zipcode').enable();
      this.signupStep4Form.get('city').enable();
      this.signupStep4Form.get('state').enable();
      this.signupStep4Form.controls.zipcode.setValue(zipcode);
      this.signupStep4Form.controls.city.setValue(city);
      this.signupStep4Form.controls.state.setValue(state);
      this.signupStep4Form.controls.address1.setValue(address);
      this.latitude = latitude;
      this.longitude = longitude;
      this.signupStep4Form.get('zipcode').disable();
      this.signupStep4Form.get('city').disable();
      this.signupStep4Form.get('state').disable();
    } else {
      this.signupStep5Form.get('shipping_zipcode').enable();
      this.signupStep5Form.get('shipping_city').enable();
      this.signupStep5Form.get('shipping_state').enable();
      this.signupStep5Form.controls.shipping_zipcode.setValue(zipcode);
      this.signupStep5Form.controls.shipping_city.setValue(city);
      this.signupStep5Form.controls.shipping_state.setValue(state);
      this.signupStep5Form.controls.shipping_address1.setValue(address);
      this.latitudeShipping = latitude;
      this.longitudeShipping = longitude;
      this.signupStep5Form.get('shipping_zipcode').disable();
      this.signupStep5Form.get('shipping_city').disable();
      this.signupStep5Form.get('shipping_state').disable();
    }
    /*this.location = {
      address1: this.signupStep4Form.value.address,
      city: this.signupStep4Form.value.city,
      state: this.signupStep4Form.value.state,
      zipcode: this.signupStep4Form.value.zipcode,
      latitude: this.latitude,
      longitude: this.longitude
    };*/
  }

  ngOnInit() {

    this.signupStep1Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, PasswordValidator.checkPasswordStrength]],
      confirm: ['', [Validators.required]]

    }, PasswordValidator.checkPasswordEquality);

    this.signupStep2Form = this.fb.group({
      accept_terms: ['', [Validators.required]],
      accept_privacy_policy: ['', [Validators.required]],
      accept_data_sharing: ['', [Validators.required]],
      opt_in_email: ['', [Validators.required]],
      opt_in_sms: ['', [Validators.required]]
    });

    this.signupStep4Form = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      country: [{value: this.countries[0].value, disabled: true}, Validators.required],
      address1: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['']
    });

    this.signupStep5Form = this.fb.group({
      same_billing_address: [false],
      country: [{value: this.countries[0].value, disabled: true}, Validators.required],
      shipping_address1: ['', [Validators.required]],
      shipping_city: [ '' , [Validators.required]],
      shipping_state: ['', [Validators.required]],
      shipping_zipcode: ['']
    });

    this.setShippingInfoValidators();

  }

  ngAfterViewInit() {
    this.googlePlaceService.loadMaps(this.searchElement, this.setAddress);
    this.googlePlaceService.loadMaps(this.shippingAddress, this.setAddress);
    /*.then(() => {
      console.log('Google maps loaded');
    }).catch((error) => {
      console.log('error loading map', error);
    });*/
  }

  setShippingInfoValidators() {

    const address1 = this.signupStep5Form.get('shipping_address1');
    const city = this.signupStep5Form.get('shipping_city');
    const state = this.signupStep5Form.get('shipping_state');

    this.signupStep5Form.get('same_billing_address').valueChanges.subscribe((status) => {
      if (status) {
        address1.setValidators(null);
        city.setValidators(null);
        state.setValidators(null);
      } else {
        address1.setValidators([Validators.required]);
        city.setValidators([Validators.required]);
        state.setValidators([Validators.required]);
      }

      address1.updateValueAndValidity();
      city.updateValueAndValidity();
      state.updateValueAndValidity();

    });
  }
  doSignup() {
    // all the logic for the signup steps process
    this.currentStep += 1;
  }
}
