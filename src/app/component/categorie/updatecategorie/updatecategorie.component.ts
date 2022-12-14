import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServicecategorieService } from '../../../services/servicecategorie.service';
import { Categorie } from '../../../models/categorie.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-updatecategorie',
  templateUrl: './updatecategorie.component.html',
  styleUrls: ['./updatecategorie.component.sass']
})
export class UpdatecategorieComponent implements OnInit {

  form:FormGroup;
    private toastr: ToastrService;
  categories:Categorie[];
        
    constructor(private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<UpdatecategorieComponent>,
      public categorie:ServicecategorieService,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
    
    
    ngOnInit() {
      this.createForm();

    }

    onNoClick(): void {
      this.dialogRef.close();
    }
    createForm(){
      this.form = this.formBuilder.group({
          id :[this.data.element.id],
          nomcomplet:[this.data.element.nomcomplet,Validators.required]
      })
      
    }
    get f() { return this.form.controls; }
    update(){
      console.log(this.data.id);
      this.categorie.put(this.data.element.id,this.form.value).subscribe(res=>{
        this.categorie.getAllCategories();
        },
        err=>{
          console.log(err);
        })
        this.onNoClick();
        this.ngOnInit();
  }
}
