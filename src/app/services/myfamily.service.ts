import { Injectable } from '@angular/core';
import { APIResponse, GetMyFamilyResult, FamilyUser } from '../models/index';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { GetMyFamilyEditResult } from '../models/myFamily.model';

@Injectable({
  providedIn: 'root'
})
export class MyFamilyService {
  private relationId: number;
  private isNewDependant: boolean;
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
  getEditMyFamily(memberId: number) {
    const url = `${this.serviceURl}account/editFamily`;
    return this.http.post<APIResponse<GetMyFamilyEditResult>>(url, {
      member_relation_id: memberId
    });
  }
  putEditMyFamily(memberId: number) {
    const url = `${this.serviceURl}account/editFamily`;
    return this.http.put<APIResponse<GetMyFamilyEditResult>>(url, {
      member_relation_id: memberId
    });
  }

  // Setters Getters
  setRelationId(relationId: number) {
    this.relationId = relationId;
  }

  getRelationId() {
    return this.relationId;
  }
  setIsNewDependantt(isNewDependant: boolean) {
    this.isNewDependant = isNewDependant;
  }

  getIsNewDependant() {
    return this.isNewDependant;
  }
}
