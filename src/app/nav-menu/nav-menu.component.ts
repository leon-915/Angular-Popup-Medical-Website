import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from './../translator/translate.service';
declare var $: any;

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less']
})
export class NavMenuComponent implements OnInit {
  lang = localStorage.getItem('lng');
  constructor(private translate: TranslateService, private router: Router, private activatedRoute: ActivatedRoute) {}

  navbarOpen = false;

  showSideNav() {
    console.log(this.navbarOpen);
    $('#mobile-demo').sidenav({
      edge: 'left'
    });
  }

  showSideNavRight() {
    console.log(this.navbarOpen);
    $('#right-sidevar').sidenav({
      edge: 'right'
    });
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.dropdown-trigger').dropdown();
    });
  }
  setLang(language: string) {
    this.lang = language;
    localStorage.setItem('lng', language);
    this.translate.use();
  }
}
