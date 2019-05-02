import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuService } from '../services/menu.service';

@Injectable({
  providedIn: 'root'
})
export class MemberType implements CanActivate {
  constructor(private menuService: MenuService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.menuService.member_type_id_obs().pipe(
      map(result => {
        console.log('guard');
        console.log(result);
        return result === 1;
      })
    );
  }
}
