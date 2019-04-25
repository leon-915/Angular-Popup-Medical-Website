import { Component, OnInit } from '@angular/core';
import { TranslateService } from './../../translator/translate.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-translator-test',
  templateUrl: './translator-test.component.html',
  styleUrls: ['./translator-test.component.less']
})
export class TranslatorTestComponent implements OnInit {
  closeResult: string;
  constructor(private translate: TranslateService, private modalService: NgbModal) {}

  setLang(lang: string) {
    localStorage.setItem('lng', lang);
    this.translate.use();
  }

  ngOnInit() {}

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
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
}
