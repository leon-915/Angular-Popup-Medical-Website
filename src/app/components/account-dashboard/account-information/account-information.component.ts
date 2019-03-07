import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.less']
})
export class AccountInformationComponent implements OnInit {
  startDate = new Date(1990, 0, 1);

  constructor() {}

  ngOnInit() {}
}
