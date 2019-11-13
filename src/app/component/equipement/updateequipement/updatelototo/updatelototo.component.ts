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

  async ngOnInit() {
    this.createForm();
    this.lototoser.getAllLototos();
    await this.dataShared.currentIdEquipement.pipe(take(1)).toPromise().then(async (id) => {
      console.log('ID Test: ', id);
      this.idEquipement = id;
      await this.lototoser.GetTodoItems(id).pipe(take(1)).toPromise().then(res => {
        // this.lototoVal[0].numero = res[0].numero;
        // this.lototoVal[0]['description'] = res[0].Description;
        this.lototoVal = res;
        console.log('res', this.lototoVal);
        console.log('rdet', this.lototoVal[0].Details);
        
        this.formupdatese.controls['numero'].patchValue(this.lototoVal[0].numero);
        this.formupdatese.controls['Description'].patchValue(this.lototoVal[0].Description);
        this.formupdatese.controls['Details'].patchValue(this.lototoVal[0].Details);
       
      });
    });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  createForm() {
    this.formupdatese = this.formBuilder.group({
      id: [this.data.element.id],
      numero: [this.data.element.numero],
      Description: [this.data.element.description, Validators.required],
      Details: [this.data.element.details, Validators.required],
      IDequipement: [this.data.element.idequipement, Validators.required],
    })
    
}
get f() { return this.formupdatese.controls; }
update() {
  console.log(this.lototoser);
  console.log(this.data.element.id, this.formupdatese.value);
  this.lototoser.put(this.data.element.id, this.formupdatese.value).subscribe(res => {
    this.lototoser.getAllLototos();
  },
    err => {
      console.log(err);
    })
  this.onNoClick();
  
}
}
