import { Component, OnInit, ViewChild } from '@angular/core';
import { Intervention } from 'src/app/models/intervention.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogRef } from '@angular/material';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { DataService } from 'src/app/services/data.service';
import { ServiceinterventionService } from 'src/app/services/serviceintervention.service';
import { AddinterventionComponent } from './addintervention/addintervention.component';
import { UpdateinterventionComponent } from '../../updateequipement/updateintervention/updateintervention.component';
import { AddequipementComponent } from '../addequipement.component';


@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.sass']
})
export class InterventionComponent implements OnInit {

    intervention=new Intervention;
    interventions:Intervention[];
    idEquipement: number;
    dataSource;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    public dialogRef: MatDialogRef<AddequipementComponent>;
    constructor(private interventionser:ServiceinterventionService,public dialog: MatDialog,private data1: DataService) { }
  
    ngOnInit() {
      this.data1.currentMessage.subscribe(id => {
        console.log('ID: ', id);
        this.idEquipement = id;
      }) 
      console.log('idequipment :',this.idEquipement);
      this.interventionser.GetTodoItems(this.idEquipement).subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  
    
      });
  
  }
  
  delete(id){
    if(confirm("vous etes sur de supprimer cette categorie ")){
      this.interventionser.DeleteIntervention(id).subscribe(res=>{
      this.interventionser.GetIntervention();
      this.ngOnInit();
    })}
  }
  
    displayedColumns: string[] = ['id', 'libelle','action'];
    
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    openDialog(): void {
      const dialogRef = this.dialog.open(AddinterventionComponent, {
        width: '700px',
        
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
  
    }
    openDialog1(elt): void {
      const dialogRef = this.dialog.open(UpdateinterventionComponent, {
        width: '500px',
       data: {element: elt}
        
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
  
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    resetid(){
      this.data1.changeMessage(0);
    }
}
