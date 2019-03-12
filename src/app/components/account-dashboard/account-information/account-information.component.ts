import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, NotificationService } from 'src/app/services';
import { PasswordValidator } from 'src/app/validators';
import * as moment from 'moment';
import {
  AddressModel,
  ShippingAddressModel,
  UserDataResult,
  UserInfoResponse
} from 'src/app/models';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.less']
})
export class AccountInformationComponent implements OnInit {
  startDate = new Date(1990, 0, 1);

  shippingAdressList: ShippingAddressModel[] = [];

  userInfoForm: FormGroup;
  newAddressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationSrv: NotificationService,
    private accountSrv: AccountService
  ) {
    {
    }
  }

  ngOnInit() {
    this.userInfoForm = this.fb.group(
      {
        id: ['', []],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        birthday: [Date(), [Validators.required]],
        // billing address
        address: ['', [Validators.required]],
        address2: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],

        billingPhone: ['', [Validators.required]],
        cellPhone: ['', [Validators.required]]
      },
      {}
    );
    this.newAddressForm = this.fb.group(
      {
        nickname: ['', [Validators.required]],
        defaultShipping: [
          { value: false, disabled: true },
          [Validators.required]
        ],
        address1: ['', [Validators.required]],
        address2: ['', []],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipcode: ['', [Validators.required]]
      },
      {}
    );

    this.accountSrv.getUserData().subscribe(res => {
      console.log(JSON.stringify(res));
      if (!res.HasError) {
        const userData = res.Result;
        this.shippingAdressList = userData.userShippings;
        this.updateUserForm(userData.userData[0], userData.userPhones);
      }
    });
  }

  addShippingAddress() {
    // TODO: Add address to the back-end

    console.log('hellos this is the method');

    this.shippingAdressList.push(this.newAddressForm.value);

    const requestPayload = this.newAddressForm.value;
    requestPayload.member_id = this.userInfoForm.value.id;
    console.log(JSON.stringify(requestPayload));

    this.accountSrv.addUserAddress(requestPayload).subscribe(res => {
      if (!res.HasError) {
        const userData = res.Result;
        this.shippingAdressList = userData.userShippings;
        this.notificationSrv.showSuccess('address added');
        this.newAddressForm.setValue({
          nickname: '',
          defaultShipping: false,
          address1: '',
          address2: '',
          city: '',
          state: '',
          zipcode: ''
        });
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }
  removeShippingAddress(index) {
    const addresId = this.shippingAdressList[index].member_address;

    if (addresId) {
      // TODO: Remove the address from the database
      console.log('delete');
      this.accountSrv.deleteAddress(addresId).subscribe(res => {
        console.log(JSON.stringify(res));
        if (!res.HasError) {
          this.shippingAdressList.splice(index, 1);
        } else {
          this.notificationSrv.showError(res.Message);
        }
      });
    }
  }

  saveUserData() {
    // TODO: Check the phone number data how to display all phone numbers

    console.log('save user data');
  }

  updateUserForm(userData, userPhones) {
    console.log(JSON.stringify(userData));
    this.userInfoForm.setValue({
      id: userData.member_id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      gender: userData.gender,
      birthday: moment(userData.date_of_birth).format('YYYY-MM-DD'),
      address: userData.address1,
      address2: userData.address2,
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipcode,
      billingPhone: userPhones[0].phone_number,
      cellPhone: userPhones[1].phone_number
    });
  }
}
