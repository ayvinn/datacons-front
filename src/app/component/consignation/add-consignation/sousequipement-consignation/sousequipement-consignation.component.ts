import { Component, OnInit, ViewChild } from '@angular/core';
import { SousEquipment } from 'src/app/models/sous-equipment.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { DataService } from 'src/app/services/data.service';
import { UpdatesousequipementComponent } from 'src/app/component/equipement/updateequipement/updatesousequipement/updatesousequipement.component';
import { AddsousequipementComponent } from 'src/app/component/equipement/addequipement/sousequipement/addsousequipement/addsousequipement.component';

@Component({
  selector: 'app-sousequipement-consignation',
  templateUrl: './sousequipement-consignation.component.html',
  styleUrls: ['./sousequipement-consignation.component.sass']
})
export class SousequipementConsignationComponent implements OnInit {

  sousequipement=new SousEquipment;
  sousequipements:SousEquipment[];
  idEquipement: number;
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private sousequipementser:ServicesousequipementService,public dialog: MatDialog,private data1: DataService) { }

  ngOnInit() {
    this.data1.currentIdEquipement.subscribe(id => {
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

delete(id){
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
