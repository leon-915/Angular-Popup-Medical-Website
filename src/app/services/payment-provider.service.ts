import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { APIResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PaymentProviderService {

  constructor(private commonSrv: CommonService, private http: HttpClient) { }

  serviceURl: string = this.commonSrv.apiURL + 'en/';

  addPaymentMethod(paymentInformation) {
    const url = this.serviceURl + 'create/payment-profile';
    return this.http.post<APIResponse<any>>(url, paymentInformation);
  }

  getCustomerProfile() {
    const url = this.serviceURl + 'get/profile';
    return this.http.get<APIResponse<any>>(url);
  }

  deletePaymentMethod(paymentMethod) {
    const url = this.serviceURl + 'delete/payment-profile';
    return this.http.post<APIResponse<any>>(url, paymentMethod);
  }

}
