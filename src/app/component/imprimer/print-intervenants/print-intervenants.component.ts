import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ServiceintervenantService } from 'src/app/services/serviceintervenant.service';

@Component({
  selector: 'app-print-intervenants',
  templateUrl: './print-intervenants.component.html',
  styleUrls: ['./print-intervenants.component.sass']
})
export class PrintIntervenantsComponent implements OnInit {

  NomComplet_: string;
  dataSource;

  constructor(private intervenants:ServiceintervenantService) { }
  



  ngOnInit() {
    this.intervenants.GetTodoItems(1).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      console.log(res);
    });
    
  }


    displayedColumns: string[] = ['NomComplet','entreprise'];
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
