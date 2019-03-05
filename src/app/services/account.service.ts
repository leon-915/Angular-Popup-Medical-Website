import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  APIResponse,
  AccountResult,
  LoginRequestModel,
  SignupRequestModel,
  SignupResult,
  SendPassResetEmailRequestModel,
  SendPassResetEmailResult
} from './../models/index';
import { CommonService } from './common.service';
import {
  SendPassResetConfirmationRequestModel,
  SendPassResetConfirmationResult
} from '../models/account.model';

@Injectable()
export class AccountService {
  constructor(private commonSrv: CommonService, private http: HttpClient) {}
  serviceURl: string = this.commonSrv.apiURL;

  signin(loginRequestModel: LoginRequestModel) {
    const url = `${this.serviceURl}signin`;
    return this.http.post<APIResponse<AccountResult>>(url, loginRequestModel);
  }

  signup(signupRequestModel: SignupRequestModel) {
    const url = `${this.serviceURl}signup`;
    return this.http.post<APIResponse<SignupResult>>(url, signupRequestModel);
  }

  resetPassSendEmail(sendRequestEmailModel: SendPassResetEmailRequestModel) {
    const url = `${this.serviceURl}forgot-password`;
    return this.http.post<APIResponse<SendPassResetEmailResult>>(
      url,
      sendRequestEmailModel
    );
  }

  resetPassSendChage(
    sendRequestConfirmationModel: SendPassResetConfirmationRequestModel
  ) {
    const url = `${this.serviceURl}reset-password`;
    return this.http.post<APIResponse<SendPassResetConfirmationResult>>(
      url,
      sendRequestConfirmationModel
    );
  }
}
