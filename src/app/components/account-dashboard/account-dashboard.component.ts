import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.less']
})
export class AccountDashboardComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {}

  logout() {
    sessionStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }
}
