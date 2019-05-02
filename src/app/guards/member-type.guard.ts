import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { map } from 'rxjs/operators';
import { NotificationService } from '../services';
import { AccountService } from 'src/app/services';

@Injectable({
  providedIn: 'root'
})
export class MemberType implements CanActivate {
  constructor(
    public auth: AccountService,
    public router: Router,
    private notificationSrv: NotificationService,
    private menuService: MenuService
  ) {}

  // TODO  @Jorge
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.menuService.member_type_id_obs_boolean();
  }
}
