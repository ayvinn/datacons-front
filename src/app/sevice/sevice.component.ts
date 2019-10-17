import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatTableModule } from '@angular/material';

@Component({
  selector: 'app-sevice',
  templateUrl: './sevice.component.html',
  styleUrls: ['./sevice.component.sass']
})
export class SeviceComponent implements OnInit {

  displayedColumns: string[] = ['id','libelle'];
  dataSource ;
  constructor(private service:ServiceService) { }

  ngOnInit() {
    this.service.getAllServices();
    this.dataSource= new MatTableDataSource(this.service.services);
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
