import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AccountService,
  NotificationService,
  MyFamilyService,
  MyFamilyPersistData
} from 'src/app/services';
import { ReCaptchaV3Service } from 'ngx-captcha';
import * as moment from 'moment';

import {
  RelationType,
  FamilyUser,
  EditUser
} from 'src/app/models/myFamily.model';
import { GenderModel } from 'src/app/models';

@Component({
  selector: 'app-family-edit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.less']
})
export class FamilyEditComponent implements OnInit {
  relationId: number;
  isNewDependant = true;
  addMemberForm: FormGroup;
  relationTypes: RelationType[];
  guestRelationTypes: RelationType[];

  genderList: GenderModel[];
  familyUser: EditUser;

  constructor(
    private fb: FormBuilder,
    private accountSrv: AccountService,
    private myFamilySrv: MyFamilyService,
    private myFamilyPd: MyFamilyPersistData,
    private notificationSrv: NotificationService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private router: Router
  ) {
    this.addMemberForm = this.fb.group(
      {
        member_id: ['', []],
        member_relation_id: ['', []],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        member_relation_type_id: [0, [Validators.required, Validators.min(1)]],
        gender_id: [0, [Validators.required, Validators.min(1)]],
        isDependent: [false, []],
        birthday: [Date(), [Validators.required]]
      },
      {}
    );
  }

  ngOnInit() {
    this.relationId = this.myFamilyPd.getRelationId();
    this.isNewDependant = this.myFamilyPd.getIsNewDependant();
    console.log(this.relationId);

    if (!isNaN(this.relationId)) {
      if (!this.isNewDependant) {
        this.myFamilySrv.getEditMyFamily(this.relationId).subscribe(res => {
          if (!res.HasError) {
            const resulData = res.Result;
            this.relationTypes = resulData.relationTypes;
            this.guestRelationTypes = resulData.guestRelationTypes;
            this.familyUser = resulData.memberRelation;
            this.genderList = resulData.genderList;
            console.log(JSON.stringify(resulData));

            this.addMemberForm.setValue({
              member_id: this.familyUser.subscriber_member_id,
              member_relation_id: this.familyUser.member_relation_id,
              first_name: this.familyUser.first_name,
              last_name: this.familyUser.last_name,
              member_relation_type_id: this.familyUser.member_relation_type_id,
              gender_id: this.familyUser.gender_id,
              isDependent: false,
              birthday: moment(this.familyUser.date_of_birth).format(
                'YYYY-MM-DD'
              )
            });
          }
        });
      }
    } else {
      // TODO: redirect to my Fam dashboard
      console.log('exit to myFamily');
      console.log(this.myFamilyPd.getRelationId());
      console.log(this.myFamilyPd.getIsNewDependant());
    }
  }

  editFamilyMember() {
    console.log('editing');
  }
  cancel() {
    this.myFamilyPd.setRelationId(null);
    this.myFamilyPd.setIsNewDependantt(null);
    this.router.navigate(['/account/family']);
  }

  // Getters
  get email() {
    return this.addMemberForm.get('email');
  }

  get firstName() {
    return this.addMemberForm.get('first_name');
  }
  get lastName() {
    return this.addMemberForm.get('last_name');
  }
  get birthday() {
    return this.addMemberForm.get('birthday');
  }
  get isDependent() {
    return this.addMemberForm.get('isDependent').value;
  }
}
