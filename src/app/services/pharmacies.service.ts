import { Injectable } from '@angular/core';
import { CommonService } from '.';
import { APIResponse, PharmacyModel } from '../models/index';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PharmaciesService {

  constructor(private commonSrv: CommonService, private http: HttpClient) {}
  serviceURl: string = this.commonSrv.apiURL;


  getNearestPharmacies() {
    const url = this.serviceURl + 'getpharmacies';
    return this.http.get<APIResponse<PharmacyModel[]>>(url);
  }
}
