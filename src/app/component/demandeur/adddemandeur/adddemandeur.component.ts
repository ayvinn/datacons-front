import { Component, OnInit, Inject } from '@angular/core';
import { ServicedemandeurService } from '../../../services/servicedemandeur.service';
import { Demandeur } from '../../../models/demandeur.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../service/sevice.component';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/service.model';
import { ServicecategorieService } from 'src/app/services/servicecategorie.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Categorie } from 'src/app/models/categorie.model';

@Component({
  selector: 'app-adddemandeur',
  templateUrl: './adddemandeur.component.html',
  styleUrls: ['./adddemandeur.component.sass']
})
export class AdddemandeurComponent implements OnInit {
  demandeurs: Demandeur[];
  services: Service[];
  demandeurForm: FormGroup;
  categories: Categorie[];
  dataSource;
  constructor(public dialogRef: MatDialogRef<AdddemandeurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private demandeurService: ServicedemandeurService, 
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private categorie: ServicecategorieService) { }

  ngOnInit() {
    this.demandeurForm = this.formBuilder.group({
      nomComplet: ['', Validators.required],
      droit: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      idCategorie: ['', Validators.required],
      idService: ['', Validators.required]
    });

    this.service.getAllServices().subscribe(res => {
      console.log('Serivces: ', res);
      this.services = res;
    });

    this.categorie.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(form) {
    console.log('Form: ', form);
    if(!form.valid) {
      return;
    }

    this.demandeurService.postDemandeur(form.value).subscribe(res => {
      console.log('Post Demandeur: ', res);
      this.onNoClick();
    });
  }
}

