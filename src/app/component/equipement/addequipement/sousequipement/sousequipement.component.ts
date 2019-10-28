import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';

//import { AddequipementComponent } from './addequipement/addequipement.component';
//import { UpdatedemandeurComponent } from './updatedemandeur/updatedemandeur.component';
import { Equipment } from 'src/app/models/equipment.model';

import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { SousEquipment } from 'src/app/models/sous-equipment.model';
//import { UpdateequipementComponent } from './updateequipement/updateequipement.component';

@Component({
  selector: 'app-sousequipement',
  templateUrl: './sousequipement.component.html',
  styleUrls: ['./sousequipement.component.sass']
})
export class SousequipementComponent implements OnInit {
  sousequipement=new SousEquipment;
  sousequipements:SousEquipment[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private sousequipementser:ServicesousequipementService,public dialog: MatDialog) { }

  ngOnInit() {
    this.sousequipementser.getAllSousEquipments().subscribe(res => {
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

  displayedColumns: string[] = ['id', 'codeHAC','Nomequipement','Emplacement','TypeEnergie','Lieu','IDequipement','action'];
  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
