import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {APIResponse, Content, } from './../models/index';
import {CommonService} from './common.service';

@Injectable()
export class AccountService {

  constructor(private commonSrv: CommonService, private http: HttpClient) {}
  serviceURl: string = this.commonSrv.apiURL;


  signin(emailusername: string, pass: string, recptcha: string) {
    const url: string = this.serviceURl + 'signin';
    const reqCognito  =  { email: emailusername, password: pass, recaptcha: recptcha };
    return this.http.post<APIResponse<Content>>(url, reqCognito);
  }

}
