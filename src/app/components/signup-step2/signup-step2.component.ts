import { PoliciesService } from '../../services/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicyModel } from '../../models/index';

@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.component.html',
  styleUrls: ['./signup-step2.component.less']
})
export class SignupStep2Component implements OnInit {
  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  signupForm: FormGroup;
  public policies: PolicyModel[] = new Array<PolicyModel>();

  constructor(private fb: FormBuilder, private policySrv: PoliciesService) {
    this.policySrv.getPolicies().subscribe(
      response => {
        if (!response.HasError) {
          this.policies = response.Result;
          console.log(this.policies);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      acceptTerms: ['', [Validators.required]],
      acceptPrivacyPolicy: ['', [Validators.required]],
      acceptDataSharing: ['', [Validators.required]],
      optInEmail: ['', [Validators.required]],
      optInSms: ['', [Validators.required]],
      currentStep: [this.step]
    });
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  doSignup() {
    this.userAction('advance');
  }
}
