import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServicedemandeurService } from '../../../services/servicedemandeur.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Demandeur } from '../../../models/demandeur.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../../sevice/sevice.component';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/service.model';
import { ServicecategorieService } from 'src/app/services/servicecategorie.service';
@Component({
  selector: 'app-adddemandeur',
  templateUrl: './adddemandeur.component.html',
  styleUrls: ['./adddemandeur.component.sass']
})
export class AdddemandeurComponent implements OnInit {
demandeurs:Demandeur[];
services:Service[];
  dataSource;
  constructor(public dialogRef: MatDialogRef<AdddemandeurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private demandeur:ServicedemandeurService,private service:ServiceService,private categorie:ServicecategorieService) { }

  ngOnInit() {

    this.service.getAllServices2();
    this.categorie.getAllCategories2();
    this.demandeur.demandeur={
      id:0,
      Nomcomplet:null,
      Droit:null,
      Login:null,
      password:null,
      IDcategorie:0,
      IDservice:0

  }

}
onNoClick(): void {
  this.dialogRef.close();
}
submit(){
  if(this.demandeur.demandeur.id==0){
    console.log(this.demandeur);
    this.demandeur.postDemandeur().subscribe(res=>{
      this.demandeur.getAllDemandeurs();
    },
    err=>{
      console.log(err);
    }



    )
  }
  else{
    this.demandeur.postDemandeur().subscribe(res=>{
      this.demandeur.getAllDemandeurs();
    },
    err=>{
      console.log(err);
    }



    )
    this.ngOnInit();
  }
    
  
  }}

