import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APIResponse, SignupRequestModel, SignupResult, AddressModel } from './../models/index';
import {CommonService} from './common.service';

@Injectable()
export class SignupService {

  private memberAddress: AddressModel;
  private memberPhoneNumber: string;

  constructor(private commonSrv: CommonService, private http: HttpClient) {}
  serviceURl: string = this.commonSrv.apiURL;

  signupCognito(signupRequestModel: SignupRequestModel) {
    const url: string = this.serviceURl + 'signup';
    return this.http.post<APIResponse<any>>(url, signupRequestModel);
  }

  signup(signupRequestModel) {
    // const url: string = this.serviceURl + 'signup';
    const url = 'https://rcgkdcymzi.execute-api.us-west-2.amazonaws.com/dev/signup';
    return this.http.post<APIResponse<any>>(url, signupRequestModel);
  }

  setMemberAddress(add: AddressModel) {
    this.memberAddress = add;
  }

  setMemberPhoneNumber(phoneNumber: string) {
    this.memberPhoneNumber = phoneNumber;
  }

  getMemberAddress() {
    return this.memberAddress;
  }

  getMemberPhoneNumber() {
    return this.memberPhoneNumber;
  }

}
