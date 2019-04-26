import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService, NotificationService, MyFamilyService, MyFamilyPersistData } from 'src/app/services';
import { ReCaptchaV3Service } from 'ngx-captcha';

import { RelationType, FamilyUser } from 'src/app/models/myFamily.model';
import * as CryptoJS from 'crypto-js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.less']
})
export class AddMemberComponent implements OnInit {
  closeResult: string;

  isMember = true;

  addMemberForm: FormGroup;
  relationTypes: RelationType[];
  guestRelationTypes: RelationType[];

  familyUsers: FamilyUser[];

  constructor(
    private modalSvr: NgbModal,
    private fb: FormBuilder,
    private myFamilySrv: MyFamilyService,
    private notificationSrv: NotificationService
  ) {
    this.addMemberForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        member_relation_type_id: [0, [Validators.required, Validators.min(1)]]
      },
      {}
    );
  }

  ngOnInit() {
    this.relationTypes = JSON.parse(localStorage.getItem('familyRelationTypeList'));
    this.guestRelationTypes = JSON.parse(localStorage.getItem('guestRelationTypeList'));
  }
  open(content) {
    this.modalSvr.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
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

  clearRelation() {
    this.addMemberForm.patchValue({ member_relation_type_id: 0 });
  }
  get email() {
    return this.addMemberForm.get('email');
  }
  get firstName() {
    return this.addMemberForm.get('firstName');
  }
  get lastName() {
    return this.addMemberForm.get('lastName');
  }
}
