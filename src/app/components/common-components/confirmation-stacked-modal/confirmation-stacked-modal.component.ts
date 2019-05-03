import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-stacked-modal',
  templateUrl: './confirmation-stacked-modal.component.html',
  styleUrls: ['./confirmation-stacked-modal.component.less']
})
export class ConfirmationStackedModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
