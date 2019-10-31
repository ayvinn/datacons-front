import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServiceequipementService } from '../../../services/serviceequipement.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Equipment } from '../../../models/equipment.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../../sevice/sevice.component';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/service.model';
import { ServicesecteurService } from 'src/app/services/servicesecteur.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-updateequipement',
  templateUrl: './updateequipement.component.html',
  styleUrls: ['./updateequipement.component.sass']
})
export class UpdateequipementComponent implements OnInit {
  formupdate: FormGroup;
  private toastr: ToastrService;
  
  equipements: Equipment[];
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateequipementComponent>,
    private equipement: ServiceequipementService,
    private secteur: ServicesecteurService,
    private dataShared: DataService,private data1: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
    this.secteur.getAllSecteurs2();
    this.dataShared.currentIdEquipement.subscribe();
    this.dataShared.changeIdEquipement(this.data.element.id);
    console.log('Data: ', this.data);
    this.data1.currentMessage.subscribe();
    this.data1.changeMessage(this.data.element.id);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  createForm() {
    this.formupdate = this.formBuilder.group({
      id: [this.data.element.id],
      CodeHAC: [this.data.element.codeHac, Validators.required],
      Description: [this.data.element.description, Validators.required],
      IDsecteur: [this.data.element.idsecteur, Validators.required],
      etat: [this.data.element.etat, Validators.required],
    })

  }
  get f() { return this.formupdate.controls; }
  update() {
    console.log(this.equipement);
    console.log(this.data.id);

      this.equipement.put(this.data.element.id, this.formupdate.value).subscribe(res => {
      this.equipement.getAllEquipements();
      
      this.ngOnInit();
    },
    
      err => {
        console.log(err);
      })
      
  }

}
