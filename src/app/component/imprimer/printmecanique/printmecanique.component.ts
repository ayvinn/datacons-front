import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ConsignationService } from 'src/app/services/consignation.service';
import { ClassImprimerconsignation } from '../invoice/class-imprimerconsignation';

@Component({
  selector: 'app-printmecanique',
  templateUrl: './printmecanique.component.html',
  styleUrls: ['./printmecanique.component.sass']
})
export class PrintmecaniqueComponent implements OnInit {

  constructor(private data: DataService, public consignationser: ConsignationService) { }
  consignation: ClassImprimerconsignation;
  idconsignation;
  nommecanique;
  ngOnInit() {

    this.data.currentidconsignation.subscribe(id => {
      console.log('ID: ', id);
      this.idconsignation = id;
    })


    this.consignationser.Getconsignationforprint(this.idconsignation).subscribe(res => {

      this.consignation = res;
      console.log(this.consignation);
      this.nommecanique = this.consignation[0].mecanique;
    });
  }

}

