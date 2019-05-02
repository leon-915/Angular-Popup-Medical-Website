import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { AmIAuthenticatedModel } from '../models';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private isAuthenticated = new Subject<boolean>();

  // tslint:disable: variable-name
  private member_type_id = new Subject<number>();
  private member_type_id_boolean = new Subject<boolean>();

  private serviceURL: string;

  constructor(private commonSrv: CommonService, private http: HttpClient) {
    this.serviceURL = this.commonSrv.apiURL + 'en/';
  }

  updateStatus(): void {
    const url = `${this.serviceURL}amIAuthenticated`;
    this.http.post<AmIAuthenticatedModel>(url, null).subscribe(result => {
      // TODO  @Jorge
      this.member_type_id.next(result.data ? result.data.member_type_id : 0);
      this.member_type_id_boolean.next(true);
      this.isAuthenticated.next(result.success);

      console.log('consolasoooooooo');
      console.log(result.data ? result.data.member_type_id === 1 : false);
    });
  }

  member_type_id_obs(): Observable<number> {
    return this.member_type_id.asObservable();
  }
  member_type_id_obs_boolean(): Observable<boolean> {
    console.log('un pollito');
    console.log(JSON.stringify(this.member_type_id_boolean));
    return this.member_type_id_boolean.asObservable();
  }

  AuthenticationStatus(): Observable<boolean> {
    console.log('un pollitazo');
    console.log(JSON.stringify(this.isAuthenticated));
    return this.isAuthenticated.asObservable();
  }
}
