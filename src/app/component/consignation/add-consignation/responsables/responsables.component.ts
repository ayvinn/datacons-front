import { Component, OnInit, Input } from '@angular/core';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { MatStepper } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ConsignationService } from 'src/app/services/consignation.service';
import * as moment from 'moment';

@Component({
  selector: 'app-responsables',
  templateUrl: './responsables.component.html',
  styleUrls: ['./responsables.component.sass']
})
export class ResponsablesComponent implements OnInit {

  @Input() stepper: MatStepper;
  responsableForm: FormGroup;

  charges = [];
  elecs = [];
  mecs = [];
  consignation;

  constructor(private demandeurService: ServicedemandeurService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private consignationService: ConsignationService
  ) { }

  ngOnInit() {
    this.dataService.allDataConsignation.subscribe(res => this.consignation = res);
    this.responsableForm = this.formBuilder.group({
      idDemandeurCP: ['', Validators.required],
      idDemandeurMec: [''],
      idDemandeurElec: ['']
    });
    this.demandeurService.getAllDemandeurs().subscribe((res: []) => {

      console.log('Demandeurs: ', res);
      this.elecs = res.filter((x: any) => x['categorie'] === 'ELEC');
      this.charges = res.filter((x: any) => x['categorie'] === 'Opérateur' || x['categorie'] === 'Chef de poste');
      this.mecs = res.filter((x: any) => x['categorie'] === 'MEC');
      console.log('Charges: ', this.charges);
      console.log('elecs: ', this.elecs);
      console.log('mecs: ', this.mecs);
    });
  }

  goPrevious() {
    this.stepper.previous();
  }

  change(text, type) {
    const data = {};
    data[type] = text;
    this.dataService.changeConsignation(data);
  }

  addConsignation() {
    this.dataService.changeConsignation({ datesaisir: moment(new Date()).format('YYYY/MM/DD HH:mm:ss') });
    console.log('Consignation Resp:', JSON.stringify(this.consignation));
    const data = {
      Duree: this.consignation.Duree,
      Dureeheur: this.consignation.Dureeheur,
      IDEquipment: this.consignation.IDEquipment,
      datesaisir: this.consignation.datesaisir,
      desription: this.consignation.desription,
      idDemandeur: this.consignation.idDemandeur,
      iddemandeurChefPost: this.consignation.iddemandeurChefPost,
      iddemendeurElectricien: this.consignation.iddemendeurElectricien,
      intervention: this.consignation.intervention,
      essaie: false,
      etat: true
    }
    this.consignationService.addConsignation(data)
      .subscribe((res: any) => {
        console.log('Add Consignation: ', res);
        this.dataService.changeConsignation({ id: res.id });
        this.stepper.next();
      });
  }

}
