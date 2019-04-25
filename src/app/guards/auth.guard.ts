import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AccountService, public router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.amIAuthenticated().pipe(
      map(response => {
        if (response.success) {
          return true;
        } else {
          this.router.navigate(['/'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
      })
    );
  }
}
