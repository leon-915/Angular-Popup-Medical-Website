import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyFamilyService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.less']
})
export class AccountDashboardComponent implements OnInit {
  isNormaluser = true;

  constructor(private router: Router, private myFamilySrv: MyFamilyService, private notificationSrv: NotificationService) {}

  ngOnInit() {
    const membertype = localStorage.getItem('member_type_id');
    console.log('----------------');
    console.log(membertype);
    if (!isNaN(+membertype)) {
      this.isNormaluser = +membertype === 1;
      console.log(this.isNormaluser);
    }
  }
  upgradeMember() {
    this.myFamilySrv.upgradePhamilyAccount().subscribe(res => {
      if (!res.HasError) {
        this.notificationSrv.showInfo('success, please complete the sign up');
        this.router.navigate(['/my-home']);
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }
  logout() {
    sessionStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }
}
