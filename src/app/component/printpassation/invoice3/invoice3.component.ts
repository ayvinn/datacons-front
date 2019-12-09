import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { DatePipe } from '@angular/common';
import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { PrintserviceService } from 'src/app/services/printservice.service';
import { DataService } from 'src/app/services/data.service';
import { ConsignationService } from 'src/app/services/consignation.service';
import { ClassImprimerequipement } from '../../imprimer/invoice/class-imprimerequipement';
import { ClassImprimerdem } from '../../imprimer/invoice/class-imprimerdem';
import { ClassImprimerconsignation } from '../../imprimer/invoice/class-imprimerconsignation';
import { PrintPassation } from '../print-passation';
import { ServicepassationService } from 'src/app/services/servicepassation.service';

@Component({
  selector: 'app-invoice3',
  templateUrl: './invoice3.component.html',
  styleUrls: ['./invoice3.component.sass'],
  providers: [DatePipe]
})
export class Invoice3Component implements OnInit {

  myDate = new Date();
  test : string;
  invoiceIds: string[];
  
  constructor(route: ActivatedRoute,private demandeurser: ServicedemandeurService,private datePipe: DatePipe, private equipemetser : ServiceequipementService,
    private printService: PrintserviceService , private data: DataService, public consignationser : ConsignationService,
    private servicepassation : ServicepassationService,
    ) {
      this.test = this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm');
    this.invoiceIds = ['123','123'];
  }
  equipement : ClassImprimerequipement;
  demandeur : ClassImprimerdem;
  consignation : ClassImprimerconsignation;
  passation : PrintPassation;
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
  Dem1;
  Dem2;
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
      console.log(this.numerobc);
      this.date = this.consignation[0].datesaisir;
      this.date = this.test;
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

     this.servicepassation.getPassation(this.idconsignation).subscribe(res => {
      this.passation = res;
      console.log(this.passation);
      this.Dem1 = this.passation[0].demandeur1;
      this.Dem2 = this.passation[0].demandeur2;
     });

      this.invoiceDetails = this.invoiceIds
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.invoiceDetails)
      .then(() => this.printService.onDataReady3());
  }


  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }
}
