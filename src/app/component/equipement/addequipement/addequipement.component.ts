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


@Component({
  selector: 'app-addequipement',
  templateUrl: './addequipement.component.html',
  styleUrls: ['./addequipement.component.sass']
})
export class AddequipementComponent implements OnInit {
  isLinear = false;
  form: FormGroup;
  secondFormGroup: FormGroup;

  equipements: Equipment[];
  secteurs: Secteur[];
  dataSource;
  constructor(public dialogRef: MatDialogRef<AddequipementComponent>, private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private equipement: ServiceequipementService, private secteur: ServicesecteurService) { }

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
    this.secteur.getAllSecteurs2();
    console.log(this.data);



  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(form: NgForm, formName:string) {
    /*if (this.equipement.equipement.id == 0) {
      console.log(this.equipement);
      this.equipement.postEquipement(this.form.value).subscribe(res => {
        this.equipement.getAllEquipements();
      },
        err => {
          console.log(err);
        }
      )
      this.ngOnInit();
    }
    else {
      this.equipement.postEquipement(this.form.value).subscribe(res => {
        this.equipement.getAllEquipements();
      },
        err => {
          console.log(err);
        }
      )
      this.ngOnInit();
    }*/

    console.log('Submit', form);
    if(formName === 'equipement'){
      this.equipement.postEquipement(this.form.value).subscribe(res => {
        console.log('Posted: ', res);
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
