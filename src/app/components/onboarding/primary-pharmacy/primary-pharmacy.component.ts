import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-primary-pharmacy',
  templateUrl: './primary-pharmacy.component.html',
  styleUrls: ['./primary-pharmacy.component.less']
})
export class PrimaryPharmacyComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

}
