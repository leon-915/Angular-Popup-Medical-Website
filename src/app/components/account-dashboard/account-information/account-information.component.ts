import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AccountService,
  NotificationService,
  GooglePlacesService
} from 'src/app/services';
import { PasswordValidator } from 'src/app/validators';
import * as moment from 'moment';
import {
  AddressModel,
  ShippingAddressModel,
  UserDataResult,
  UserInfoResponse,
  AccountUpdateRequest,
  Address,
  UserPhone
} from 'src/app/models';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.less']
})
export class AccountInformationComponent implements OnInit, AfterViewInit {
  @ViewChild('billingAddress') billingAdress: ElementRef;

  startDate = new Date(1990, 0, 1);

  shippingAdressList: ShippingAddressModel[] = [];
  private latitude: number;
  private longitude: number;
  userInfoForm: FormGroup;
  newAddressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationSrv: NotificationService,
    private googleSrvPlaces: GooglePlacesService,
    private accountSrv: AccountService
  ) {
    this.userInfoForm = this.fb.group(
      {
        id: ['', []],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        gender_id: ['', []],
        gender: ['', [Validators.required]],
        birthday: [Date(), [Validators.required]],
        // billing address
        member_address: ['', []],
        address1: ['', [Validators.required]],
        address2: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
        latitude: ['', []],
        longitude: ['', []],
        // shipping_addresses
        shipping_addresses: fb.array([]),
        billingPhone: ['', [Validators.required]],
        cellPhone: ['', [Validators.required]]
      },
      {}
    );
    this.newAddressForm = this.fb.group(
      {
        nickname: ['', [Validators.required]],
        defaultShipping: [false, [Validators.required]],
        address1: ['', [Validators.required]],
        address2: ['', []],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipcode: ['', [Validators.required]],
        latitude: [0, []],
        longitude: [0, []]
      },
      {}
    );
  }

  ngOnInit() {
    this.accountSrv.getUserData().subscribe(res => {
      if (!res.HasError) {
        const userData = res.Result;
        this.shippingAdressList = userData.userShippings;
        this.updateUserForm(userData.userData[0], userData.userPhones);
        this.shippingAdressList.forEach(address => {
          this.addShippingaddress(address);
        });
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }
  ngAfterViewInit() {
    this.googleSrvPlaces
      .loadMaps(this.billingAdress, this.setAddress)
      .then(() => {
        console.log('Google maps loaded');
      })
      .catch(error => {
        console.log('error loading map', error);
      });
  }
  createShippingAddress() {
    // TODO: Add address to the back-end
    this.newAddressForm.patchValue({
      defaultShipping: this.shippingAdressList.length < 1
    });

    console.log(JSON.stringify(this.newAddressForm.value));
    this.accountSrv.addUserAddress(this.newAddressForm.value).subscribe(res => {
      if (!res.HasError) {
        const userData = res.Result;
        this.shippingAdressList = userData.userShippings;
        const listSize = this.shippingAdressList.length;
        const lastAddress = this.shippingAdressList[listSize - 1];
        console.log('--------------------------------');
        console.log(JSON.stringify(this.shippingAdressList));
        console.log(JSON.stringify(this.shippingAdressList[listSize - 1]));
        console.log(JSON.stringify(lastAddress));
        this.addShippingaddress(lastAddress);
        this.notificationSrv.showSuccess(res.Message);
        this.clearNewAddressForm();
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }
  removeShippingAddress(index) {
    const addresId = this.shippingAdressList[index].member_address;

    if (addresId) {
      this.accountSrv.deleteAddress(addresId).subscribe(res => {
        if (!res.HasError) {
          this.shippingAdressList.splice(index, 1);
          this.deleteAdress(index);
          this.notificationSrv.showSuccess('shipping address deleted');
        } else {
          this.notificationSrv.showError(res.Message);
        }
      });
    }
  }

  saveUserData() {
    // TODO: Check the phone number data how to display all phone numbers
    const userFormData = this.userInfoForm.value;
    const billingAddress = new Address();
    billingAddress.member_address = userFormData.member_address;
    billingAddress.address1 = userFormData.address1;
    billingAddress.address2 = userFormData.address2;
    billingAddress.city = userFormData.city;
    billingAddress.state = userFormData.state;
    billingAddress.zipcode = userFormData.zipCode;

    const accountUpdateRequest = new AccountUpdateRequest();
    accountUpdateRequest.member_id = userFormData.id;
    accountUpdateRequest.first_name = userFormData.firstName;
    accountUpdateRequest.last_name = userFormData.lastName;
    accountUpdateRequest.gender_id = userFormData.gender_id;
    accountUpdateRequest.date_of_birth = userFormData.birthday;
    accountUpdateRequest.billing_addres = billingAddress;
    accountUpdateRequest.address = this.shippingAdressList;
    accountUpdateRequest.billing_phone = userFormData.billingPhone;
    accountUpdateRequest.mobil_phone = userFormData.cellPhone;

    console.log(JSON.stringify(accountUpdateRequest));
    this.accountSrv.updateUserData(accountUpdateRequest).subscribe(res => {
      if (!res.HasError) {
        this.notificationSrv.showSuccess(res.Message);
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }

  updateUserForm(userData, userPhones) {
    console.log(JSON.stringify(userData));
    this.userInfoForm.patchValue({
      id: userData.member_id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      gender: userData.gender,
      gender_id: userData.gender_id,
      birthday: moment(userData.date_of_birth).format('YYYY-MM-DD'),
      member_address: userData.member_address,
      address1: userData.address1,
      address2: userData.address2 ? userData.address2 : '',
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipcode,
      latitude: userData.latitude ? userData.latitude : 0,
      longitude: userData.longitude ? userData.longitude : 0,
      billingPhone: userPhones[0].phone_number,
      cellPhone: userPhones[1].phone_number
    });
  }

  setAddress = (
    address1: string,
    city: string,
    state: string,
    zipCode: string,
    latitude: number,
    longitude: number
  ) => {
    this.userInfoForm.controls.zipCode.setValue(zipCode);
    this.userInfoForm.controls.city.setValue(city);
    this.userInfoForm.controls.state.setValue(state);
    this.userInfoForm.controls.address1.setValue(address1);
    this.userInfoForm.controls.latitude.setValue(latitude);
    this.userInfoForm.controls.longitude.setValue(longitude);

    // tslint:disable-next-line: semicolon
  };

  addShippingaddress(address?: ShippingAddressModel) {
    const fg = this.fb.group({
      nickname: [address.nickname, [Validators.required]],
      defaultShipping: [address.is_default, []],
      address1: [address.address1, [Validators.required]],
      address2: [address.address2, []],
      city: [address.city, [Validators.required]],
      state: [address.state, [Validators.required]],
      zipcode: [address.zipcode, [Validators.required]],
      latitude: [address.latitude, []],
      longitude: [address.longitude, []]
    });
    (this.userInfoForm.get('shipping_addresses') as FormArray).push(fg);
  }

  deleteAdress(index: number) {
    (this.userInfoForm.get('shipping_addresses') as FormArray).removeAt(index);
  }

  clearNewAddressForm() {
    this.newAddressForm.setValue({
      nickname: '',
      defaultShipping: false,
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      latitude: 0,
      longitude: 0
    });
  }
  updateAddressList() {}
}
