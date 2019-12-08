import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ConsignationService } from 'src/app/services/consignation.service';
import { ClassImprimerconsignation } from '../invoice/class-imprimerconsignation';

@Component({
  selector: 'app-printelectricien',
  templateUrl: './printelectricien.component.html',
  styleUrls: ['./printelectricien.component.sass']
})
export class PrintelectricienComponent implements OnInit {

  constructor(private data: DataService,  public consignationser : ConsignationService) { }
  consignation : ClassImprimerconsignation;
  idconsignation;
  nomelectricien;
  ngOnInit() {

    this.data.currentidconsignation.subscribe(id => {
      console.log('ID: ', id);
      this.idconsignation = id;
    })


    this.consignationser.Getconsignationforprint( this.idconsignation).subscribe(res => {
      
      this.consignation = res;
      console.log(this.consignation);
      this.nomelectricien = this.consignation[0].electricien;
    });
  }

}
