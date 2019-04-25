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
  private serviceURL: string;

  constructor(private commonSrv: CommonService, private http: HttpClient) {
    this.serviceURL = this.commonSrv.apiURL + 'en/';
  }

  updateStatus(): void {
    const url = `${this.serviceURL}amIAuthenticated`;
    this.http.post<AmIAuthenticatedModel>(url, null).subscribe(result => {
      this.isAuthenticated.next(result.success);
    });
  }

  AuthenticationStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
