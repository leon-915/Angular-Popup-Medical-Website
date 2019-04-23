import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService, NotificationService, MyFamilyService, MyFamilyPersistData } from 'src/app/services';
import { ReCaptchaV3Service } from 'ngx-captcha';

import { RelationType, FamilyUser } from 'src/app/models/myFamily.model';
import * as CryptoJS from 'crypto-js';

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

  activeFamilyUsers: FamilyUser[];
  activeGuestUsers: FamilyUser[];

  constructor(
    private fb: FormBuilder,
    private accountSrv: AccountService,
    private myFamilySrv: MyFamilyService,
    private myFamilyPd: MyFamilyPersistData,
    private notificationSrv: NotificationService,
    private activatedRoute: ActivatedRoute,
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
    this.myFamilyPd.setRelationId(null);
    this.myFamilyPd.setIsNewDependantt(null);
    this.myFamilySrv.getMyFamily().subscribe(res => {
      if (!res.HasError) {
        const resulData = res.Result;
        this.relationTypes = resulData.relationTypes;
        this.guestRelationTypes = resulData.guestRelationTypes;
        this.familyUsers = resulData.familyUsers;
        this.guestUsers = resulData.guestUsers;
        this.activeFamilyUsers = resulData.activeFamilyUsers;
        this.activeGuestUsers = resulData.activeGuestUsers;
        this.familyUsers = this.familyUsers.concat(this.activeFamilyUsers);
        this.guestUsers = this.guestUsers.concat(this.activeGuestUsers);
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
    this.myFamilySrv.addMyFamilyMember(this.addMemberForm.value).subscribe(res => {
      if (!res.HasError) {
        this.familyUsers.push(res.Result);
        this.notificationSrv.showSuccess(res.Message);
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }
  addGuestMember() {
    this.myFamilySrv.addMyFamilyMember(this.addGuestMemberForm.value).subscribe(res => {
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
    const relationId = member.member_relation_id;

    this.myFamilySrv.deleteMyFamilyMember(relationId).subscribe(res => {
      if (!res.HasError) {
        this.notificationSrv.showSuccess(res.Message);
        this.removefromList(index, isGuest);
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
  }
  goToAddNewDependent() {
    this.router.navigate(['../account/family/dependent'], { relativeTo: this.activatedRoute });
  }

  goToEdit(memberRelationId: number, isGuest: boolean) {
    console.log(memberRelationId);
    const cipherRelationId = CryptoJS.AES.encrypt(String(memberRelationId), 'Prox@2019').toString();
    const memberIdparam = encodeURIComponent(cipherRelationId);
    if (isGuest) {
      this.router.navigate([`../account/family/guest-edit/${memberIdparam}`], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate([`../account/family/family-edit/${memberIdparam}`], { relativeTo: this.activatedRoute });
    }
  }
  get email() {
    return this.addMemberForm.get('email');
  }
  get memberEmail() {
    return this.addGuestMemberForm.get('email');
  }
}
