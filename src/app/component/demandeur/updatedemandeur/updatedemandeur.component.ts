import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServicedemandeurService } from '../../../services/servicedemandeur.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Demandeur } from '../../../models/demandeur.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../../sevice/sevice.component';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/service.model';
import { ServicecategorieService } from 'src/app/services/servicecategorie.service';

@Component({
  selector: 'app-updatedemandeur',
  templateUrl: './updatedemandeur.component.html',
  styleUrls: ['./updatedemandeur.component.sass']
})
export class UpdatedemandeurComponent implements OnInit {
  form: FormGroup;
  private toastr: ToastrService;
  demandeurs: Demandeur[];
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatedemandeurComponent>,
    private demandeur: ServicedemandeurService,
    private service: ServiceService, private categorie: ServicecategorieService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
    this.service.getAllServices2();
    this.categorie.getAllCategories2();
    console.log('Data: ', this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  createForm() {
    this.form = this.formBuilder.group({
      id: [this.data.element.id],
      nomcomplet: [this.data.element.nomcomplet, Validators.required],
      droit: [this.data.element.droit, Validators.required],
      login: [this.data.element.login, Validators.required],
      password: [this.data.element.password, Validators.required],
      Idservice: [this.data.element.idservice, Validators.required],
      Idcategorie: [this.data.element.idcategorie, Validators.required]
    })

  }
  get f() { return this.form.controls; }
  update() {
    console.log(this.demandeur);
    console.log(this.data.id);
    this.demandeur.put(this.data.element.id, this.form.value).subscribe(res => {
      this.demandeur.getAllDemandeurs();
      this.ngOnInit();
    },
      err => {
        console.log(err);
      })
    this.onNoClick();
    
  }

}
