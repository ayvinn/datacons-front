import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ServicelototoService } from 'src/app/services/servicelototo.service';
import { MatTableDataSource } from '@angular/material';
import { Lototo } from 'src/app/models/lototo.model';

@Component({
  selector: 'app-imprimer-loto',
  templateUrl: './imprimer-loto.component.html',
  styleUrls: ['./imprimer-loto.component.sass']
})
export class ImprimerLotoComponent implements OnInit {

  idEquipement: number;
  dataSource;
  lototes : Lototo[];
  constructor(private lototoser: ServicelototoService, private data1: DataService) { }

  ngOnInit() {
    this.data1.currentidequipment.subscribe(id => {
      console.log('ID: ', id);
      this.idEquipement = id;
    })
    console.log('idequipment :', this.idEquipement);
    this.lototoser.GetTodoItems(this.idEquipement).subscribe(res => {
      this.lototes = res;
      console.log(this.lototes);
    });

  }

  displayedColumns: string[] = ['numero', 'description','details'];
    
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
