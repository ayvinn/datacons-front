import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Service } from '../models/service.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';



@Component({
  selector: 'app-sevice',
  templateUrl: './sevice.component.html',
  styleUrls: ['./sevice.component.sass']
})
export class SeviceComponent implements OnInit {
  services:Service[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private service:ServiceService) { }

  ngOnInit() {
    this.service.getAllServices().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
    
  }
  
  fillData(item){
    this.service.service.id=item.id;
    this.service.service.Libelle=item.title;
  }

  delete(id){
    this.service.deleteService(id).subscribe(res=>{
      this.service.getAllServices()
    })
  }

    displayedColumns: string[] = ['id', 'libelle'];
    
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
