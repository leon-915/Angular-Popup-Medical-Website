import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup-confirm',
  templateUrl: './signup-confirm.component.html',
  styleUrls: ['./signup-confirm.component.less']
})
export class SignupConfirmComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}
}
