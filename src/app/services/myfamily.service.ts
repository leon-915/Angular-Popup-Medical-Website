import { Injectable } from '@angular/core';
import { APIResponse, GetMyFamilyResult, FamilyUser } from '../models/index';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { GetMyFamilyEditResult, AddDependent } from '../models/myFamily.model';

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
  getEditMyFamily(memberId: number) {
    const url = `${this.serviceURl}account/myfamily/edit`;
    console.log(url);
    return this.http.post<APIResponse<GetMyFamilyEditResult>>(url, {
      member_relation_id: memberId
    });
  }
  putEditMyFamily(familyMember) {
    const url = `${this.serviceURl}account/myfamily/edit`;
    return this.http.put<APIResponse<GetMyFamilyEditResult>>(url, familyMember);
  }

  addDependent(dependent: AddDependent) {
    const url = `${this.serviceURl}account/myfamily/adddependent`;
    return this.http.post<APIResponse<boolean>>(url, dependent);
  }

  upgradePhamilyAccount() {
    const url = `${this.serviceURl}account/upgradeguestaccount`;
    return this.http.put<APIResponse<boolean>>(url, {});
  }
}
@Injectable()
export class MyFamilyPersistData {
  private relationId: number;
  private isNewDependant: boolean;
  getRelationId(): number {
    return this.relationId;
  }

  setRelationId(relationId: number) {
    this.relationId = relationId;
  }

  getIsNewDependant(): boolean {
    return this.isNewDependant;
  }

  setIsNewDependantt(isNewDependant: boolean) {
    this.isNewDependant = isNewDependant;
  }
}
