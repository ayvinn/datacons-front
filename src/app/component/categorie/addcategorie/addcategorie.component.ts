import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServicecategorieService } from '../../../services/servicecategorie.service';
import { Categorie } from '../../../models/categorie.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../service/sevice.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addcategorie',
  templateUrl: './addcategorie.component.html',
  styleUrls: ['./addcategorie.component.sass']
})
export class AddcategorieComponent implements OnInit {

 categories:Categorie[];
  constructor(
    public dialogRef: MatDialogRef<AddcategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public categorie:ServicecategorieService,private toastr:ToastrService) {}
    ngOnInit() {
      this.categorie.categorie={
        id:0,
        Nomcomplet:null
      }
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(){
    if(this.categorie.categorie.id==0){
      this.categorie.postCategorie().subscribe(res=>{
        this.categorie.getAllCategories();
        this.toastr.success('Categorie Ajouter !', '');
        this.ngOnInit();
        this.onNoClick();
      },
      err=>{
        console.log(err);
      }
      )
    }
    else{
      this.categorie.postCategorie().subscribe(res=>{
        this.categorie.getAllCategories();
        this.toastr.success('Categorie Ajouter !', '');
        this.ngOnInit();
        this.onNoClick();
      },
      err=>{
        console.log(err);
      }
      )
    }
      
    
    }
  

}
