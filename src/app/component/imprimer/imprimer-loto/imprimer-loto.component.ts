import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ServicelototoService } from 'src/app/services/servicelototo.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-imprimer-loto',
  templateUrl: './imprimer-loto.component.html',
  styleUrls: ['./imprimer-loto.component.sass']
})
export class ImprimerLotoComponent implements OnInit {

  idEquipement: number;
  dataSource;

  constructor(private lototoser: ServicelototoService, private data1: DataService) { }

  ngOnInit() {
    this.data1.currentidequipment.subscribe(id => {
      console.log('ID: ', id);
      this.idEquipement = id;
    })
    console.log('idequipment :', this.idEquipement);
    this.lototoser.GetTodoItems(this.idEquipement).subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    });

  }

  displayedColumns: string[] = ['numero', 'description','details'];
    
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
