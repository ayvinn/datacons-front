import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServiceequipementService } from '../../../services/serviceequipement.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Equipment } from '../../../models/equipment.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../../sevice/sevice.component';
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
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  idEquipement;
  equipements: Equipment[];
  secteurs: Secteur[];
  dataSource;
  constructor(public dialogRef: MatDialogRef<AddequipementComponent>, private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private equipement: ServiceequipementService, private secteur: ServicesecteurService,private data1: DataService) { }

  ngOnInit() {
    this.equipement.equipement = {
      id: 0,
      CodeHAC: null,
      Description: null,
      etat: false,
      IDsecteur: 0,

    }
    this.form = this._formBuilder.group({

      CodeHAC: ['', Validators.required],
      Description: ['', Validators.required],
      IDsecteur: ['', Validators.required],
      etat: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.secteur.getAllSecteurs2();
    console.log(this.data);
    this.data1.currentMessage.subscribe();
  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(form: NgForm, formName:string) {
    

    console.log('Submit', form);
    if(formName === 'equipement'){
      this.equipement.postEquipement(this.form.value).subscribe(res => {
        console.log('Posted: ', res);
        this.data1.changeMessage(res['id']);
        this.equipement.getAllEquipements();
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
}
