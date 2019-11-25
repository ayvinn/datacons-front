import { Component, OnInit } from '@angular/core';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { ClassImprimerdem } from './class-imprimerdem';
import { DatePipe } from '@angular/common';
import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { ClassImprimerequipement } from './class-imprimerequipement';
import { PrintserviceService } from 'src/app/services/printservice.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

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
    private printService: PrintserviceService , private data: DataService,
    ) {
    this.test = this.datePipe.transform(this.myDate, 'dd/ MM/ yyyy h:mm');
    this.invoiceIds = ['123','123'];
  }
  equipement : ClassImprimerequipement;
  demandeur : ClassImprimerdem;
  iddemandeur;
  idequipment;
  nomDemandeur;
  installation;
  secteur;
  typeConsignation;
  Service_demandeur;
  invoiceDetails: Promise<any>[];
  ngOnInit() {
    this.data.currentidequipment.subscribe(id => {
      console.log('ID: ', id);
      this.idequipment = id;
    }) 
    this.data.currentdemandeur.subscribe(id => {
      console.log('ID: ', id);
      this.iddemandeur = id;
    }) 
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
