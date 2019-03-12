import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  APIResponse,
  PingResult,
  LoginRequestModel,
  TokenResult,
  UserDataResult,
  AddAddressRequestModel,
  AddAddressResult
} from './../models/index';
import { CommonService } from './common.service';

import {
  SendPassResetConfirmationRequestModel,
  SendPassResetConfirmationResult,
  SignupRequestModel,
  SendPassResetEmailResult,
  SendPassResetEmailRequestModel
} from '../models/index';

@Injectable()
export class AccountService {
  private userEmail: string;
  private userEmailMasked: string;

  constructor(private commonSrv: CommonService, private http: HttpClient) {}
  serviceURl: string = this.commonSrv.apiURL;

  signin(loginRequestModel: LoginRequestModel) {
    const url = `${this.serviceURl}account/signin`;
    return this.http.post<APIResponse<TokenResult>>(url, loginRequestModel);
  }

  ping() {
    const url = `${this.serviceURl}account/ping`;
    return this.http.post<APIResponse<PingResult>>(url, null);
  }

  getUserData() {
    const url = `${this.serviceURl}account/accountinfo`;
    return this.http.get<APIResponse<UserDataResult>>(url);
  }
  addUserAddress(addAdressModel: AddAddressRequestModel) {
    const url = `${this.serviceURl}account/address`;
    return this.http.post<APIResponse<AddAddressResult>>(url, {
      newAddress: addAdressModel
    });
  }
  deleteAddress(addressId: number) {
    const url = `${this.serviceURl}account/deleteaddress`;
    return this.http.post<APIResponse<boolean>>(url, {
      member_address: addressId
    });
  }
  resetPassSendCode(sendRequestEmailModel: SendPassResetEmailRequestModel) {
    const url = `${this.serviceURl}password/sendcode`;
    return this.http.post<APIResponse<SendPassResetEmailResult>>(
      url,
      sendRequestEmailModel
    );
  }

  resetPassValidateCode(
    sendRequestConfirmationModel: SendPassResetConfirmationRequestModel
  ) {
    const url = `${this.serviceURl}password/validatecode`;

    return this.http.post<APIResponse<SendPassResetConfirmationResult>>(
      url,
      sendRequestConfirmationModel
    );
  }

  // Setters Getters
  setUserEmail(email: string) {
    this.userEmail = email;
  }

  getUserEmail() {
    return this.userEmail;
  }
  setUserEmailMasked(emailMasked: string) {
    this.userEmailMasked = emailMasked;
  }

  getUserEmailMasked() {
    return this.userEmailMasked;
  }
}
