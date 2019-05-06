import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyFamilyService, NotificationService } from 'src/app/services';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.less']
})
export class AccountDashboardComponent implements OnInit {
  isNormaluser = true;

  constructor(
    private router: Router,
    private myFamilySrv: MyFamilyService,
    private menuService: MenuService,
    private notificationSrv: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // TODO get the variable from the observer and remove this from the storage @Jorge
    const membertype = localStorage.getItem('member_type_id');
    if (!isNaN(+membertype)) {
      this.isNormaluser = +membertype === 1;
    }
  }
  upgradeMember() {
    this.myFamilySrv.upgradePhamilyAccount().subscribe(res => {
      if (!res.HasError) {
        this.notificationSrv.showInfo('success, please complete the sign up');
        this.router.navigate(['../my-home'], { relativeTo: this.activatedRoute });
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }
  logout() {
    sessionStorage.setItem('token', '');
    this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
  }
}
