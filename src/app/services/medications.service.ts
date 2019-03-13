import { Injectable } from '@angular/core';
import { MedicationModel, APIResponse } from '../models/index';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  constructor(private commonSrv: CommonService, private http: HttpClient) {}

  serviceURl: string = this.commonSrv.apiURL;

  getMedicationSupplements() {
    const url = this.serviceURl + 'medications/getmedications';
    return this.http.get<APIResponse<MedicationModel>>(url);
  }
}
