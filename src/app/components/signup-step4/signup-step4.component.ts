import { GooglePlacesService } from './../../services/google-places.service';
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private googleSrvPlaces: GooglePlacesService) { }

  setAddress = (address: string, city: string, state: string, zipcode: string, latitude: number, longitude: number) => {
    this.signupForm.get('zipcode').enable();
    this.signupForm.get('city').enable();
    this.signupForm.get('state').enable();
    this.signupForm.controls.zipcode.setValue(zipcode);
    this.signupForm.controls.city.setValue(city);
    this.signupForm.controls.state.setValue(state);
    this.signupForm.controls.address1.setValue(address);
    this.latitude = latitude;
    this.longitude = longitude;
    this.signupForm.get('zipcode').disable();
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
      zipcode: ['']
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

  doSignup() {
    this.userAction('advance');
  }

}
