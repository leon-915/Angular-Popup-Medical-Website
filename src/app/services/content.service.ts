import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {APIResponse, Content, RequestProduct} from './../models/index';
import {CommonService} from './common.service';



@Injectable()
export class ContentService {
  constructor(private commonSrv: CommonService, private http: HttpClient) {}

  serviceURl: string = this.commonSrv.contentPatientEducation;

  getPatientEducation(idProd: number, lang: string) {

    const url: string = this.serviceURl + 'patient-education';
    const reqProduct: RequestProduct =  { idProduct: idProd, language: lang };
    return this.http.post<APIResponse<Content>>(url, reqProduct);
  }


}
