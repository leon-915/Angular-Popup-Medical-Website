import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APIResponse, SignupRequestModel, PlanModel, AddressModel } from './../models/index';
import {CommonService} from './common.service';

@Injectable()
export class SignupService {

  private signupStep = 1;

  constructor(private commonSrv: CommonService, private http: HttpClient) {}
  serviceURl: string = this.commonSrv.apiURL;

  signupCognito(signupRequestModel: SignupRequestModel) {
    const url: string = this.serviceURl + 'signup';
    return this.http.post<APIResponse<any>>(url, signupRequestModel);
  }

  signup(signupRequestModel: SignupRequestModel) {
    // const url: string = this.serviceURl + 'signup';
    const url = 'https://rcgkdcymzi.execute-api.us-west-2.amazonaws.com/dev/signup';
    return this.http.post<APIResponse<any>>(url, signupRequestModel);
  }

  getSignupInformation(signupRequestModel: SignupRequestModel) {
    const url = 'https://rcgkdcymzi.execute-api.us-west-2.amazonaws.com/dev/get-signup-information';
    return this.http.post<APIResponse<any>>(url, signupRequestModel);
  }

  setSignupStep(step: number) {
    this.signupStep = step;
  }

  getSignupStep() {
    return this.signupStep;
  }

}
