import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServicecategorieService } from '../../../services/servicecategorie.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Categorie } from '../../../models/categorie.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../../sevice/sevice.component';


@Component({
  selector: 'app-addcategorie',
  templateUrl: './addcategorie.component.html',
  styleUrls: ['./addcategorie.component.sass']
})
export class AddcategorieComponent implements OnInit {
  servicecategorie: any;

  ngOnInit() {
    this.servicecategorie.categorie={
      id:0,
      Nomcomplet:null
    }
  }
 categories:Categorie[];
  constructor(
    public dialogRef: MatDialogRef<AddcategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private categorie:ServicecategorieService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(){
    if(this.servicecategorie.categorie.id==0){
      this.categorie.postCategorie().subscribe(res=>{
        this.categorie.getAllCategories();
      },
      err=>{
        console.log(err);
      }



      )
    }
    else{
      this.categorie.postCategorie().subscribe(res=>{
        this.categorie.getAllCategories();
      },
      err=>{
        console.log(err);
      }



      )
    }
      
    
    }
  

}
