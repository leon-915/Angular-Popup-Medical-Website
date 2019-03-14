import { Component } from '@angular/core';
// import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
// import { Observable } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less']
})
export class NavMenuComponent {

  constructor() {}

  navbarOpen = false;

  showSideNav() {
    console.log(this.navbarOpen);
    $('.sidenav').sidenav();
  }
}
