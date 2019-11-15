import { Component, OnInit, Input } from '@angular/core';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { MatStepper } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

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

  constructor(private demandeurService: ServicedemandeurService,
    private formBuilder: FormBuilder,
    private dataService: DataService
    ) { }

  ngOnInit() {
    this.dataService.allDataConsignation.subscribe();
    this.responsableForm = this.formBuilder.group({
      idDemandeurCP: ['', Validators.required],
      idDemandeurMec: [''],
      idDemandeurElec: ['']
    });
    this.demandeurService.getAllDemandeurs().subscribe((res: []) => { 

      console.log('Demandeurs: ', res);
      res.forEach(element => {
        console.log('Element: ', element['idcategorieNavigation']['nomcomplet']);
        if(element['idcategorieNavigation']['nomcomplet'] === 'ELEC') {
          this.elecs.push(element);
        }

        if(element['idcategorieNavigation']['nomcomplet'] === 'Opérateur' || element['idcategorieNavigation']['nomComplet'] === 'Chef de poste') {
          this.charges.push(element);
        }

        if(element['idcategorieNavigation']['nomcomplet'] === 'MEC') {
          this.mecs.push(element);
        }
      });
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

}
