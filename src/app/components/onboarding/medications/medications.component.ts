import { LookupModel } from './../../../models/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.less']
})
export class MedicationsComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();
  public consumingMedication = true;
  public options: Array<any> = new Array<any>();
  public selectedConditions: LookupModel;

  constructor() {
    this.options.push({value: true, description: 'I am not currently taking other medications or supplements'},
    {value: false, description: 'I am taking other medications or supplements'} );
  }

  ngOnInit() {
  }

  userAction(action: string) {
    const step = action === 'back' ? (this.step -= 1) : (this.step += 1);
    this.action.emit(step);
  }

  radioChanged() {
    console.log(this.consumingMedication);
  }


}
