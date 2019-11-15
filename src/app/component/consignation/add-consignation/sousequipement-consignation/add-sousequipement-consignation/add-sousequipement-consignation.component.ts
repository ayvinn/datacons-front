import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SousEquipment } from 'src/app/models/sous-equipment.model';
import { MatDialogRef } from '@angular/material';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { DataService } from 'src/app/services/data.service';
import { SousequipementConsignationComponent } from '../sousequipement-consignation.component';

@Component({
  selector: 'app-add-sousequipement-consignation',
  templateUrl: './add-sousequipement-consignation.component.html',
  styleUrls: ['./add-sousequipement-consignation.component.sass']
})
export class AddSousequipementConsignationComponent implements OnInit {
  idEquipement: number;
  form: FormGroup;
  sousequipements: SousEquipment[];
  dataSource;
  constructor(public dialogRef: MatDialogRef<SousequipementConsignationComponent>,private dataService: DataService, private sousequipement: ServicesousequipementService,private data1: DataService, private _formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.dataService.allDataConsignation.subscribe(async res => {
      console.log('Current:add -sous equipement', res);
      this.idEquipement = res['IDEquipement'];
      console.log("this id " + this.idEquipement);
    });
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
  submit(form, formName:string) {
    const values = {id:0, CodeHAC: this.form.value.CodeHAC,Nomequipement: this.form.value.Nomequipement,
      Emplacement: this.form.value.Emplacement,TypeEnergie: this.form.value.TypeEnergie,
      IDequipement:this.idEquipement , Lieu: this.form.value.Lieu,
      numero: this.form.value.numero, etat :false,Remarque: this.form.value.Remarque,
    };
    if(!form.valid) {
      return;
    }
    console.log(values);
    
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
