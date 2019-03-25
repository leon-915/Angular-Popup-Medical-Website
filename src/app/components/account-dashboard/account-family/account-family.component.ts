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
        member_relation_type_id: [0, [Validators.required]]
      },
      {}
    );
    this.addGuestMemberForm = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        member_relation_type_id: [0]
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

  addMember() {
    let newUser = new FamilyUser();
    newUser = this.addMemberForm.value;
    newUser.is_active = true;
    const found = this.relationTypes.find(element => {
      return (
        element.lookup_member_relation_type_id ===
        Number(newUser.member_relation_type_id)
      );
    });
    newUser.display_value = found.display_value;
    this.familyUsers.push(newUser);
  }
  addGuestMember() {
    let newUser = new FamilyUser();
    newUser = this.addGuestMemberForm.value;
    newUser.is_active = true;
    const found = this.guestRelationTypes.find(element => {
      return (
        element.lookup_member_relation_type_id ===
        Number(newUser.member_relation_type_id)
      );
    });
    newUser.display_value = found.display_value;
    this.guestUsers.push(newUser);
  }
  removeMember(index, isGuest) {
    console.log((index = ' will be removed ' + isGuest));
  }

  goToEdit(index) {
    console.log('go to edit' + index);
  }
  get email() {
    return this.addMemberForm.get('email');
  }
  get memberEmail() {
    return this.addGuestMemberForm.get('email');
  }
}
