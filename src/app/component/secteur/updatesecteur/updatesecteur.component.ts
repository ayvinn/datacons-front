import { Component, OnInit, Inject } from '@angular/core';
import { ServicesecteurService } from '../../../services/servicesecteur.service';

import { Secteur } from '../../../models/secteur.model';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatesecteur',
  templateUrl: './updatesecteur.component.html',
  styleUrls: ['./updatesecteur.component.sass']
})
export class UpdatesecteurComponent implements OnInit {
  form:FormGroup;
  private toastr: ToastrService;
secteurs:Secteur[];
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatesecteurComponent>,
    private secteur:ServicesecteurService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
      this.createForm();

    }

    onNoClick(): void {
      this.dialogRef.close();
    }
    createForm(){
      this.form = this.formBuilder.group({
          id :[this.data.element.id],
          nomsecteur:[this.data.element.nomsecteur,Validators.required]
      })
      
    }
    get f() { return this.form.controls; }
    update(){
      console.log(this.data.id);
      this.secteur.put(this.data.element.id,this.form.value).subscribe(res=>{
        this.secteur.getAllSecteurs();
        },
        err=>{
          console.log(err);
        })
        this.onNoClick();
        this.ngOnInit();
  }

}
