import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Demandeur } from 'src/app/models/demandeur.model';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatStepper, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { DataService } from 'src/app/services/data.service';
import { ConsignationService } from 'src/app/services/consignation.service';
import { DialogData } from '../../service/sevice.component';
import { PrintserviceService } from 'src/app/services/printservice.service';
import { ConfirmprintComponent } from './confirmprint/confirmprint.component';

@Component({
  selector: 'app-deconsignation',
  templateUrl: './deconsignation.component.html',
  styleUrls: ['./deconsignation.component.sass']
})
export class DeconsignationComponent implements OnInit {

  demandeur;
  demandeurs: Demandeur[];
  demandeurControl: FormControl;
  demandeurForm: FormGroup;
  interval: any;
  model = {};
  idconsignation: number;
  message: string;
  returnUrl: string;
  role: string;

  filteredDemandeurs: Observable<Demandeur[]>;
  constructor(public dialogRef: MatDialogRef<DeconsignationComponent>, private _DemandeurService: ServicedemandeurService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public printService: PrintserviceService,
    private toastr: ToastrService,
    private dataService: DataService,
    private consignationService: ConsignationService, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmprintComponent, {
      width: '800px',
      autoFocus: false,
      maxHeight: '90vh', //you can adjust the value as per your view
    });
    dialogRef.afterClosed().subscribe(result => {
      const invoiceIds = ["1", "2"];
      this.printService
        .printDocument2('invoice2', invoiceIds);
      this.ngOnInit()
    });
  }

  verify(): void {
    this._DemandeurService.authLogin(this.demandeurForm.value).subscribe(
      data => {

        this.dataService.changeDemandeur(data);

        if (data) {
         
          this.dataService.changeConsignation({ idDemandeur: data.id });
          console.log("demand", data.id);
          this.checkDemandeurDroit(data.id);
          this.role = data != null ? data.nomcomplet : null;
          this.toastr.success('Opération reussie  ', data.nomcomplet, { timeOut: 500 });
          this.openDialog();
        } else {
          this.toastr.error('Opération échoué  ', 'mot de passe incorrecte', { timeOut: 1500 });
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
  checkDemandeurDroit(iddem : number): void {
console.log(this.data['id']);
    this.consignationService.authdemandeur(this.data['id'], iddem).subscribe(

      data => {
        console.log(this.data['id'], iddem)
        if (data) {
          this.consignationService.deconsigner(this.data['id']).subscribe(res => {
            console.log('Update Etat: ', res);
            this.dialogRef.close();


          })
        }
        else {
          this.toastr.warning("Vous n'etes pas autorisé de deconsigner");
        }
      },
      (error) => {
        this.toastr.error('Opération échoué  ', 'error server');
      }
    );
  }

}
