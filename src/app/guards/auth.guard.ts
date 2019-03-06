// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { AuthService } from '../auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(public auth: AuthService, public router: Router) {}
//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return this.auth.amIAuthenticated().pipe(
//       map(response => {
//         if (!response.HasError) {
//           return true;
//         } else {
//           return false;
//         }
//       })
//     );
//   }
// }
