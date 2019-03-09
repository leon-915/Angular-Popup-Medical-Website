import { PharmacyModel } from './../../../models/index';
import { AddressModel } from './../../../models/address.model';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { GooglePlacesService } from '../../../services/index';

@Component({
  selector: 'app-primary-pharmacy',
  templateUrl: './primary-pharmacy.component.html',
  styleUrls: ['./primary-pharmacy.component.less']
})
export class PrimaryPharmacyComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('address') address: ElementRef;
  public shippingAddress: AddressModel = new AddressModel();
  public pharmacies:Array<PharmacyModel> = new Array<PharmacyModel>();

  constructor(private googleSrvPlaces: GooglePlacesService) {}

  ngOnInit() {
    // initialize map (info for California)
    this.shippingAddress.latitude = 36.778259;
    this.shippingAddress.longitude = -119.417931;
  }

  ngAfterViewInit() {

    this.googleSrvPlaces.loadMaps(this.address, this.setAddress).then(() => {
      console.log('Google maps loaded');
    }).catch((error) => {
      console.log('error loading map', error);
    });

  }

  getShippingAddress() {
    // consume lambda for the shipping address
    // set the response to shippingAddress
  }

  setAddress = (address: string, city: string, state: string, zipCode: string, latitude: number, longitude: number) => {
    console.log(address);
    this.shippingAddress.address1 = address;
    this.shippingAddress.zipCode = city;
    this.shippingAddress.state = state;
    this.shippingAddress.zipCode = zipCode;
    this.shippingAddress.latitude = latitude;
    this.shippingAddress.longitude = longitude;
    console.log(this.shippingAddress);
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  radioChanged(event) {
    console.log(event);
  }

  /*private getUserLocation() {

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }

  }*/

  nextStep() {
    this.step = 6;
    this.action.emit(this.step);
  }



}
