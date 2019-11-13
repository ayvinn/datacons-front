import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServicelototoService } from 'src/app/services/servicelototo.service';
import { MatTableDataSource, MatStepper } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Lototo } from 'src/app/models/lototo.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';




@Component({
  selector: 'app-addlototo',
  templateUrl: './addlototo.component.html',
  styleUrls: ['./addlototo.component.sass']
})
export class AddlototoComponent implements OnInit {
  lototos: Lototo[];
  message: string;
  formlototo: FormGroup;
  dataSource;
  idEquipement: number;
 
  constructor(private _formBuilder: FormBuilder, private lototo: ServicelototoService, private data1: DataService) { }

  ngOnInit() {
    this.lototo.lototo = {
      id: 0,
      numero: 0,
      Description: null,
      Details: null,
      IDequipement: 0

    }
    this.data1.currentMessage.subscribe(id => {
      console.log('ID: ', id);
      this.idEquipement = id;
    })
    this.formlototo = this._formBuilder.group({

      numero: [{ value: '4', disabled: true }, Validators.required],
      Description: [{ value: 'Isolation', disabled: true }, Validators.required],
      Details: ['', Validators.required]

    });

    this.formlototo.controls['Description'].patchValue('Isolation');
    this.formlototo.controls['numero'].patchValue(4);
  }
  get f() { return this.formlototo.controls; }
 
  submit(form) {
    const values = {
      Idequipement: this.idEquipement, numero: this.formlototo.controls['numero'].value,
      Description: this.formlototo.controls['Description'].value,
      Details: this.formlototo.controls['Details'].value
    };
    console.log('Submit: ', values);
    if (!form.valid) {
      return;
    }

    this.lototo.postLototo(values).subscribe(res => {
      console.log('Lototo: ', res);
      //this.data1.changeMessage(res['id']);
      this.lototo.getAllLototos();
    },
      err => {
        console.log(err);
      }
    )


    this.ngOnInit();

  }

  change(event) {
    console.log(event.value);
  }

}
