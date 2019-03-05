import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-step1',
  templateUrl: './reset-password-step1.component.html',
  styleUrls: ['./reset-password-step1.component.less']
})
export class ResetPasswordStep1Component implements OnInit, AfterContentInit {
  constructor(private router: Router) {}
  ngOnInit() {}
  ngAfterContentInit(): void {
    setTimeout(this.goToStep3, 3000);
  }

  goToStep3 = () => {
    this.router.navigate(['/reset/step2']);
  };
}
