import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';

import { AddequipementComponent } from './addequipement/addequipement.component';
//import { UpdatedemandeurComponent } from './updatedemandeur/updatedemandeur.component';
import { Equipment } from 'src/app/models/equipment.model';

import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { UpdateequipementComponent } from './updateequipement/updateequipement.component';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.sass']
})
export class EquipementComponent implements OnInit {
  equipement=new Equipment;
  equipements:Equipment[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private equipementser:ServiceequipementService,public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddequipementComponent, {
      width: '1000px',
      
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
      this.ngOnInit();
    });
  }
  openDialog1(elt): void {
    const dialogRef = this.dialog.open(UpdateequipementComponent, {
      width: '700px',
      data: {element: elt}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.equipementser.getAllEquipements().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
 
  
    
  }

  delete(id,Nomdem:string){
    if(confirm("vous etes sur de supprimer cette categorie ")){
      this.equipementser.deleteService(id).subscribe(res=>{
      this.equipementser.getAllEquipements();
      this.ngOnInit();
    })}
  }

    displayedColumns: string[] = ['id', 'codeHAC','description','Idsecteur','etat','Action'];
    
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
