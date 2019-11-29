import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ConsignationService } from 'src/app/services/consignation.service';
import { ClassImprimerconsignation } from '../invoice/class-imprimerconsignation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.sass']
})
export class SignatureComponent implements OnInit {

  constructor(private data : DataService,public consignationser : ConsignationService,private datePipe: DatePipe) { }
idconsignation;
date;
consignation : ClassImprimerconsignation;
  ngOnInit() {
    this.data.currentidconsignation.subscribe(id => {
      console.log('ID: ', id);
      this.idconsignation = id;
    })
    this.consignationser.Getconsignationforprint( this.idconsignation).subscribe(res => {
      
      this.consignation = res;
      console.log(this.consignation);
      this.date = this.consignation[0].datesaisir;
      this.date = this.datePipe.transform(this.date, 'dd/ MM/ yyyy h:mm');
    });
  }

}
