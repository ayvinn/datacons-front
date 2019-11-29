import { Component, OnInit, Inject } from '@angular/core';
import { SousEquipment } from 'src/app/models/sous-equipment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { DialogData } from 'src/app/component/service/sevice.component';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-addsousequipement',
  templateUrl: './addsousequipement.component.html',
  styleUrls: ['./addsousequipement.component.sass']
})
export class AddsousequipementComponent implements OnInit {
  message: string;
  idEquipement: number;
  form: FormGroup;
  numero;
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
      numero:null

    }
    this.numero = 0;
    this.form = this._formBuilder.group({

      CodeHAC: ['', Validators.required],
      Nomequipement: ['', Validators.required],
      Emplacement: ['', Validators.required],
      TypeEnergie: ['', Validators.required],
      Lieu:[''],
      IDequipement:[''],
      Remarque:[''],
      etat:[''],
      numero:['']
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
  test;
  submit(form, formName:string) {  
    this.data1.currentnumero.subscribe(id => {
      this.test = id;
    }) 
    this.test=this.test+1;
    console.log(this.test)
    this.data1.changenumero(this.test);
    const values = {id:0, CodeHAC: this.form.value.CodeHAC,Nomequipement: this.form.value.Nomequipement,
      Emplacement: this.form.value.Emplacement,TypeEnergie: this.form.value.TypeEnergie,
      IDequipement: this.idEquipement , Lieu: this.form.value.Lieu,
      numero: this.test, etat :true,Remarque: this.form.value.Remarque,
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

    this.dialogRef.close();

  }

}
