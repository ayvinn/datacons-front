import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ConsignationService } from 'src/app/services/consignation.service';
import { Consignation } from 'src/app/models/consignation.model';
import { ClassImprimerconsignation } from '../invoice/class-imprimerconsignation';

@Component({
  selector: 'app-imprimer-intervention',
  templateUrl: './imprimer-intervention.component.html',
  styleUrls: ['./imprimer-intervention.component.sass']
})
export class ImprimerInterventionComponent implements OnInit {

  constructor(private data: DataService, public consignationser : ConsignationService) { }
  idconsignation;
  natureintervention;
  consignation : ClassImprimerconsignation;
  ngOnInit() {
    this.data.currentidconsignation.subscribe(id => {
      console.log('ID: ', id);
      this.idconsignation = id;
    })

    this.consignationser.Getconsignationforprint( this.idconsignation).subscribe(res => {
      
      this.consignation = res;
      console.log(this.consignation);
      this.natureintervention = this.consignation[0].desription;

    });
  }


}
