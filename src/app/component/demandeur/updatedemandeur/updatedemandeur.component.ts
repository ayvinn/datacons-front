import { Component, OnInit, Inject } from '@angular/core';
import { ServicedemandeurService } from '../../../services/servicedemandeur.service';
import { Demandeur } from '../../../models/demandeur.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';
import { ServicecategorieService } from 'src/app/services/servicecategorie.service';
import { Service } from 'src/app/models/service.model';
import { Categorie } from 'src/app/models/categorie.model';

@Component({
  selector: 'app-updatedemandeur',
  templateUrl: './updatedemandeur.component.html',
  styleUrls: ['./updatedemandeur.component.sass']
})
export class UpdatedemandeurComponent implements OnInit {
  form: FormGroup;

  demandeurs: Demandeur[];
  services: Service[];
  categories: Categorie[];

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatedemandeurComponent>,
    public demandeur: ServicedemandeurService,
    private service: ServiceService, private categorie: ServicecategorieService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
    this.service.getAllServices().subscribe(res => {
      this.services = res;
    });


    this.categorie.getAllCategories().subscribe(res => {
      this.categories = res;
    });
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
    });

  }

  get f() { return this.form.controls; }

  update() {
    console.log(this.demandeur);
    console.log(this.data.id);
    this.demandeur.put(this.data.element.id, this.form.value).subscribe(res => {
      console.log('Put demandeur: ', res);
      this.demandeur.getAllDemandeurs();
      this.ngOnInit();
    },
      err => {
        console.log(err);
      })
    this.onNoClick();
  }

}
