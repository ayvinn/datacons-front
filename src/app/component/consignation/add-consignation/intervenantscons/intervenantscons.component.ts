import { Component, OnInit, ViewChild } from '@angular/core';
import { Intervenants } from 'src/app/models/intervenants.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ServiceintervenantService } from 'src/app/services/serviceintervenant.service';
import { DataService } from 'src/app/services/data.service';
import { AddintervenantsconsComponent } from './addintervenantscons/addintervenantscons.component';
import { UpdateintervenantsconsComponent } from './updateintervenantscons/updateintervenantscons.component';


@Component({
  selector: 'app-intervenantscons',
  templateUrl: './intervenantscons.component.html',
  styleUrls: ['./intervenantscons.component.sass']
})
export class IntervenantsconsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Nomcomplet', 'entreprise','action'];
  intervenant = new Intervenants;
  intervenants: Intervenants[];
  idConsignation: number;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private intervenantser: ServiceintervenantService, public dialog: MatDialog, private dataS: DataService) { }

  ngOnInit() {
    this.dataS.allDataConsignation.subscribe((res: any) => {
      // console.log('ID: ', res);
      this.idConsignation = res.id;
    })
    console.log('idConsignation :', this.idConsignation);
    if (this.idConsignation) {
      this.intervenantser.GetTodoItems(this.idConsignation).subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    
  }

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

  }
  openDialog1(elt): void {
    console.log(elt);
    const dialogRef = this.dialog.open(UpdateintervenantsconsComponent, {
      width: '700px',
      data: { element: elt }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }
  delete(id){
    if(confirm("vous etes sur de supprimer cet intervenant")){
      this.intervenantser.DeleteIntervenants(id).subscribe(res=>{
      this.intervenantser.GetIntervenants();
      this.ngOnInit();
    })}
}
}