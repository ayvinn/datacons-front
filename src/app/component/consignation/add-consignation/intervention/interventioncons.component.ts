import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
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
export class InterventionConsComponent implements OnInit, AfterViewInit {
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
      intervention: [''],
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
  }

  ngAfterViewInit() {
    this.dataService.changeConsignation({ 'Dureeheure': 0 });
    this.dataService.changeConsignation({ 'Duree': 0 });
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

    this.dataService.changeConsignation({ description: form.controls['nature'].value, intervention : form.controls['intervention'].value });
    this.stepper.next();
  }



}
