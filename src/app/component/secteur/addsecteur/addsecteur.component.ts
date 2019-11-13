import { Component, OnInit, Inject } from '@angular/core';
import { ServicesecteurService } from '../../../services/servicesecteur.service';

import { Secteur } from '../../../models/secteur.model';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogData } from '../../service/sevice.component';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addsecteur',
  templateUrl: './addsecteur.component.html',
  styleUrls: ['./addsecteur.component.sass']
})
export class AddsecteurComponent implements OnInit {

  secteurForm: FormGroup;
  secteurs: Secteur[];

  constructor(public dialogRef: MatDialogRef<AddsecteurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private secteur: ServicesecteurService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.secteurForm = this.formBuilder.group({
      nomSecteur: ['', Validators.required]
    });
    
  }

  onNoClick(): void {
   
    this.dialogRef.close();
   
  }

  submit(form) {
    if (!form.valid) {
      return;
    }
    this.secteur.postSecteur(form.value).subscribe(res => {
      console.log('Ajouter Post Secteur: ', res);
      this.secteur.getAllSecteurs();
      this.toastr.success('Le secteur a bien été ajouter !', 'Secteur Ajouter !');

    },
      err => {
        console.log(err);
      });
    
      this.onNoClick();
    
  }


}
