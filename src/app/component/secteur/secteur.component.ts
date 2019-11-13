import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';

import { AddsecteurComponent } from './addsecteur/addsecteur.component';
import { UpdatesecteurComponent } from './updatesecteur/updatesecteur.component';
import { Secteur } from 'src/app/models/secteur.model';
import { ServicesecteurService } from 'src/app/services/servicesecteur.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrls: ['./secteur.component.sass']
})
export class SecteurComponent implements OnInit {
  Nomsecteur: string;
  secteurs: Secteur[];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private secteur: ServicesecteurService, public dialog: MatDialog,
    private toastr: ToastrService) { }

  openDialog(): void {

    const dialogRef = this.dialog.open(AddsecteurComponent, {
      width: '400px',
      data: { nomsecteur: this.Nomsecteur }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log('The dialog was closed');
      this.Nomsecteur = result;
      this.ngOnInit();
    });
  }
  openDialog1(element): void {
    console.log(element);

    const dialogRef = this.dialog.open(UpdatesecteurComponent, {
      width: '400px',
      data: { element }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Nomsecteur = result;
      this.ngOnInit();
    });
  }
  delete1: boolean;
  ngOnInit() {
    this.secteur.getAllSecteurs().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

  }



  delete(id, Nomsecteur: string) {
    if (confirm("etes-vous sur de supprimer ce secteur ?  ")) {
      this.secteur.deleteService(id).subscribe(res => {
        this.secteur.getAllSecteurs();
        this.ngOnInit();
      }
      )
    }
  }

  displayedColumns: string[] = ['id', 'Nomsecteur', 'Action'];


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
