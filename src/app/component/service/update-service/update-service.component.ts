import { Component, OnInit, Inject } from '@angular/core';
import { ServiceService } from '../../../services/service.service';

import { Service } from '../../../models/service.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.sass']
})
export class UpdateServiceComponent implements OnInit {

  form:FormGroup;
    private toastr: ToastrService;
    services:Service[];
        
    constructor(private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<UpdateServiceComponent>,
      public service:ServiceService,
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
          Libelle:[this.data.element.libelle,Validators.required]
      })
      
    }
    get f() { return this.form.controls; }
    update(){
      console.log(this.data.id);
      this.service.put(this.data.element.id,this.form.value).subscribe(res=>{
          this.service.getAllServices();
        },
        err=>{
          console.log(err);
        })
        this.onNoClick();
        this.ngOnInit();
  }

}
