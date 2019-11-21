import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Demandeur } from 'src/app/models/demandeur.model';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatStepper, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DataService } from 'src/app/services/data.service';
import { ConsignationService } from 'src/app/services/consignation.service';
import { DialogData } from '../../service/sevice.component';

@Component({
  selector: 'app-essaie',
  templateUrl: './essaie.component.html',
  styleUrls: ['./essaie.component.sass']
})
export class EssaieComponent implements OnInit {
 
  demandeur;
  demandeurs: Demandeur[];
  demandeurControl: FormControl;
  demandeurForm: FormGroup;
  interval: any;
  model = {};
idconsignation:number;
  message: string;
  returnUrl: string;
  role: string;

  filteredDemandeurs: Observable<Demandeur[]>;
  constructor(public dialogRef: MatDialogRef<EssaieComponent>,private _DemandeurService: ServicedemandeurService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService, 
    private dataService: DataService, 
    private consignationService: ConsignationService, @Inject(MAT_DIALOG_DATA) public data: DialogData ) { }

  ngOnInit() {
    this.getData()
    this.createFormControls();
    this.createForm();
    
    this.dataService.currentDemandeur.subscribe(res => this.demandeur = res);
    this.dataService.allDataConsignation.subscribe();
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }
  getData() {
    this.getDemandeurs();
    this.delay(5000).then(any => {
      this.filterInitemandeurs();
     
    });
  }
  createFormControls() {
    this.demandeurControl = new FormControl('', Validators.required);
  }
  get f() { return this.demandeurForm.controls; }
  createForm() {
    this.demandeurForm = this.formBuilder.group({
      LoginDemandeur: this.demandeurControl,
      PassDemandeur: ['', Validators.required],
    });
  }
  private filterInitemandeurs() {
    this.filteredDemandeurs = this.demandeurControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDemandeur(value))
      );
  }
  private _filterDemandeur(value: string): any[] {
    const filterValue = value != null ? value.toLowerCase() : "";
    return this.demandeurs.filter(e => e.nomcomplet.toLowerCase().includes(filterValue));
  }
  getDemandeurs() {
    this._DemandeurService.getAllDemandeurs().subscribe((res: Demandeur[]) => {
      
      this.demandeurs = res;
    });
  }
  
  verify(): void {
    this._DemandeurService.authLogin(this.demandeurForm.value).subscribe(
      data => {
       
        this.dataService.changeDemandeur(data);
        
        if (data) {
          this.dataService.changeConsignation({idDemandeur: data.id});
          this.data['essaie'] =true;
    this.consignationService.getConsignationEssaie(this.data['id'],this.data).subscribe(res =>  {
      console.log('Update Etat: ', res);
      this.dialogRef.close();
    })
          this.role = data != null ? data.nomcomplet : null;
          this.toastr.success('Opération reussie  ', data.nomcomplet, {timeOut: 500});
          this.ngOnInit();
        } else {
          this.toastr.error('Opération échoué  ', 'mot de passe incorrecte', {timeOut: 1500});
    
        }
      },
     
    );
  }

  connecter(): void {
    if (this.demandeurForm.invalid) {
      return;
    }
    else {
      this.verify();
      
      this.delay(5000).then(any => {
        if (this.role != null) {
          this.returnUrl = '/' + this.role;
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('token', this.demandeurForm.controls['LoginDemandeur'].value);
        }
        else {
          this.message = "Login et Password incorrect !";
        }
      });
    }
  }


}
