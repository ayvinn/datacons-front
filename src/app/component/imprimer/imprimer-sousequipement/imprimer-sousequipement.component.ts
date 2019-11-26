import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-imprimer-sousequipement',
  templateUrl: './imprimer-sousequipement.component.html',
  styleUrls: ['./imprimer-sousequipement.component.sass']
})
export class ImprimerSousequipementComponent implements OnInit {

  constructor(private data : DataService,private sousequipementser: ServicesousequipementService) { }
  idEquipement;
  dataSource;
  ngOnInit() {
    this.data.currentidequipment.subscribe(id => {
      this.idEquipement = id;
    }) 
    console.log('idequipment :',this.idEquipement);
    this.sousequipementser.GetTodoItems(this.idEquipement).subscribe(res => {
      
      this.dataSource = new MatTableDataSource(res);
      console.log (this.dataSource);
    });


  }

  displayedColumns: string[] = ['numero','nomequipement','codeHAC','emplacement','typeenergie','lieu','remarque'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
