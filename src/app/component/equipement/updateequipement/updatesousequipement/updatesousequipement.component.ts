import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { SousEquipment } from '../../../../models/sous-equipment.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../../../sevice/sevice.component';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/service.model';
import { ServicesecteurService } from 'src/app/services/servicesecteur.service';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-updatesousequipement',
  templateUrl: './updatesousequipement.component.html',
  styleUrls: ['./updatesousequipement.component.sass']
})
export class UpdatesousequipementComponent implements OnInit {
  formupdatese: FormGroup;
  private toastr: ToastrService;
  sousequipements: SousEquipment[];
  idEquipement: number;
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatesousequipementComponent>,
    private sousequipement: ServicesousequipementService,
    private equipement: ServiceequipementService,private data1: DataService, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
    this.equipement.getAllEquipements2();
    
    console.log('Data: ', this.data);
    this.data1.currentMessage.subscribe(id => {
      console.log('ID: ', id);
      this.idEquipement = id;
    }) 
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  createForm() {
    this.formupdatese = this.formBuilder.group({
      id: [this.data.element.id],
      CodeHAC: [this.data.element.codeHac, Validators.required],
      Nomequipement: [this.data.element.nomequipement, Validators.required],
      Emplacement: [this.data.element.emplacement, Validators.required],
      TypeEnergie: [this.data.element.typeEnergie, Validators.required],
      Lieu: [this.data.element.lieu, Validators.required],
      IDequipement: [this.data.element.idequipement, Validators.required],
      Remarque: [this.data.element.remarque, Validators.required],
      numero: [this.data.element.numero, Validators.required],
      etat: [this.data.element.etat, Validators.required],
    })
    
}
get f() { return this.formupdatese.controls; }
update() {
  console.log(this.sousequipement);
  console.log(this.data.element.id, this.formupdatese.value);
  this.sousequipement.put(this.data.element.id, this.formupdatese.value).subscribe(res => {
    this.sousequipement.getAllSousEquipments2();
  },
    err => {
      console.log(err);
    })
  this.onNoClick();
  
}

}

