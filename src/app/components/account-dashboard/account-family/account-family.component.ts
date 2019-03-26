import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AccountService,
  NotificationService,
  MyFamilyService
} from 'src/app/services';
import { PasswordValidator } from 'src/app/validators';
import { ReCaptchaV3Service } from 'ngx-captcha';

import { SendPassResetConfirmationRequestModel } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { RelationType, FamilyUser } from 'src/app/models/myFamily.model';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-account-family',
  templateUrl: './account-family.component.html',
  styleUrls: ['./account-family.component.less']
})
export class AccountFamilyComponent implements OnInit {
  addMemberForm: FormGroup;
  addGuestMemberForm: FormGroup;
  relationTypes: RelationType[];
  guestRelationTypes: RelationType[];

  familyUsers: FamilyUser[];
  guestUsers: FamilyUser[];

  constructor(
    private fb: FormBuilder,
    private accountSrv: AccountService,
    private myFamilySrv: MyFamilyService,
    private notificationSrv: NotificationService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private router: Router
  ) {
    this.addMemberForm = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        member_relation_type_id: [0, [Validators.required, Validators.min(1)]]
      },
      {}
    );
    this.addGuestMemberForm = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        member_relation_type_id: [0, [Validators.required, Validators.min(1)]]
      },
      {}
    );
  }

  ngOnInit() {
    this.myFamilySrv.getMyFamily().subscribe(res => {
      if (!res.HasError) {
        const resulData = res.Result;
        this.relationTypes = resulData.relationTypes;
        this.guestRelationTypes = resulData.guestRelationTypes;
        this.familyUsers = resulData.familyUsers;
        this.guestUsers = resulData.guestUsers;
      }
    });
  }

  removefromList(index, isGuest) {
    if (isGuest) {
      this.guestUsers.splice(index, 1);
    } else {
      this.familyUsers.splice(index, 1);
    }
  }
  addMember() {
    this.myFamilySrv
      .addMyFamilyMember(this.addMemberForm.value)
      .subscribe(res => {
        if (!res.HasError) {
          this.familyUsers.push(res.Result);
          this.notificationSrv.showSuccess(res.Message);
        } else {
          this.notificationSrv.showError(res.Message);
        }
      });
  }
  addGuestMember() {
    this.myFamilySrv
      .addMyFamilyMember(this.addGuestMemberForm.value)
      .subscribe(res => {
        if (!res.HasError) {
          this.guestUsers.push(res.Result);
          this.notificationSrv.showSuccess(res.Message);
        } else {
          this.notificationSrv.showError(res.Message);
        }
      });
  }
  removeMember(index: number, isGuest: boolean) {
    const member = isGuest ? this.guestUsers[index] : this.familyUsers[index];

    this.myFamilySrv.deleteMyFamilyMember(member).subscribe(res => {
      if (!res.HasError) {
        this.notificationSrv.showSuccess(res.Message);
        this.removefromList(index, isGuest);
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }

  goToEdit(index, isNewDependant) {
    console.log('go to edit' + index + ' ' + isNewDependant);
  }
  get email() {
    return this.addMemberForm.get('email');
  }
  get memberEmail() {
    return this.addGuestMemberForm.get('email');
  }
}
