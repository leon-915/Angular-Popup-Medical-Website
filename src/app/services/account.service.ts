import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {APIResponse, AccountResult, LoginRequestModel } from './../models/index';
import {CommonService} from './common.service';

@Injectable()
export class AccountService {

  constructor(private commonSrv: CommonService, private http: HttpClient) {}
  serviceURl: string = this.commonSrv.apiURL;


  signin(loginRequestModel: LoginRequestModel) {
    const url: string = this.serviceURl + 'signin';
    return this.http.post<APIResponse<AccountResult>>(url, loginRequestModel);
  }

}
