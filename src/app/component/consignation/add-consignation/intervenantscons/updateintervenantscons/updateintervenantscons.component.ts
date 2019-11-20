import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Intervenants } from 'src/app/models/intervenants.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceintervenantService } from 'src/app/services/serviceintervenant.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-updateintervenantscons',
  templateUrl: './updateintervenantscons.component.html',
  styleUrls: ['./updateintervenantscons.component.sass']
})
export class UpdateintervenantsconsComponent implements OnInit {

  
  form: FormGroup;
  private toastr: ToastrService;
  intervenants: Intervenants[];
  idconsignation: number;
  
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateintervenantsconsComponent>,
    private interser: ServiceintervenantService,
    private dataShared: DataService, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
      this.createForm();
      this.interser.GetIntervenants();

    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    createForm() {
      this.form = this.formBuilder.group({
        id: [this.data.element.id],
        nomcomplet: [this.data.element.nomcomplet, Validators.required],
        entreprise: [this.data.element.entreprise, Validators.required],
        idconsignation: [this.data.element.idconsignation, Validators.required],
      })
    }
  get f() { return this.form.controls; }
  update() {
    this.interser.PutIntervenants(this.data.element.id, this.form.value).subscribe(res => {
      this.interser.GetIntervenants();
      console.log(res);
    },
    err => {
      console.log(err);
    })
    this.onNoClick();
  }

}
