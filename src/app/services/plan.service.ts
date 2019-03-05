import { PlanModel } from './../models/plans.model';
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {APIResponse } from './../models/index';
import {CommonService} from './common.service';

@Injectable()
export class PlanService {

  private planSelected: PlanModel;

  constructor(private commonSrv: CommonService, private http: HttpClient) {}
  serviceURl: string = this.commonSrv.apiURL;


  getPlans() {
    /**
     * Preguntar a Jorge como hacer para que sea la misma url que la de Cognito
     */
    const url = 'https://rcgkdcymzi.execute-api.us-west-2.amazonaws.com/dev/get-plans';
    return this.http.get<APIResponse<PlanModel[]>>(url);
  }

  setPlanSelected(plan: PlanModel) {
    this.planSelected = plan;
  }

  getPlanSelected() {
    return this.planSelected;
  }

}
