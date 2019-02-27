import { GooglePlacesService } from './../../services/google-places.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup;
  currentStep = 1;
  location: any;
  latitude: number;
  longitude: number;
  countries = [ { text: 'United States', value: 'US' } ];
  @ViewChild('searchElement') public searchElement: ElementRef;

  constructor(private fb: FormBuilder, private googlePlaceService: GooglePlacesService) {}

  setAddress = (
    address: string,
    city: string,
    state: string,
    zipcode: string,
    latitude: number,
    longitude: number
  ) => {
    this.signupForm.get('zipcode').enable();
    this.signupForm.get('city').enable();
    this.signupForm.get('state').enable();
    this.signupForm.controls.zipcode.setValue(zipcode);
    this.signupForm.controls.city.setValue(city);
    this.signupForm.controls.state.setValue(state);
    this.signupForm.controls.address.setValue(address);
    this.latitude = latitude;
    this.longitude = longitude;
    this.location = {
      address1: this.signupForm.value.address,
      city: this.signupForm.value.city,
      state: this.signupForm.value.state,
      zipcode: this.signupForm.value.zipcode,
      latitude: this.latitude,
      longitude: this.longitude
    };
    this.signupForm.get('zipcode').disable();
    this.signupForm.get('city').disable();
    this.signupForm.get('state').disable();
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      retypepassword: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      state: [null, Validators.required],
      country: [this.countries[0].value, Validators.required]
    });
  }

  ngAfterViewInit() {
    this.googlePlaceService.loadMaps(this.searchElement, this.setAddress).then(() => {
      console.log('Google maps loaded');
    }).catch((error) => {
      console.log('error loading map', error);
    });
  }

  doSignup(step: number) {
    console.log('the signup process is in ', step);
    this.currentStep += 1;
  }

}
