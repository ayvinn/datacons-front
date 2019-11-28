import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { MatTableDataSource } from '@angular/material';
import { ClassImprimerconsignation } from '../invoice/class-imprimerconsignation';
import { ConsignationService } from 'src/app/services/consignation.service';

@Component({
  selector: 'app-imprimer-sousequipement',
  templateUrl: './imprimer-sousequipement.component.html',
  styleUrls: ['./imprimer-sousequipement.component.sass']
})
export class ImprimerSousequipementComponent implements OnInit {

  constructor(private data : DataService,private sousequipementser: ServicesousequipementService,public consignationser : ConsignationService) { }
  idEquipement;
  idconsignation;
  natureintervention;
  consignation : ClassImprimerconsignation;
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


    this.data.currentidconsignation.subscribe(id => {
      console.log('ID: ', id);
      this.idconsignation = id;
    })

    this.consignationser.Getconsignationforprint( this.idconsignation).subscribe(res => {
      
      this.consignation = res;
      console.log(this.consignation);
      this.natureintervention = this.consignation[0].intervention;

    });

  }

  displayedColumns: string[] = ['numero','nomequipement','codeHAC','typeenergie','lieu','emplacement','remarque'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
