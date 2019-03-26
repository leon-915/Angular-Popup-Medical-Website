import { Injectable } from '@angular/core';
import { DateModel, APIResponse } from '../models/index';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private commonSrv: CommonService, private http: HttpClient) {}

  serviceURl: string = this.commonSrv.apiURL;

  getDateInfo() {
    const url = this.serviceURl + 'date/getdatesinfo';
    return this.http.get<APIResponse<DateModel>>(url);
  }
}
