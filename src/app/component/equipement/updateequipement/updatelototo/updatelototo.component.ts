import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { ServiceequipementService } from '../../../../services/serviceequipement.service';
import { Lototo } from '../../../../models/lototo.model';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { DataService } from 'src/app/services/data.service';
import { ServicelototoService } from 'src/app/services/servicelototo.service';
import { take } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-updatelototo',
  templateUrl: './updatelototo.component.html',
  styleUrls: ['./updatelototo.component.sass']
})
export class UpdatelototoComponent implements OnInit{
  
  formupdate: FormGroup;
  private toastr: ToastrService;
  p1: string;
  p2: string;
  p3: string;
  lototos: Lototo[];
  lototoVal = [];
  idEquipement: number;
  selected = 'det1';

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatelototoComponent>,
    private lototo: ServicelototoService,
    private equipement: ServiceequipementService,
    private dataShared: DataService, private datashared: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  async ngOnInit() {
    // this.lototoVal[0]['numero'] = -1;
    // this.lototoVal[0]['Description'] = '';
    this.formupdate = this.formBuilder.group({
      id: [''],
      numero: [{ value: "", disabled: true }, Validators.required],
      Description: [{ value: "", disabled: true }, Validators.required],
      Details: ['', Validators.required]
    });

    if ("det1" == this.lototoVal[0]){
        this.p1 = "selected";
        this.p2 = "";
        this.p3 = "";

    }
    else if ("det2" == this.lototoVal[0]){
      this.p1 = "";
      this.p2 = "selected";
      this.p3 = "";
    }
    else{
      this.p1 = "";
      this.p2 = "";
      this.p3 = "selected";
    }

    await this.dataShared.currentIdEquipement.pipe(take(1)).toPromise().then(async (id) => {
      console.log('ID Test: ', id);
      this.idEquipement = id;
      await this.lototo.GetTodoItems(id).pipe(take(1)).toPromise().then(res => {
        // this.lototoVal[0].numero = res[0].numero;
        // this.lototoVal[0]['description'] = res[0].Description;
        this.lototoVal = res;
        console.log('res', this.lototoVal);
        //console.log('rdet', this.lototoVal[0].details);
        this.selected=this.lototoVal[0].details;
        this.formupdate.controls['numero'].patchValue(this.lototoVal[0].numero);
        this.formupdate.controls['Description'].patchValue(this.lototoVal[0].description);
        this.formupdate.controls['Details'].patchValue(this.lototoVal[0].details);
       
      });
    });
    
    // this.createForm();
    this.equipement.getAllEquipements2();
  }

 /*  ngAfterViewInit() {
    this.selected = this.lototoVal[0].Details;
    console.log('Selected: ', this.selected);
  } */

  
  onNoClick(): void {
    this.dialogRef.close();
  }

  get f() { return this.formupdate.controls; }
  update(form) {
    console.log(this.lototo);
    console.log(this.data.id);
    this.formupdate.controls['id'].patchValue(this.lototoVal[0].id);
    this.formupdate.controls['numero'].patchValue(this.lototoVal[0].numero);
    this.formupdate.controls['Description'].patchValue(this.lototoVal[0].description);
    this.formupdate.controls['Details'].patchValue(this.selected);
    const loto = {
      'id': this.lototoVal[0].id,
      'numero': this.lototoVal[0].numero,
      'Description': this.lototoVal[0].description,
      'Details': this.selected,
      'idequipement': this.lototoVal[0].idequipement
    };
    console.log('Form: ', form.value);
    console.log('Loto: ', loto);

    this.lototo.put(this.lototoVal[0].id, loto).subscribe(res => {
      console.log('Put: ', res);
      this.lototo.getAllLototos();
      // this.dataShared.changeIdEquipement(res['id']);
      this.ngOnInit();
    },
      err => {
        console.log(err);
      })
  }

  change(event) {
    console.log(event);
    this.selected = event.value;
  }
}
