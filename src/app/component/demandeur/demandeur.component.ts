import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';

import { AdddemandeurComponent } from './adddemandeur/adddemandeur.component';
import { UpdatedemandeurComponent } from './updatedemandeur/updatedemandeur.component';
import { Demandeur } from 'src/app/models/demandeur.model';

import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';

@Component({
  selector: 'app-demandeur',
  templateUrl: './demandeur.component.html',
  styleUrls: ['./demandeur.component.sass']
})
export class DemandeurComponent implements OnInit {
 demandeur = new Demandeur;
  demandeurs:Demandeur[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private demandeurService:ServicedemandeurService,public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AdddemandeurComponent, {
      width: '700px',
      data: {demandeur:this.demandeur
                                             
      
      
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.demandeur = result;
      this.ngOnInit();
    });
  }

}
