import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ServiceintervenantService } from 'src/app/services/serviceintervenant.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-print-intervenants',
  templateUrl: './print-intervenants.component.html',
  styleUrls: ['./print-intervenants.component.sass']
})
export class PrintIntervenantsComponent implements OnInit {

  NomComplet_: string;
  dataSource;
  idconsignation;
  constructor(private intervenants:ServiceintervenantService, private data: DataService) { }
  



  ngOnInit() {
    this.data.currentidconsignation.subscribe(id => {
      console.log('ID: ', id);
      this.idconsignation = id;
    }) 
    console.log(this.idconsignation);

    this.intervenants.GetTodoItems(this.idconsignation).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      console.log(res);
    });
    
  }


    displayedColumns: string[] = ['NomComplet','entreprise'];
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
