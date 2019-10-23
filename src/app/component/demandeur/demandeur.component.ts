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
 demandeur=new Demandeur;
  demandeurs:Demandeur[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private demandeurser:ServicedemandeurService,public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(AdddemandeurComponent, {
      width: '700px',
      
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
      this.ngOnInit();
    });
  }
  openDialog1(elt): void {
    const dialogRef = this.dialog.open(UpdatedemandeurComponent, {
      width: '700px',
      data: {element: elt}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.demandeurser.getAllDemandeurs().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
 
  
    
  }

  delete(id,Nomdem:string){
    if(confirm("vous etes sur de supprimer cette categorie ")){
      this.demandeurser.deleteService(id).subscribe(res=>{
      this.demandeurser.getAllDemandeurs();
      this.ngOnInit();
    })}
  }

    displayedColumns: string[] = ['id', 'Nomcomplet','Droit','login','password','Idservice','Idcategorie','Action'];
    
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
