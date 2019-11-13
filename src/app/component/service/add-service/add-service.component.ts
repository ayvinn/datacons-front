import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Service } from '../../../models/service.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../sevice.component';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.sass']
})
export class AddServiceComponent implements OnInit {

  ngOnInit() {
    this.service.service = {
      id: 0,
      Libelle: null
    }
  }
  services: Service[];
  constructor(
    public dialogRef: MatDialogRef<AddServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private service: ServiceService, private toastr: ToastrService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
    if (this.service.service.id == 0) {
      this.service.postService().subscribe(res => {
        this.service.getAllServices();
        this.ngOnInit();
        this.onNoClick();
        this.toastr.success('Service ajouter !');
      },
        err => {
          console.log(err);
        }



      )
    }
    else {
      this.service.postService().subscribe(res => {
        this.service.getAllServices();
      },
        err => {
          console.log(err);
        }



      )
    }


  }


}



