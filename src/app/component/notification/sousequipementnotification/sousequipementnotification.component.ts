import { Component, OnInit, ViewChild } from '@angular/core';
import { SousEquipment } from 'src/app/models/sous-equipment.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { DataService } from 'src/app/services/data.service';
import { UpdatesousequipementnotificationComponent } from '../sousequipementnotification/updatesousequipementnotification/updatesousequipementnotification.component';

@Component({
  selector: 'app-sousequipementnotification',
  templateUrl: './sousequipementnotification.component.html',
  styleUrls: ['./sousequipementnotification.component.sass']
})
export class SousequipementnotificationComponent implements OnInit {
  sousequipement=new SousEquipment;
  sousequipements:SousEquipment[] = [];
  idEquipement: number;
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  totalCount=0;
  constructor(private sousequipementser:ServicesousequipementService,public dialog: MatDialog,private data1: DataService) { }

  ngOnInit() {
    this.data1.currentMessage.subscribe(id => {
      console.log('ID: ', id);
      this.idEquipement = id;
    }) 
    console.log('idequipment :',this.idEquipement);
    this.sousequipementser.GetSousEquipmentfalse(false).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.totalCount = this.dataSource.data.length
    });
    this.sousequipements = this.dataSource;
  
}

delete(id){
  if(confirm("vous etes sur de supprimer cette categorie ")){
    this.sousequipementser.deleteService(id).subscribe(res=>{
    this.sousequipementser.getAllSousEquipments();
    this.ngOnInit();
  })}
}

  displayedColumns: string[] = ['id', 'codeHAC','nomequipement','emplacement','typeenergie','lieu','idequipement','numero','remarque','action'];
  
  openDialog1(elt): void {
    const dialogRef = this.dialog.open(UpdatesousequipementnotificationComponent, {
      width: '800px',
      data: { element: elt }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.ngOnInit();
    });
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
