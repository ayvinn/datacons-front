import { Component, OnInit, Input } from '@angular/core';
import { MatStepper } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { ServiceinterventionService } from 'src/app/services/serviceintervention.service';
import { Intervention } from 'src/app/models/intervention.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-interventioncons',
  templateUrl: './interventioncons.component.html',
  styleUrls: ['./interventioncons.component.sass']
})
export class InterventionConsComponent implements OnInit {
  @Input() stepper: MatStepper;
  interventions: Intervention[];
  IDEquipement;

  Formintervention: FormGroup;

  constructor(private dataService: DataService,
    public intervention: ServiceinterventionService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.Formintervention = this.formBuilder.group({
      nature: ['', Validators.required],
      idIntervention: ['']
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
