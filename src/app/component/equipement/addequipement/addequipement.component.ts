import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServiceequipementService } from '../../../services/serviceequipement.service';
import { MatTableDataSource, MatStepper } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Equipment } from '../../../models/equipment.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, NgForm, FormControl } from '@angular/forms';
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
  idEquipement;
  etat = new FormControl(true, [
    Validators.required
]);
  equipements: Equipment[];
  secteurs: Secteur[];
  dataSource;
  constructor( private _formBuilder: FormBuilder,
     private equipement: ServiceequipementService, 
     private secteur: ServicesecteurService,
     private data1: DataService,
    ) { }

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
      etat: [true, Validators.required],
    });
   
   
    this.secteur.getAllSecteurs2();
    
    this.data1.currentMessage.subscribe();
  }
  get f() { return this.form.controls; }
  
  submit(form: NgForm, formName:string, stepper: MatStepper) {
    console.log('Submit: ', form.valid );
    if(!form.valid) {
      return;
    }
    if(formName === 'equipement'){
      this.equipement.postEquipement(this.form.value).subscribe(res => {
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
