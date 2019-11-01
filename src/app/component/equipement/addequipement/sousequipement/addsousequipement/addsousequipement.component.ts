import { Component, OnInit, Inject } from '@angular/core';
import { Equipment } from 'src/app/models/equipment.model';
import { SousEquipment } from 'src/app/models/sous-equipment.model';
import { Service } from 'src/app/models/service.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { DialogData } from 'src/app/component/sevice/sevice.component';
import { ServiceService } from 'src/app/services/service.service';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { SousequipementComponent } from '../sousequipement.component';

@Component({
  selector: 'app-addsousequipement',
  templateUrl: './addsousequipement.component.html',
  styleUrls: ['./addsousequipement.component.sass']
})
export class AddsousequipementComponent implements OnInit {
  message: string;
  idEquipement: number;
  form: FormGroup;
  sousequipements: SousEquipment[];
  dataSource;
  constructor(public dialogRef: MatDialogRef<AddsousequipementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private sousequipement: ServicesousequipementService,private data1: DataService, private _formBuilder: FormBuilder,) { }

  ngOnInit() {
  

    this.sousequipement.sousequipement = {
      id: 0,
      CodeHAC: null,
      Nomequipement: null,
      Emplacement: null,
      TypeEnergie: null,
      Lieu: null,
      IDequipement: 0,
      Remarque:null,
      etat:true,
      numero:0

    }
    this.form = this._formBuilder.group({

      CodeHAC: ['', Validators.required],
      Nomequipement: ['', Validators.required],
      Emplacement: ['', Validators.required],
      TypeEnergie: ['', Validators.required],
      Lieu:[''],
      IDequipement:[''],
      Remarque:[''],
      etat:[''],
      numero:0
    });
    
    this.data1.currentMessage.subscribe(id => {
      console.log('ID: ', id);
      this.idEquipement = id;
    }) 
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close();
  }
  //.subscribe(res=>{
  //  this.sousequipement.getAllSousEquipments();
  //  ),
  submit(form: NgForm, formName:string) {
  
    const values = {id:0, CodeHAC: this.form.value.CodeHAC,Nomequipement: this.form.value.Nomequipement,
      Emplacement: this.form.value.Emplacement,TypeEnergie: this.form.value.TypeEnergie,
      IDequipement: this.idEquipement , Lieu: this.form.value.Lieu,
      numero: this.form.value.numero, etat :true,Remarque: this.form.value.Remarque,
    };
    console.log('Submit: ', form.valid );
    if(!form.valid) {
      return;
    }
    if(formName === 'sousequipement'){
      this.sousequipement.postSousEquipment(values).subscribe(res => {
        console.log('Posted: ', res);
       
        this.sousequipement.getAllSousEquipments();
        
      },
        err => {
          console.log(err);
        }
      )
    }
    
    this.ngOnInit();
    this.dialogRef.close();

  }

}