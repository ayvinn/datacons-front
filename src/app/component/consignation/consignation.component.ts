import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConsignationService } from 'src/app/services/consignation.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { EssaieComponent } from './essaie/essaie.component';
import { DeconsignationComponent } from './deconsignation/deconsignation.component';

@Component({
  selector: 'app-consignation',
  templateUrl: './consignation.component.html',
  styleUrls: ['./consignation.component.sass']
})
export class ConsignationComponent implements OnInit, AfterViewInit {
  h1color = 'red';
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['id', 'date', 'description', 'duree', 'demandeur', 'secteur', 'action'];
  dataSource;
  totalCount;


  constructor(private consignationService: ConsignationService, public dialog: MatDialog) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const etat = true;
    this.consignationService.getConsignation(etat).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.totalCount = this.dataSource.data.length
    });
  }

  applyFilter(filterValue: string) {
    // console.log('Filter Value: ', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(elt): void {
    const dialogRef = this.dialog.open(EssaieComponent, {
      width: '900px',
      autoFocus: false,
      maxHeight: '90vh', //you can adjust the value as per your view
      data: elt
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.ngOnInit();
    });
  }
  openDialog1deconsignation(): void {
    const dialogRef = this.dialog.open(
      DeconsignationComponent, {
      width: '900px',
      autoFocus: false,
      maxHeight: '90vh' //you can adjust the value as per your view
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.ngOnInit();
    });
  }

}
