import { Injectable } from '@angular/core';
import {
  AllergiesModel,
  APIResponse,
  UserDataResult,
  GetMyFamilyResult,
  FamilyUser
} from '../models/index';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyFamilyService {
  constructor(private commonSrv: CommonService, private http: HttpClient) {}

  serviceURl: string = this.commonSrv.apiURL;

  getMyFamily() {
    const url = `${this.serviceURl}account/myfamily`;
    return this.http.get<APIResponse<GetMyFamilyResult>>(url);
  }
  deleteMyFamilyMember(member: FamilyUser) {
    const url = `${this.serviceURl}account/myfamily`;
    return this.http.put<APIResponse<boolean>>(url, member);
  }
  addMyFamilyMember(member: FamilyUser) {
    const url = `${this.serviceURl}account/myfamily`;
    return this.http.post<APIResponse<FamilyUser>>(url, member);
  }
}
