import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SousEquipment } from 'src/app/models/sous-equipment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdatesousequipementComponent } from 'src/app/component/equipement/updateequipement/updatesousequipement/updatesousequipement.component';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';


@Component({
  selector: 'app-updatesousequipementnotification',
  templateUrl: './updatesousequipementnotification.component.html',
  styleUrls: ['./updatesousequipementnotification.component.sass']
})
export class UpdatesousequipementnotificationComponent implements OnInit {
  formupdatese: FormGroup;
  private toastr: ToastrService;
  sousequipements: SousEquipment[];
  idEquipement: number;
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatesousequipementComponent>,
    private sousequipement: ServicesousequipementService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
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
