import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SousEquipment } from 'src/app/models/sous-equipment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';


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
  constructor(public dialogRef: MatDialogRef<AddSousequipementConsignationComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private sousequipement: ServicesousequipementService, private _formBuilder: FormBuilder,) { }

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
    this.form = this._formBuilder.group({

      CodeHAC: ['', Validators.required],
      Nomequipement: ['', Validators.required],
      Emplacement: ['', Validators.required],
      TypeEnergie: ['', Validators.required],
      Lieu:[''],
      Remarque:[''],
      etat:[''],
      numero:['']
    });

  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(form, formName:string) {
    const values = {id:0 ,CodeHAC: this.form.value.CodeHAC,Nomequipement: this.form.value.Nomequipement,
      Emplacement: this.form.value.Emplacement,TypeEnergie: this.form.value.TypeEnergie,
      IDequipement: this.data.idE , Lieu: this.form.value.Lieu,
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
