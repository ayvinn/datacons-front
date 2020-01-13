import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Intervenants } from 'src/app/models/intervenants.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/component/service/sevice.component';
import { ServiceintervenantService } from 'src/app/services/serviceintervenant.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-addintervenantscons',
  templateUrl: './addintervenantscons.component.html',
  styleUrls: ['./addintervenantscons.component.sass']
})
export class AddintervenantsconsComponent implements OnInit {
  message: string;
  idConsignation: number;
  form: FormGroup;
  intervenants: Intervenants[];
  dataSource;
  constructor(public dialogRef: MatDialogRef<AddintervenantsconsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private intervenantser: ServiceintervenantService,
    private data1: DataService, private _formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      id: [''],
      Nomcomplet: ['', Validators.required],
      Entreprise: ['', Validators.required],
      IDconsignation: [''],
    });

    this.data1.allDataConsignation.subscribe((res: any) => {
      this.idConsignation = res.id;
    });
  }

  get f() { return this.form.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(form) {
    const values = {
      IDconsignation: this.idConsignation, Nomcomplet: this.form.controls['Nomcomplet'].value,
      Entreprise: this.form.controls['Entreprise'].value,
    };
    if (!form.valid) {
      return;
    }
    console.log('Intervenant: ', values);
    this.intervenantser.PostIntervenants(values).subscribe(res => {
      console.log('Posted: ', res);
      this.intervenantser.GetIntervenants();
    },
      err => {
        console.log(err);
      }
    )
    this.ngOnInit();
    this.onNoClick();
  }
}
