import { Component, OnInit } from '@angular/core';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { ClassImprimerdem } from './class-imprimerdem';
import { DatePipe } from '@angular/common';
import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { ClassImprimerequipement } from './class-imprimerequipement';
import { PrintserviceService } from 'src/app/services/printservice.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ConsignationService } from 'src/app/services/consignation.service';
import { ClassImprimerconsignation } from './class-imprimerconsignation';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.sass'],
  providers: [DatePipe]
})

export class InvoiceComponent implements OnInit {
  myDate = new Date();
  test : string;
  invoiceIds: string[];
  
  constructor(route: ActivatedRoute,private demandeurser: ServicedemandeurService,private datePipe: DatePipe, private equipemetser : ServiceequipementService,
    private printService: PrintserviceService , private data: DataService, public consignationser : ConsignationService
    ) {
    this.test = this.datePipe.transform(this.myDate, 'dd/ MM/ yyyy h:mm');
    this.invoiceIds = ['123','123'];
  }
  equipement : ClassImprimerequipement;
  demandeur : ClassImprimerdem;
  consignation : ClassImprimerconsignation;
  iddemandeur;
  numerobc;
  idequipment;
  nomDemandeur;
  installation;
  secteur;
  date;
  typeConsignation;
  Service_demandeur;
  idconsignation;
  invoiceDetails: Promise<any>[];
  ngOnInit() {
    this.data.currentidconsignation.subscribe(id => {
      console.log('ID: ', id);
      this.idconsignation = id;
    })

    this.data.currentidequipment.subscribe(id => {
      console.log('ID: ', id);
      this.idequipment = id;
    }) 
    this.data.currentdemandeur.subscribe(id => {
      console.log('ID: ', id);
      this.iddemandeur = id;
    }) 
    this.consignationser.Getconsignationforprint( this.idconsignation).subscribe(res => {
      
      this.consignation = res;
      console.log(this.consignation);
      this.numerobc = this.consignation[0].numeroBc;
      this.date = this.consignation[0].datesaisir;
      this.date = this.datePipe.transform(this.date, 'dd/ MM/ yyyy h:mm');
    });
    this.demandeurser.GetDemandeur(this.iddemandeur).subscribe(res => {
      this.demandeur = res;
      this.nomDemandeur = this.demandeur[0].nomcomplet;
      this.typeConsignation = this.demandeur[0].droit;
      this.Service_demandeur = this.demandeur[0].service;
    });
    this.equipemetser.GetEquipement(this.idequipment).subscribe(res => {
      this.equipement = res;
      this.installation = this.equipement[0].description;
      this.secteur = this.equipement[0].secteur;
      });

      this.invoiceDetails = this.invoiceIds
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.invoiceDetails)
      .then(() => this.printService.onDataReady());
  }

  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }
}
