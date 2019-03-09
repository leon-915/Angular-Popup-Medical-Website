import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, NotificationService } from 'src/app/services';
import { PasswordValidator } from 'src/app/validators';
import { AddressModel, ShippingAddressModel } from 'src/app/models';

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

  ngOn;
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
    // filling shipping address for testing
    // TODO: get the addresses from the back-end
    const adressList = [];
    const address = new ShippingAddressModel();
    address.nickname = 'first address';
    address.defaultShipping = true;
    address.address = 'address';
    address.address2 = 'address 2';
    address.city = 'city exa';
    address.state = 'tx';
    address.zipCode = '1232545';
    this.shippingAdressList.push(address);

    // this.shippingAdressList = adressList;
  }

  addShippingAddress() {
    // TODO: Add address to the back-end

    console.log('hellos this is the method');

    this.shippingAdressList.push(this.newAddressForm.value);
  }
  removeShippingAddress(index) {
    // TODO: Remove the address from the database
    this.shippingAdressList.splice(index, 1);
    console.log('remove');
  }

  saveUserData() {
    // TODO: Update the user in the database

    console.log('save user data');
  }
}
