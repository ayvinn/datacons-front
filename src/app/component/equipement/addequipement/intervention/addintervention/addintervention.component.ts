import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Intervention } from 'src/app/models/intervention.model';
import { ServiceinterventionService } from 'src/app/services/serviceintervention.service';
import { DialogData } from 'src/app/component/service/sevice.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-addintervention',
  templateUrl: './addintervention.component.html',
  styleUrls: ['./addintervention.component.sass']
})
export class AddinterventionComponent implements OnInit {

  message: string;
  idEquipement: number;
  form: FormGroup;
  interventions: Intervention[];
  dataSource;
  constructor(public dialogRef: MatDialogRef<AddinterventionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private intervention: ServiceinterventionService,private data1: DataService, private _formBuilder: FormBuilder,) { }

  ngOnInit() {
  

    this.intervention.intervention = {
      id: 0,
      libelle: null,
      idequipement: 0,
    

    }
    this.form = this._formBuilder.group({

      id: [''],
      libelle: ['', Validators.required],
      idequipement: [''],
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
  submit(form, formName:string) {
  
    const values = {id:0, libelle: this.form.value.libelle, idequipement: this.idEquipement 
    };
   
    if(!form.valid) {
      return;
    }
      this.intervention.PostIntervention(values).subscribe(res => {
        console.log('Posted: ', res);
       
        this.intervention.GetIntervention();
        
      },
        err => {
          console.log(err);
        }
      )
    
    
    this.ngOnInit();
    this.dialogRef.close();

  }

}
