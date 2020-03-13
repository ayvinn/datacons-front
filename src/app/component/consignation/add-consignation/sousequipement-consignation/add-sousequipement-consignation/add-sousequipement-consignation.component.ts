import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SousEquipment } from 'src/app/models/sous-equipment.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { DataService } from 'src/app/services/data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-sousequipement-consignation',
  templateUrl: './add-sousequipement-consignation.component.html',
  styleUrls: ['./add-sousequipement-consignation.component.sass']
})
export class AddSousequipementConsignationComponent implements OnInit {
  idEquipement: number;
  form: FormGroup;
  sousequipements: SousEquipment[];
  dataSource;
  constructor(public dialogRef: MatDialogRef<AddSousequipementConsignationComponent>,
    public data1 : DataService,
    @Inject(MAT_DIALOG_DATA) public data: any, private sousequipement: ServicesousequipementService, private _formBuilder: FormBuilder, ) { }
  test;    
  ngOnInit() {

    this.data1.currentnumero.subscribe(id => {
      this.test = id;
    })

    this.sousequipement.sousequipement = {
      id: 0,
      CodeHAC: null,
      Nomequipement: null,
      Emplacement: null,
      TypeEnergie: null,
      Lieu: null,
      IDequipement: 0,
      Remarque: null,
      etat: true,
      numero: null

    }
    this.form = this._formBuilder.group({

      CodeHAC: ['', Validators.required],
      Nomequipement: ['', Validators.required],
      Emplacement: ['', Validators.required],
      TypeEnergie: ['', Validators.required],
      Lieu: [''],
      Remarque: [''],
      etat: [''],
      numero: ['']
    });

  }
  get f() { return this.form.controls; }
  onNoClick(): void {
    this.dialogRef.close();
  }
  totalCount;
  datasourceupdate(form, formName: string){
    this.sousequipement.GetTodoItems(this.data.idE).subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.totalCount = this.dataSource.data.length;
        this.test = this.totalCount + 1;
        console.log(this.totalCount);
        console.log(this.test)
    this.data1.changenumero(this.test);

    const values = {
      id: 0, CodeHAC: this.form.value.CodeHAC, Nomequipement: this.form.value.Nomequipement,
      Emplacement: this.form.value.Emplacement, TypeEnergie: this.form.value.TypeEnergie,
      IDequipement: this.data.idE, Lieu: this.form.value.Lieu,
      numero: this.test, etat: false, Remarque: this.form.value.Remarque,
    };
    if (!form.valid) {
      return;
    }
    console.log(values);

    if (formName === 'sousequipement') {
      this.sousequipement.postSousEquipment(values).subscribe(res => {
        console.log('Posted: ', res);
        this.sousequipement.getAllSousEquipments();

      },
        err => {
          console.log(err);
        }
      )
    }
    this.ngOnInit();
    this.dialogRef.close();

      });
    
    }

  submit(form, formName: string) {

    this.datasourceupdate(form,formName);
    

    
  }


}
