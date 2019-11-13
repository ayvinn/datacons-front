import { Component, OnInit, Inject } from '@angular/core';
import { ServiceequipementService } from '../../../../services/serviceequipement.service';
import { Lototo } from '../../../../models/lototo.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { ServicelototoService } from 'src/app/services/servicelototo.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-updatelototo',
  templateUrl: './updatelototo.component.html',
  styleUrls: ['./updatelototo.component.sass']
})
export class UpdatelototoComponent implements OnInit{
  
  formupdatese: FormGroup;
  private toastr: ToastrService;
  lototos: Lototo[];
  idEquipement: number;
  lototoVal: Lototo[];
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatelototoComponent>,
    private lototoser: ServicelototoService,
    private dataShared: DataService, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
      this.createForm();
      this.lototoser.getAllLototos();
  
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    createForm() {
      this.formupdatese = this.formBuilder.group({
        id: [this.data.element.id],
        numero: [ '4', Validators.required],
        description: ['Isolation' , Validators.required],
        details: [this.data.element.details, Validators.required],
        IDequipement: [this.data.element.idequipement, Validators.required],
      })//
    console.log("create :"+this.formupdatese.value.description);
      
  }
  get f() { return this.formupdatese.controls; }
  update() {
    console.log(this.lototoser);
    console.log("testtt :"+this.formupdatese.value.description);
    this.lototoser.put(this.data.element.id, this.formupdatese.value).subscribe(res => {
      this.lototoser.getAllLototos();
    },
      err => {
        console.log(err);
      })
    this.onNoClick();
    
  }
 
}


