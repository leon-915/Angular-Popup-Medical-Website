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
import { GenderModel } from 'src/app/models';
import * as moment from 'moment';
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
  genderList: GenderModel[];

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
        member_relation_type_id: [
          { value: 'Dependent', disabled: true },
          [Validators.required, Validators.min(1)]
        ],
        isDependent: [{ value: true, disabled: true }, [Validators.required]],
        birthday: [moment().format('YYYY-MM-DD'), []],
        gender_id: [0, [Validators.required, Validators.min(1)]]
      },
      {}
    );
  }

  ngOnInit() {
    this.genderList = JSON.parse(localStorage.getItem('genderList'));
    this.relationTypes = JSON.parse(
      localStorage.getItem('familyRelationTypeList')
    );
  }

  addDependentMember() {
    const formData = this.addMemberForm.getRawValue();
    console.log(JSON.stringify(formData));

    this.myFamilySrv.addDependent(formData).subscribe(res => {
      if (!res.HasError) {
        this.notificationSrv.showSuccess(res.Message);
        this.router.navigate(['/account/family']);
      } else {
        this.notificationSrv.showError(res.Message);
      }
    });
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
