import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';

//import { AddequipementComponent } from './addequipement/addequipement.component';
//import { UpdatedemandeurComponent } from './updatedemandeur/updatedemandeur.component';
import { Equipment } from 'src/app/models/equipment.model';

import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { SousEquipment } from 'src/app/models/sous-equipment.model';
import { AddsousequipementComponent } from './addsousequipement/addsousequipement.component';
import { DataService } from 'src/app/services/data.service';
import { UpdatesousequipementComponent } from '../../updateequipement/updatesousequipement/updatesousequipement.component';
//import { UpdateequipementComponent } from './updateequipement/updateequipement.component';

@Component({
  selector: 'app-sousequipement',
  templateUrl: './sousequipement.component.html',
  styleUrls: ['./sousequipement.component.sass']
})
export class SousequipementComponent implements OnInit {
  sousequipement=new SousEquipment;
  sousequipements:SousEquipment[];
  idEquipement: number;
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private sousequipementser:ServicesousequipementService,public dialog: MatDialog,private data1: DataService) { }

  ngOnInit() {
    this.data1.currentMessage.subscribe(id => {
      console.log('ID: ', id);
      this.idEquipement = id;
    }) 
    console.log('idequipment :',this.idEquipement);
    this.sousequipementser.GetTodoItems(this.idEquipement).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

  
    });

}

delete(id,Nomse:string){
  if(confirm("vous etes sur de supprimer cette categorie ")){
    this.sousequipementser.deleteService(id).subscribe(res=>{
    this.sousequipementser.getAllSousEquipments();
    this.ngOnInit();
  })}
}

  displayedColumns: string[] = ['id', 'codeHAC','nomequipement','emplacement','typeenergie','lieu','idequipement','numero','remarque','action'];
  
  openDialog1(elt): void {
    const dialogRef = this.dialog.open(UpdatesousequipementComponent, {
      width: '700px',
      data: {element: elt}
  })
  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
  });

};

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(AddsousequipementComponent, {
      width: '700px',
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });


  }
}
