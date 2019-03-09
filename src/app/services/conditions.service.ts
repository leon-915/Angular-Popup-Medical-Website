import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { APIResponse, ConditionsModel } from '../models/index';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConditionsService {

  constructor(private commonSrv: CommonService, private http: HttpClient) {}
  
  serviceURl: string = this.commonSrv.apiURL;

  getConditions() {
    const url = this.serviceURl + 'conditions/getconditions';
    return this.http.get<APIResponse<ConditionsModel>>(url);
  }
}
