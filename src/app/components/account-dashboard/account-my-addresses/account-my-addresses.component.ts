import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services';
import { AccountService, NotificationService, GooglePlacesService } from './../../../services/index';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-my-addresses',
  templateUrl: './account-my-addresses.component.html',
  styleUrls: ['./account-my-addresses.component.less']
})
export class AccountMyAddressesComponent implements OnInit {

  public shippingAddresses = [];
  public states = [];
  public addressForm: FormGroup;
  public updateAddressForm: FormGroup;
  public selectedAddress;

  public modalEdit;
  public modalDelete;

  @ViewChild('address') address: ElementRef;
  @ViewChild('addressUpdate') addressUpdate: ElementRef;

  constructor(
    private accountSrv: AccountService,
    private notificationSrv: NotificationService,
    private fb: FormBuilder,
    private signupSrv: SignupService,
    private googlePlaceSrv: GooglePlacesService,
    private modalSrv: NgbModal
  ) { }

  ngOnInit() {

    this.addressForm = this.fb.group({
      address1: ['', [Validators.required]],
      address2: '',
      city: ['', [Validators.required]],
      state: [null, [Validators.required]],
      stateName: [''],
      stateAbbreviation: [''],
      zipCode: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });

    this.updateAddressForm = this.fb.group({
      address1Update: ['', [Validators.required]],
      address2Update: '',
      cityUpdate: ['', [Validators.required]],
      stateUpdate: [null, [Validators.required]],
      stateNameUpdate: [''],
      stateAbbreviationUpdate: [''],
      zipCodeUpdate: ['', [Validators.required]],
      countryUpdate: ['', [Validators.required]]
    });

    this.getShippingAddresses();
    this.getStates();
  }

  // tslint:disable-next-line
  ngAfterViewInit() {
    this.googlePlaceSrv.loadMaps(this.address, this.setAddress).then(() => {
      console.log('Google maps loaded');
    }).catch(error => {
      console.log('error loading map', error);
    });
  }

  public getShippingAddresses() {
    this.accountSrv.getUserData().subscribe(response => {
      console.log(response);
      if (!response.HasError) {
        this.shippingAddresses = [];
        this.shippingAddresses = response.Result.userShippings;
        console.log(this.shippingAddresses);
      } else {
        this.notificationSrv.showError(response.Message);
      }
    });
  }

  getStates() {
    this.signupSrv.getCommonFormData().subscribe(
      response => {
        console.log(response);
        if (!response.HasError) {
          this.states = response.Result.stateList;
          console.log(this.states);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  setAddress = (city: string, state: string, zipCode: string, latitude: number, longitude: number, country: string, address: string) => {
    this.address1.setValue(address);
    this.city.setValue(city);
    this.zipCode.setValue(zipCode);
    this.country.setValue(country);

    this.states.forEach(item => {
      console.log(item);
      if (item.abbreviation === state) {
        console.log('state encontrado');
        this.state.setValue(item.id);
        this.stateName.setValue(state);
        this.stateAbbreviation.setValue(item.abbreviation);
      }
    });
  }

  setAddressModal = (
    city: string,
    state: string,
    zipCode: string,
    latitude: number,
    longitude: number,
    country: string,
    address: string
  ) => {
    /*this.address1.setValue(address);
    this.city.setValue(city);
    this.zipCode.setValue(zipCode);
    this.country.setValue(country);

    this.states.forEach(item => {
      console.log(item);
      if (item.abbreviation === state) {
        console.log('state encontrado');
        this.state.setValue(item.id);
        this.stateName.setValue(state);
        this.stateAbbreviation.setValue(item.abbreviation);
      }
    });*/
    console.log(city, state);
  }

  openModalDeleteAddress(content) {

    this.modalEdit.close();
    this.modalDelete = this.modalSrv.open(content);

  }

  openModal(content, address) {

    console.log(address);
    this.selectedAddress = address;

    this.address1Update.setValue(address.address1);
    this.address2Update.setValue(address.address2);
    this.cityUpdate.setValue(address.city);
    this.zipCodeUpdate.setValue(address.zipcode);
    this.countryUpdate.setValue(address.country);
    this.stateUpdate.setValue(address.state_id);
    this.stateNameUpdate.setValue(address.state_name);
    this.stateAbbreviationUpdate.setValue(address.state_abbreviation);

    console.log(this.updateAddressForm.value);

    this.modalEdit = this.modalSrv.open(content);
    console.log(this.addressUpdate);
    setTimeout(() => {
      console.log('test');
      console.log(this.addressUpdate);
      this.googlePlaceSrv
        .loadMaps(this.addressUpdate, this.setAddressModal)
        .then(() => {
          console.log('Google maps loaded');
        })
        .catch(error => {
          console.log('error loading map', error);
        });
    }, 3000);

  }

  public addShippingAddress() {

    this.accountSrv.addUserAddress(this.addressForm.getRawValue()).subscribe(response => {
      console.log(response);
      if (!response.HasError) {
        this.getShippingAddresses();
        this.notificationSrv.showSuccess(response.Message);
      } else {
        this.notificationSrv.showError(response.Message);
      }
    });

  }

  public editShippingAddress() {

  }

  public removeShippingAddress() {

    console.log(this.selectedAddress);

    const request = {
      addressId: this.selectedAddress.member_address_id
    };

    console.log(request);

    this.accountSrv.deleteAddress(request).subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.notificationSrv.showSuccess(response.Message);
        this.modalDelete.close();
        this.getShippingAddresses();
      } else {
        this.notificationSrv.showError(response.Message);
      }
    });

  }

  public setDefaultShippingAddress(shippingAddressId: number) {

    console.log('the member address id is: ', shippingAddressId);

    const request = {
      addressId: shippingAddressId
    };

    this.accountSrv.setDefaultShippingAddress(request).subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.notificationSrv.showSuccess(response.Message);
        this.getShippingAddresses();
      } else {
        this.notificationSrv.showError(response.Message);
      }
    }, error => { console.log(error); });

  }

  // Getters New Address

  get address1() {
    return this.addressForm.controls.address1;
  }

  get address2() {
    return this.addressForm.controls.address2;
  }

  get city() {
    return this.addressForm.controls.city;
  }

  get state() {
    return this.addressForm.controls.state;
  }

  get stateName() {
    return this.addressForm.controls.stateName;
  }

  get stateAbbreviation() {
    return this.addressForm.controls.stateAbbreviation;
  }

  get zipCode() {
    return this.addressForm.controls.zipCode;
  }

  get country() {
    return this.addressForm.controls.country;
  }

  // Getters Update Address

  get address1Update() {
    return this.updateAddressForm.controls.address1Update;
  }

  get address2Update() {
    return this.updateAddressForm.controls.address2Update;
  }

  get cityUpdate() {
    return this.updateAddressForm.controls.cityUpdate;
  }

  get stateUpdate() {
    return this.updateAddressForm.controls.stateUpdate;
  }

  get stateNameUpdate() {
    return this.updateAddressForm.controls.stateNameUpdate;
  }

  get stateAbbreviationUpdate() {
    return this.updateAddressForm.controls.stateAbbreviationUpdate;
  }

  get zipCodeUpdate() {
    return this.updateAddressForm.controls.zipCodeUpdate;
  }

  get countryUpdate() {
    return this.updateAddressForm.controls.countryUpdate;
  }

}
