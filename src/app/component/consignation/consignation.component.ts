import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConsignationService } from 'src/app/services/consignation.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { EssaieComponent } from './essaie/essaie.component';
import { DeconsignationComponent } from './deconsignation/deconsignation.component';
import { PrintserviceService } from 'src/app/services/printservice.service';
import { Consignation } from 'src/app/models/consignation.model';
import { DataService } from 'src/app/services/data.service';
import { PassationComponent } from '../passation/passation.component';

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


  constructor(private consignationService: ConsignationService, public dialog: MatDialog,
    public printService: PrintserviceService,private data : DataService
    ) { }

  ngOnInit() {
    const etat = true;
  }

  ngAfterViewInit() {
    const etat = true;
    this.consignationService.getConsignation(etat).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.totalCount = this.dataSource.data.length
      console.log('Res: ', res);
      console.log('Res essaie: ', res['essaie']);
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
      this.ngAfterViewInit();
    });
  }
  openDialogPassation(elt): void {
    this.data.changeImprimerequipement(elt.idequipment);
    this.data.changeImprimerconsignation(elt.id);
    this.data.changeImprimerdemandeur(elt.iddemandeur);
    const dialogRef = this.dialog.open(PassationComponent, {
      width: '900px',
      autoFocus: false,
      maxHeight: '90vh', //you can adjust the value as per your view
      data: elt
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngAfterViewInit();
    });
  }
  openDialog1deconsignation(elt): void {
    this.data.changeImprimerequipement(elt.idequipment);
    this.data.changeImprimerconsignation(elt.id);
    this.data.changeImprimerdemandeur(elt.iddemandeur);
    const dialogRef = this.dialog.open(
      DeconsignationComponent, {
      width: '900px',
      autoFocus: false,
      data: elt,
      maxHeight: '90vh' //you can adjust the value as per your view
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.ngAfterViewInit();
    });
  }
consignation:Consignation;
  onPrintInvoice(elt) {
    this.data.changeImprimerequipement(elt.idequipment);
    this.data.changeImprimerconsignation(elt.id);
    this.data.changeImprimerdemandeur(elt.iddemandeur);
    const invoiceIds = [elt.idequipment, elt.iddemandeur];
    this.printService
      .printDocument('invoice', invoiceIds);
  }


}
