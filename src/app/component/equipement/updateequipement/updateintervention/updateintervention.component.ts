import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { Intervention } from 'src/app/models/intervention.model';
import { ServiceinterventionService } from 'src/app/services/serviceintervention.service';

@Component({
  selector: 'app-updateintervention',
  templateUrl: './updateintervention.component.html',
  styleUrls: ['./updateintervention.component.sass']
})
export class UpdateinterventionComponent implements OnInit {

  formupdatese: FormGroup;
  private toastr: ToastrService;
  interventions: Intervention[];
  idEquipement: number;
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateinterventionComponent>,
    private intervention: ServiceinterventionService,
    private data1: DataService, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
    this.intervention.GetIntervention();

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  createForm() {
    this.formupdatese = this.formBuilder.group({
      id: [this.data.element.id],
      libelle: [this.data.element.libelle, Validators.required],
      IDequipement: [this.data.element.idequipement, Validators.required],
    })//
    
}
get f() { return this.formupdatese.controls; }
update() {
  console.log(this.intervention);
  console.log(this.data.element.id, this.formupdatese.value);
  this.intervention.PutIntervention(this.data.element.id, this.formupdatese.value).subscribe(res => {
    this.intervention.GetIntervention();
  },
    err => {
      console.log(err);
    })
  this.onNoClick();
  
}

}
