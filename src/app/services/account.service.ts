import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  APIResponse,
  PingResult,
  LoginRequestModel,
  TokenResult,
  UserDataResult,
  AddAddressRequestModel,
  AddAddressResult,
  AccountUpdateRequest,
  ChangePasswordModel,
  AmIAuthenticatedModel
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

  constructor(private commonSrv: CommonService, private http: HttpClient) { }
  serviceURl: string = this.commonSrv.apiURL;

  signin(loginRequestModel: LoginRequestModel) {
    const url = `${this.serviceURl}login`;
    return this.http.post<APIResponse<TokenResult>>(url, loginRequestModel);
  }

  amIAuthenticated() {
    const url = `${this.serviceURl}amIAuthenticated`;
    return this.http.post<AmIAuthenticatedModel>(url, null);
  }

  ping() {
    const url = `${this.serviceURl}account/ping`;
    return this.http.post<APIResponse<PingResult>>(url, null);
  }

  getUserData() {
    const url = `${this.serviceURl}user`;
    return this.http.get<APIResponse<UserDataResult>>(url);
  }
  updateUserData(accountUpdateRequest: AccountUpdateRequest) {
    const url = `${this.serviceURl}user`;
    return this.http.put<APIResponse<boolean>>(url, accountUpdateRequest);
  }
  addUserAddress(addAdressModel: AddAddressRequestModel) {
    const url = `${this.serviceURl}user/address`;
    return this.http.post<APIResponse<AddAddressResult>>(url, addAdressModel);
  }
  deleteAddress(addressId: number) {
    const url = `${this.serviceURl}user/address/${addressId}`;
    return this.http.delete<APIResponse<boolean>>(url);
  }

  // Reset password
  // send code
  resetPassSendCode(sendRequestEmailModel: SendPassResetEmailRequestModel) {
    const url = `${this.serviceURl}password/sendcode`;
    return this.http.post<APIResponse<SendPassResetEmailResult>>(url, sendRequestEmailModel);
  }
  // validate code
  resetPassValidateCode(sendRequestConfirmationModel: SendPassResetConfirmationRequestModel) {
    const url = `${this.serviceURl}password/validate-code`;

    return this.http.post<APIResponse<SendPassResetConfirmationResult>>(url, sendRequestConfirmationModel);
  }
  changePassSecurity(payload: ChangePasswordModel) {
    const url = `${this.serviceURl}security/password`;

    return this.http.post<APIResponse<boolean>>(url, payload);
  }
  changePinSecurity(payload: string) {
    const url = `${this.serviceURl}security/textpin`;
    return this.http.post<APIResponse<boolean>>(url, payload);
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
