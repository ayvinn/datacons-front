import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServiceequipementService } from '../../../services/serviceequipement.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Equipment } from '../../../models/equipment.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../../sevice/sevice.component';
import { ServicesecteurService} from 'src/app/services/servicesecteur.service';
import { Secteur } from 'src/app/models/secteur.model';


@Component({
  selector: 'app-addequipement',
  templateUrl: './addequipement.component.html',
  styleUrls: ['./addequipement.component.sass']
})
export class AddequipementComponent implements OnInit {
  equipements:Equipment[];
  secteurs:Secteur[];
    dataSource;
  constructor(public dialogRef: MatDialogRef<AddequipementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private equipement:ServiceequipementService,private secteur:ServicesecteurService) { }

  ngOnInit() {
    this.secteur.getAllSecteurs2();
    
    this.equipement.equipement={
      id:0,
      CodeHAC:null,
      Description:null,
      IDsecteur:0,
      etat:false,
     
  }

}
onNoClick(): void {
  this.dialogRef.close();
}
submit(){
  if(this.equipement.equipement.id==0){
    console.log(this.equipement);
    this.equipement.postEquipement().subscribe(res=>{
      this.equipement.getAllEquipements();
    },
    err=>{
      console.log(err);
    }



    )
  }
  else{
    this.equipement.postEquipement().subscribe(res=>{
      this.equipement.getAllEquipements();
    },
    err=>{
      console.log(err);
    }




    )
    this.ngOnInit();
  }
    
}}
