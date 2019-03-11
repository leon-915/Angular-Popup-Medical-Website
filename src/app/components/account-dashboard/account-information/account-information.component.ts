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
        defaultShipping: [false, [Validators.required]],
        address: ['', [Validators.required]],
        address2: ['', []],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]]
      },
      {}
    );

    this.accountSrv.getUserData().subscribe(result => {
      const userData = result.Result;
      this.shippingAdressList = userData.userShippings;
      this.updateUserForm(userData.userData[0], userData.userPhones);
    });
    console.log('hellos');
  }

  addShippingAddress() {
    // TODO: Add address to the back-end

    console.log('hellos this is the method');

    this.shippingAdressList.push(this.newAddressForm.value);
  }
  removeShippingAddress(index) {
    const addresId = this.shippingAdressList[index].member_address;
    this.shippingAdressList.splice(index, 1);
    if (addresId) {
      // TODO: Remove the address from the database
      console.log('delete');
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
