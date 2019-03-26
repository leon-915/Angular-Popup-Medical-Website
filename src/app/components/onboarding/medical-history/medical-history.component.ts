import { MedicationsService } from './../../../services/medications.service';
import { ConditionsService } from './../../../services/conditions.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AllergiesModel, MedicationModel, ConditionsModel, LookupModel } from 'src/app/models';
import { AllergiesService, OnboardingService, NotificationService } from 'src/app/services';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.less']
})
export class MedicalHistoryComponent implements OnInit {

  @Input() step: number;
  @Output() action: EventEmitter<number> = new EventEmitter<number>();

  public haveAllergies: boolean;
  public haveConditions: boolean;
  public takingMedications: boolean;

  public allergies: AllergiesModel = new AllergiesModel();
  public medications: MedicationModel = new MedicationModel();
  public conditions: ConditionsModel = new ConditionsModel();

  public selectedAllergies: Array<LookupModel> = new Array<LookupModel>();
  public selectedMedications: Array<LookupModel> = new Array<LookupModel>();
  public selectedConditions: Array<LookupModel> = new Array<LookupModel>();

  constructor(
    private allergieSrv: AllergiesService,
    private conditionSrv: ConditionsService,
    private medicationSrv: MedicationsService,
    private onboardingSrv: OnboardingService,
    private notificationSrv: NotificationService,
    private fb: FormBuilder) {
      this.getAllergies();
      this.getConditions();
      this.getMedications();
    }

  ngOnInit() {

  }

  compareWithFunc(a, b) { return a.display_value === b.display_value; }

  userAction(action: string) {
    const step = action === 'back' ? (this.step = 1) : (this.step = 3);
    this.action.emit(step);
  }

  getAllergies() {

    this.allergieSrv.getAllergies().subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.allergies = response.Result;
        console.log(this.allergies);
      }
    });

  }

  getConditions() {

    this.conditionSrv.getConditions().subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.conditions = response.Result;
        console.log(this.conditions);
      }
    }, (error) => { console.log(error); });

  }

  getMedications() {

    this.medicationSrv.getMedicationSupplements().subscribe((response) => {
      console.log(response);
      if (!response.HasError) {
        this.medications = response.Result;
        console.log(this.medications);
      }
    }, (error) => { console.log(error); });

  }

  onChangeAllergies(event) {
    console.log(event);
    console.log(this.haveAllergies);
  }

}
