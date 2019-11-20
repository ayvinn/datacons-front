import { Component, OnInit } from '@angular/core';
import { ServiceequipementService } from '../../../services/serviceequipement.service';
import { MatStepper, MatDialogRef } from '@angular/material';

import { Equipment } from '../../../models/equipment.model';
import { FormGroup, Validators, FormBuilder, NgForm, FormControl } from '@angular/forms';
import { ServicesecteurService } from 'src/app/services/servicesecteur.service';
import { Secteur } from 'src/app/models/secteur.model';
import { DataService } from "src/app/services/data.service";


@Component({
  selector: 'app-addequipement',
  templateUrl: './addequipement.component.html',
  styleUrls: ['./addequipement.component.sass']
})
export class AddequipementComponent implements OnInit {

  isLinear = false;
  form: FormGroup;
  idEquipement;
  etat = new FormControl(true, [
    Validators.required
]);
  equipements: Equipment[];
  secteurs: Secteur[];
  dataSource;
  constructor( public dialogRef: MatDialogRef<AddequipementComponent>,
     private _formBuilder: FormBuilder,
     private equipement: ServiceequipementService, 
     public secteur: ServicesecteurService,
     private data1: DataService,
    ) { }

  ngOnInit() {
    this.equipement.equipement = {
      id: 0,
      CodeHAC: null,
      Description: null,
      etat: true,
      IDsecteur: 0,
    }
    this.form = this._formBuilder.group({

      CodeHAC: ['', Validators.required],
      Description: ['', Validators.required],
      IDsecteur: ['', Validators.required],
      etat:['']
    });
   
   
    this.secteur.getAllSecteurs2();
    
    this.data1.currentMessage.subscribe();
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(form, formName:string, stepper: MatStepper) {
    const values = {id:0, CodeHAC: this.form.value.CodeHAC,
      Description: this.form.value.Description,
      etat :true, IDsecteur:this.form.value.IDsecteur
    };
    console.log('Submit: ', form.valid );
    if(!form.valid) {
      return;
    }
    if(formName === 'equipement'){
      this.equipement.postEquipement(values).subscribe(res => {
        console.log('Posted: ', res);
        this.data1.changeMessage(res['id']);
        this.equipement.getAllEquipements();
        stepper.next();
      },
        err => {
          console.log(err);
        }
      )
    }
    this.ngOnInit();
  }

  test() {
    console.log(this.form.value);
  }

  goPrevious(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    console.log('next');
    stepper.next();
  }
}
