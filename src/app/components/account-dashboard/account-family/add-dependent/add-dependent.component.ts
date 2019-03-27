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

import { RelationType, FamilyUser } from 'src/app/models/myFamily.model';
@Component({
  selector: 'app-add-dependent',
  templateUrl: './add-dependent.component.html',
  styleUrls: ['./add-dependent.component.less']
})
export class AddDependentComponent implements OnInit {
  relationId: number;
  isNewDependant = true;
  addMemberForm: FormGroup;
  relationTypes: RelationType[];
  guestRelationTypes: RelationType[];
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
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        member_relation_type_id: [0, [Validators.required, Validators.min(1)]],
        gender_id: [0, []],
        gender: ['', []],
        isDependent: [{ value: true, disabled: true }, [Validators.required]],
        birthday: [Date(), []]
      },
      {}
    );
  }

  ngOnInit() {
    this.relationId = this.myFamilyPd.getRelationId();
    this.isNewDependant = this.myFamilyPd.getIsNewDependant();
    console.log(this.relationId);
    this.myFamilySrv.getEditMyFamily(0).subscribe(res => {
      if (!res.HasError) {
        console.log(JSON.stringify(res.Result));
        const resulData = res.Result;
        this.relationTypes = resulData.relationTypes.concat(
          resulData.guestRelationTypes
        );
        this.guestRelationTypes = resulData.guestRelationTypes;
      } else {
        // TODO: redirect to my Fam dashboard
        console.log('exit to myFamily');
        console.log(this.myFamilyPd.getRelationId());
        console.log(this.myFamilyPd.getIsNewDependant());
        this.notificationSrv.showError('Error procesing the request');
        this.router.navigate(['/account/family']);
      }
    });
  }

  addDependentMember() {
    const formData = this.addMemberForm.getRawValue();
    console.log(JSON.stringify(formData));
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
