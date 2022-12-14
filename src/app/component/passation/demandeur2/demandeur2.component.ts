import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatStepper, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Demandeur } from 'src/app/models/demandeur.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { startWith, map } from 'rxjs/operators';
import { DialogData } from '../../service/sevice.component';
import { ServicepassationService } from 'src/app/services/servicepassation.service';
import { Passation } from 'src/app/models/passation.model';
import { Consignation } from 'src/app/models/consignation.model';
import { DatePipe } from '@angular/common';
import { ConsignationService } from 'src/app/services/consignation.service';
import { PrintserviceService } from 'src/app/services/printservice.service';

@Component({
  selector: 'app-demandeur2',
  templateUrl: './demandeur2.component.html',
  styleUrls: ['./demandeur2.component.sass'],
  providers: [DatePipe]
})
export class Demandeur2Component implements OnInit {
  @Input() stepper: MatStepper;
  myDate = new Date();
  demandeur;
  demandeurs: Demandeur[];
  consignation : Consignation;
  demandeurControl: FormControl;
  demandeurForm: FormGroup;
  passation : Passation ={
      id :0,
      IDconsignation :undefined,
       IDdemandeur :undefined,
      IDdemandeur2 :undefined,
      Date :undefined,
  };
  interval: any;
  model = {};

  message: string;
  returnUrl: string;
  role: string;

  filteredDemandeurs: Observable<Demandeur[]>;

  constructor(private _DemandeurService: ServicedemandeurService, 
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<Demandeur2Component>,
    private toastr: ToastrService, 
    private dataService: DataService ,
    private consignationService : ConsignationService,
    public passationservice :ServicepassationService,
    public printService: PrintserviceService,
    @Inject(MAT_DIALOG_DATA) public data1: DialogData
    ) { }

  ngOnInit() {
    this.getData()
    this.createFormControls();
    this.createForm();
    this.dataService.currentDemandeur.subscribe(res => this.demandeur = res);
    this.dataService.allDataConsignation.subscribe();
    this.consignation = {
      id:0,
      Description:"",
      Datesaisir:new Date('2017-05-03'),
      Datefin:new Date('2017-05-03'),
      Duree:0,
      Dureeheure:0,
      Etat:"",
      NumberoBC:0,
      Essaie:"",
      IDdemandeur_chef_post:0,
      IDdemendeur_electricien:"",
      idDemendeurMecanicien:0,
      IDdemandeur:0,
      IDequipment:0,
      Intervention: ""

    }
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }
  getData() {
    this.getDemandeurs();
    this.delay(1500).then(any => {
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
       
        this.dataService.changeDemandeur2(data);
        
        if (data) {
          this.dataService.changeConsignation({idDemandeur: data.id});
          this.role = data != null ? data.nomcomplet : null;
          this.passation.IDconsignation = this.data1['id'];
          this.passation.IDdemandeur = this.demandeur.id;
          this.passation.IDdemandeur2 = data.id;
          this.passation.Date = this.myDate;
          this.passationservice.postPassation(this.passation).subscribe(res => {
            console.log('Post Passsation: ', res);
               });
               this.consignation.IDdemandeur =  data.id;
               this.consignationService.putConsignationdem(this.data1['id'], this.consignation).subscribe(res => {
                console.log('Update Etat: ', res);
                this.toastr.success('Op??ration reussie  ', data.nomcomplet, {timeOut: 500});
                const invoiceIds = ["1", "2"];
                this.printService
                  .printDocument3('invoice3', invoiceIds);
              })
          console.log(this.passation);
          
          this.dialogRef.close();
          
        } else {
          this.toastr.error('Op??ration ??chou??  ', 'Mot de passe incorrecte', {timeOut: 1500});
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
          this.message = "Login ou mot de passe incorrect !";
        }
      });
    }
  }

}
