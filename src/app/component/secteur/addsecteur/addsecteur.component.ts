import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServicesecteurService } from '../../../services/servicesecteur.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Secteur } from '../../../models/secteur.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../../sevice/sevice.component';

@Component({
  selector: 'app-addsecteur',
  templateUrl: './addsecteur.component.html',
  styleUrls: ['./addsecteur.component.sass']
})
export class AddsecteurComponent implements OnInit {

secteurs:Secteur[];
  constructor( public dialogRef: MatDialogRef<AddsecteurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private secteur:ServicesecteurService) { }

  ngOnInit() {
    this.secteur.secteur={
      id:0,
      Nomsecteur:null
  }

}
onNoClick(): void {
  this.dialogRef.close();
}
submit(){
  if(this.secteur.secteur.id==0){
    this.secteur.postSecteur().subscribe(res=>{
      this.secteur.getAllSecteurs();
    },
    err=>{
      console.log(err);
    }



    )
  }
  else{
    this.secteur.postSecteur().subscribe(res=>{
      this.secteur.getAllSecteurs();
    },
    err=>{
      console.log(err);
    }



    )
  }
    
  
  }}
