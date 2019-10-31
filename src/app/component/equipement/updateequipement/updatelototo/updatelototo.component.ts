import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServiceequipementService } from '../../../../services/serviceequipement.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Lototo } from '../../../../models/lototo.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../../../sevice/sevice.component';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/service.model';
import { ServicesecteurService } from 'src/app/services/servicesecteur.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-updatelototo',
  templateUrl: './updatelototo.component.html',
  styleUrls: ['./updatelototo.component.sass']
})
export class UpdatelototoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
