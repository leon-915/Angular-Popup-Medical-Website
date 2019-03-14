import { PharmacyModel } from './../../../models/index';
import { AddressModel, OnboardingRequestModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GooglePlacesService, PharmaciesService, OnboardingService, NotificationService } from '../../../services/index';

@Component({
  selector: 'app-primary-pharmacy',
  templateUrl: './primary-pharmacy.component.html',
  styleUrls: ['./primary-pharmacy.component.less']
})
export class PrimaryPharmacyComponent implements OnInit, AfterViewInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('address') address: ElementRef;
  public shippingAddress: AddressModel = new AddressModel();
  public pharmacies: Array<PharmacyModel> = new Array<PharmacyModel>();

  public limitItems = 3;
  public primaryPharmacyAddress = null;

  /**
   * Load the shipping address or the current geolocation of the user?
   */
  public default = 'Default';

  constructor(
    private googleSrvPlaces: GooglePlacesService,
    private pharmacySrv: PharmaciesService,
    private onboardingSrv: OnboardingService,
    private notificationSrv: NotificationService) {}

  ngOnInit() {

    this.shippingAddress.latitude = 36.778259;
    this.shippingAddress.longitude = -119.417931;
    this.loadNearestPharmacies(this.shippingAddress.latitude, this.shippingAddress.longitude);

  }

  ngAfterViewInit() {

    this.googleSrvPlaces.loadMaps(this.address, this.setAddress).then(() => {
      console.log('Google maps loaded');
    }).catch((error) => {
      console.log('error loading map', error);
    });

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
    this.primaryPharmacyAddress = null;
    this.loadNearestPharmacies(this.shippingAddress.latitude, this.shippingAddress.longitude);
  }

  loadNearestPharmacies(lat: number, long: number) {

    const pharmacyModel = new PharmacyModel();
    pharmacyModel.latitude = lat;
    pharmacyModel.longitude = long;
    this.pharmacySrv.getNearestPharmacies(pharmacyModel).subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.pharmacies = response.Result;
      }
    }, error => { console.log(error); });

  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step = 4) : (this.step = 6);
    this.action.emit(step);
  }

  radioChanged(event) { this.primaryPharmacyAddress = event; }

  /*private getUserLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }*/

  /*loadPrimaryPharmacy() {
    const onboardingInfo = new OnboardingRequestModel();
    onboardingInfo.currentStep = this.step;
    this.onboardingSrv.getOnboardingInfo(onboardingInfo).subscribe((response) => {
      if (!response.HasError && response.Result) {
        console.log(response);
        //this.pharmacies.push(response.Result);
        this.shippingAddress.latitude = parseFloat(response.Result.latitude);
        this.shippingAddress.longitude = parseFloat(response.Result.longitude);
        console.log(this.shippingAddress);
        this.loadNearestPharmacies(this.shippingAddress.latitude, this.shippingAddress.longitude);
        this.primaryPharmacyAddress = response.Result;
      } else {
        // initialize map (info for California)
        console.log('no tengo una farmacia seleccionada');
        this.shippingAddress.latitude = 36.778259;
        this.shippingAddress.longitude = -119.417931;
        this.loadNearestPharmacies(this.shippingAddress.latitude, this.shippingAddress.longitude);
      }
    }, error => { console.log(error); });
  }*/

  nextStep() {
    console.log(this.primaryPharmacyAddress);
    const onboardingModel = new OnboardingRequestModel();
    onboardingModel.pharmacyId = this.primaryPharmacyAddress.pharmacy_id;
    onboardingModel.currentStep = this.step;
    this.onboardingSrv.onboarding(onboardingModel).subscribe(response => {
      console.log(response);
      if (!response.HasError) {
        this.userAction('advance');
      } else {
        this.notificationSrv.showError(response.Message);
      }
    });
  }



}
