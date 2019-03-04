import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GooglePlacesService } from 'src/app/services';

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

  constructor(private fb: FormBuilder,  private googleSrvPlaces: GooglePlacesService) { }

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
      same_billing_address: [false],
      country: [{value: this.countries[0].value, disabled: true}, Validators.required],
      address1: ['', [Validators.required]],
      city: [ '' , [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['']
    });

    this.setShippingInfoValidators();

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
    /*if(action === 'back') {
      this.step -= 1;
    } else {
      this.step += 1;
    }*/
    this.action.emit(step);
  }

  setShippingInfoValidators() {

    const address1 = this.signupForm.get('address1');
    const city = this.signupForm.get('city');
    const state = this.signupForm.get('state');

    this.signupForm.get('same_billing_address').valueChanges.subscribe((status) => {
      console.log(status);
      if (status) {
        address1.setValidators(null);
        city.setValidators(null);
        state.setValidators(null);
        /*address1.setValue('');
        city.setValue('');
        state.setValue('');*/
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
    console.log('do login...');
    this.userAction('advance');
  }

}
