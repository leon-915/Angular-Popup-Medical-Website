import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APIResponse, SignupRequestModel } from './../models/index';
import {CommonService} from './common.service';

@Injectable()
export class SignupService {

  private signupStep = 1;

  constructor(private commonSrv: CommonService, private http: HttpClient) {}
  serviceURl: string = this.commonSrv.apiURL;

  signupCognito(signupRequestModel: SignupRequestModel) {
    const url: string = this.serviceURl + 'signup/signupcognito';
    return this.http.post<APIResponse<any>>(url, signupRequestModel);
  }

  signup(signupRequestModel: SignupRequestModel) {
    const url: string = this.serviceURl + 'signup/signup';
    return this.http.post<APIResponse<any>>(url, signupRequestModel);
  }

  getSignupInformation(signupRequestModel: SignupRequestModel) {
    const url: string = this.serviceURl + 'signup/getsignupinfo';
    return this.http.post<APIResponse<any>>(url, signupRequestModel);
  }

  setSignupStep(step: number) {
    this.signupStep = step;
  }

  getSignupStep() {
    return this.signupStep;
  }

}
