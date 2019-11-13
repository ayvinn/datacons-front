import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { DataService } from 'src/app/services/data.service';
import { ServiceinterventionService } from 'src/app/services/serviceintervention.service';

import { UpdateinterventionComponent } from '../../updateequipement/updateintervention/updateintervention.component';
import { Lototo } from 'src/app/models/lototo.model';
import { ServicelototoService } from 'src/app/services/servicelototo.service';
import { AddlototoComponent } from './addlototo/addlototo.component';
import { UpdatelototoComponent } from '../../updateequipement/updatelototo/updatelototo.component';

@Component({
  selector: 'app-lototo',
  templateUrl: './lototo.component.html',
  styleUrls: ['./lototo.component.sass']
})
export class LototoComponent implements OnInit {

  lototo=new Lototo;
    lototos:Lototo[];
    idEquipement: number;
    dataSource;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    constructor(private lototoser:ServicelototoService,public dialog: MatDialog,private data1: DataService) { }
  
    ngOnInit() {
      this.data1.currentMessage.subscribe(id => {
        console.log('ID: ', id);
        this.idEquipement = id;
      }) 
      console.log('idequipment :',this.idEquipement);
      this.lototoser.GetTodoItems(this.idEquipement).subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  
    
      });
  
  }
  
  delete(id){
    if(confirm("vous etes sur de supprimer cette lototo ")){
      this.lototoser.deleteService(id).subscribe(res=>{
      this.lototoser.getAllLototos();
      this.ngOnInit();
    })}
  }
  
    displayedColumns: string[] = ['id','numero', 'description','details','action'];
    
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    openDialog(): void {
      const dialogRef = this.dialog.open(AddlototoComponent, {
        width: '700px',
        
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
  
    }
    openDialog1(elt): void {
      const dialogRef = this.dialog.open(UpdatelototoComponent, {
        width: '500px',
       data: {element: elt}
        
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
  
    }
}





