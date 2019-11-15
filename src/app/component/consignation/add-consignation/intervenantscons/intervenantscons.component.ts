import { Component, OnInit, ViewChild } from '@angular/core';
import { Intervenants } from 'src/app/models/intervenants.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ServiceintervenantService } from 'src/app/services/serviceintervenant.service';
import { DataService } from 'src/app/services/data.service';
import { AddintervenantsconsComponent } from './addintervenantscons/addintervenantscons.component';


@Component({
  selector: 'app-intervenantscons',
  templateUrl: './intervenantscons.component.html',
  styleUrls: ['./intervenantscons.component.sass']
})
export class IntervenantsconsComponent implements OnInit {
  intervenant=new Intervenants;
  intervenants:Intervenants[];
  idConsignation: number;
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private intervenantser:ServiceintervenantService,public dialog: MatDialog,private data1: DataService) { }

  ngOnInit() {
    this.data1.currentConsignation.subscribe(id => {
      console.log('ID: ', id);
      this.idConsignation = id;
    }) 
    console.log('idConsignation :',this.idConsignation);
    this.intervenantser.GetTodoItems(this.idConsignation).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
  
});
}
displayedColumns: string[] = ['id', 'Nomcomplet','entreprise'];
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

openDialog(): void {
  const dialogRef = this.dialog.open(AddintervenantsconsComponent, {
    width: '700px',
    
  });
  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
  });

}}
