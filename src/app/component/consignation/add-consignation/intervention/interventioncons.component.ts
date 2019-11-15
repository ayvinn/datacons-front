import { Component, OnInit, Input } from '@angular/core';
import { MatStepper } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { ServiceinterventionService } from 'src/app/services/serviceintervention.service';
import { Intervention } from 'src/app/models/intervention.model';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { take, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-interventioncons',
  templateUrl: './interventioncons.component.html',
  styleUrls: ['./interventioncons.component.sass']
})
export class InterventionConsComponent implements OnInit {
  @Input() stepper: MatStepper;
  interventions: Intervention[];
  IDEquipement;
  interventionControl: FormControl;
  filteredInterventions: Observable<Intervention[]>;

  Formintervention: FormGroup;

  constructor(private dataService: DataService,
    public intervention: ServiceinterventionService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.Formintervention = this.formBuilder.group({
      nature: ['', Validators.required],
      idIntervention: [''],
      nature2: ['']
    });

    


    this.dataService.allDataConsignation.subscribe(async res => {
      console.log('Current Consignation Intervention: ', res);
      this.IDEquipement = res['IDEquipement'];
      // console.log('ID Equipement Intervention: ', this.IDEquipement);
      if (this.IDEquipement) {
        await this.intervention.GetTodoItems(this.IDEquipement).pipe(take(1)).toPromise().then(res => {
          console.log('inter: ', res);
          this.interventions = res;
        });
      }

    });

    // this.dataService.allDataConsignation.subscribe(res => {
    //   console.log('All Data: ', res);
    // });

    /*this.dataService.currentSelectedIDEquip.subscribe(res => {
      console.log('id', res);
      //this.IDEquipement = res
    });*/
    this.getData();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }
 
  getData() {
    this.getintervention();
    this.delay(5000).then(any => {
      this.filterInitemandeurs();
      console.log('demp: ', this.interventions);
    });
  }

  private filterInitemandeurs() {
    this.filteredInterventions = this.interventionControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterIntervetion(value))
      );
  }
  getintervention(){

    this.dataService.allDataConsignation.subscribe(async res => {
      console.log('Current Consignation Intervention: ', res);
      this.IDEquipement = res['IDEquipement'];
      // console.log('ID Equipement Intervention: ', this.IDEquipement);
      if (this.IDEquipement) {
        await this.intervention.GetTodoItems(this.IDEquipement).pipe(take(1)).toPromise().then(res => {
          console.log('inter: ', res);
          this.interventions = res;
        });
      }

    });

  }
  private _filterIntervetion(value: string): any[] {
    const filterValue = value != null ? value.toLowerCase() : "";
    return this.interventions.filter(e => e.libelle.toLowerCase().includes(filterValue));
  }


  change(text) {
    // console.log('Libelle: ', text);
    this.dataService.changeConsignation({ intervention: text });
  }

  pitch(event, type) {
    // console.log('Slider: ', event);
    const data = {};
    data[type] = event.value;
    this.dataService.changeConsignation(data);
  }

  submit(form) {
    if (!form.valid) {
      return;
    }

    this.dataService.changeConsignation({ description: form.controls['nature'].value });
    this.stepper.next();
  }

}
