import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService, NotificationService, MyFamilyService, MyFamilyPersistData } from 'src/app/services';
import * as moment from 'moment';

import { RelationType, FamilyUser, EditUser } from 'src/app/models/myFamily.model';
import { GenderModel } from 'src/app/models';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { TranslateService } from 'src/app/translator/translate.service';
import { ConfirmationStackedModalComponent } from 'src/app/components/common-components/index';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.less']
})
export class AccountProfileComponent implements OnInit {
  closeResult: string;
  modalReference: NgbModalRef;

  @Input() memberId: number;

  // tslint:disable-next-line: ban-types
  profileForm: FormGroup;
  familyUser: EditUser;

  constructor(
    private modalSvr: NgbModal,

    private fb: FormBuilder,
    private accountSrv: AccountService,
    private myFamilySrv: MyFamilyService,
    private notificationSrv: NotificationService,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.profileForm = this.fb.group(
      {
        first_name: [{ value: '', disabled: true }, [Validators.required]],
        last_name: [{ value: '', disabled: true }, [Validators.required]],
        email: [{ value: '', disabled: true }, [Validators.required]]
      },
      {}
    );
  }
  setLang(lang: string) {
    localStorage.setItem('lng', lang);
    this.translate.use();
  }

  ngOnInit() {}

  cancel() {
    this.router.navigate(['../../family'], { relativeTo: this.activatedRoute });
  }

  open(content) {
    if (!isNaN(this.memberId)) {
      this.myFamilySrv.getAccountBasicData(this.memberId).subscribe(res => {
        if (!res.HasError) {
          this.familyUser = res.Result;
          this.profileForm.setValue({
            first_name: this.familyUser.first_name,
            last_name: this.familyUser.last_name,
            email: this.familyUser.email ? this.familyUser.email : ''
          });
        }
      });
    } else {
      this.router.navigate(['../../family'], { relativeTo: this.activatedRoute });
    }

    this.modalReference = this.modalSvr.open(content);

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

  // Getters
  get email() {
    return this.profileForm.get('email');
  }

  get firstName() {
    return this.profileForm.get('first_name');
  }
  get lastName() {
    return this.profileForm.get('last_name');
  }
}
