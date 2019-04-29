import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService, NotificationService, MyFamilyService, MyFamilyPersistData } from 'src/app/services';
import * as moment from 'moment';

import { RelationType, FamilyUser, EditUser } from 'src/app/models/myFamily.model';
import { GenderModel } from 'src/app/models';
import * as CryptoJS from 'crypto-js';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-family-edit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.less']
})
export class FamilyEditComponent implements OnInit {
  closeResult: string;
  modalReference: NgbModalRef;

  @Input() relationId: number;
  @Input() isActive: boolean;

  // tslint:disable-next-line: ban-types
  @Output() action: EventEmitter<Object> = new EventEmitter<Object>();
  showGender = true;
  addMemberForm: FormGroup;
  relationTypes: RelationType[];
  guestRelationTypes: RelationType[];
  genderList: GenderModel[];
  familyUser: EditUser;

  constructor(
    private modalSvr: NgbModal,

    private fb: FormBuilder,
    private accountSrv: AccountService,
    private myFamilySrv: MyFamilyService,
    private myFamilyPd: MyFamilyPersistData,
    private notificationSrv: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.addMemberForm = this.fb.group(
      {
        member_id: ['', []],
        member_relation_id: ['', []],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        member_relation_type_id: [{ value: 0, disabled: this.showGender }, [Validators.required, Validators.min(1)]],
        gender_id: [0, [Validators.required, Validators.min(1)]],
        isDependent: [false, []],
        birthday: [Date(), [Validators.required]]
      },
      {}
    );
  }

  ngOnInit() {
    console.log(this.isActive);
  }

  editFamilyMember() {
    const formData = this.addMemberForm.getRawValue();
    this.myFamilySrv.putEditMyFamily(formData).subscribe(res => {
      if (!res.HasError) {
        this.returnResult(res.Result, res.Message);
        this.modalReference.close();
        this.getDismissReason('logic');
      } else {
        this.returnResult(null, res.Message);
        this.modalReference.close();
        this.getDismissReason('logic');
      }
    });
  }
  cancel() {
    this.myFamilyPd.setRelationId(null);
    this.myFamilyPd.setIsNewDependantt(null);
    this.router.navigate(['../../family'], { relativeTo: this.activatedRoute });
  }

  // decrypt(ciphertext) {
  //   ciphertext = decodeURIComponent(ciphertext);
  //   const bytes = CryptoJS.AES.decrypt(ciphertext, 'Prox@2019');
  //   const originalText = bytes.toString(CryptoJS.enc.Utf8);
  //   return originalText;
  // }

  open(content) {
    console.log(this.isActive);
    this.genderList = JSON.parse(localStorage.getItem('genderList'));
    this.relationTypes = JSON.parse(localStorage.getItem('familyRelationTypeList'));
    this.guestRelationTypes = JSON.parse(localStorage.getItem('guestRelationTypeList'));

    this.modalReference = this.modalSvr.open(content);

    this.activatedRoute.params.subscribe(params => {
      console.log(`${this.relationId}`);

      if (!isNaN(this.relationId)) {
        this.myFamilySrv.getFamilyMember(this.relationId).subscribe(res => {
          console.log(JSON.stringify(res));
          if (!res.HasError) {
            this.familyUser = res.Result;
            this.showGender = this.familyUser.has_login;
            this.addMemberForm.setValue({
              member_id: this.familyUser.subscriber_member_id,
              member_relation_id: this.familyUser.member_relation_id,
              first_name: this.familyUser.first_name,
              last_name: this.familyUser.last_name,
              member_relation_type_id: this.familyUser.member_relation_type_id,
              gender_id: this.familyUser.gender_id,
              isDependent: false,
              birthday: moment(this.familyUser.date_of_birth).format('YYYY-MM-DD')
            });
          }
        });
      } else {
        this.router.navigate(['../../family'], { relativeTo: this.activatedRoute });
      }
    });

    this.modalReference.result.then(
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

  returnResult(member: FamilyUser, message: string) {
    const result = { member, message };
    this.action.emit(result);
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
