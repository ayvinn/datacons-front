import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConsignationService } from 'src/app/services/consignation.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-consignation',
  templateUrl: './consignation.component.html',
  styleUrls: ['./consignation.component.sass']
})
export class ConsignationComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = ['id', 'date', 'description', 'duree', 'demandeur', 'secteur', 'action'];
  dataSource;
  totalCount;


  constructor(private consignationService: ConsignationService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    const etat = true;
    this.consignationService.getConsignation(etat).subscribe((res:any) => {
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

}
