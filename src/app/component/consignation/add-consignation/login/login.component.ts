import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Demandeur } from 'src/app/models/demandeur.model';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material';
import { AddConsignationComponent } from '../add-consignation.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  @Input() stepper: MatStepper;

  demandeur;
  demandeurs: Demandeur[];
  demandeurControl: FormControl;
  demandeurForm: FormGroup;
  interval: any;
  model = {};

  message: string;
  returnUrl: string;
  role: string;

  filteredDemandeurs: Observable<Demandeur[]>;

  constructor(private _DemandeurService: ServicedemandeurService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService, 
    public ss: AddConsignationComponent,
    private dataService: DataService  ) { }

  ngOnInit() {
    this.getData()
    this.createFormControls();
    this.createForm();
    console.log('Stepper: ', this.stepper);
    this.dataService.currentDemandeur.subscribe(res => this.demandeur = res);
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }
  getData() {
    this.getDemandeurs();
    this.delay(5000).then(any => {
      this.filterInitemandeurs();
      console.log('demp: ', this.demandeurs);
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
      console.log('dem: ', res);
      this.demandeurs = res;
    });
  }
  ;
  verify(stepper: MatStepper): void {

    this._DemandeurService.authLogin(this.demandeurForm.value).subscribe(
      data => {
        console.log('step', stepper);
        console.log('data', data);
        this.dataService.changeDemandeur(data);
        if (data) {
          this.role = data != null ? data.nomcomplet : null;
          this.toastr.success('Opération reussie  ', data.nomcomplet);
          this.ss.goForward(stepper);
        } else {
          this.toastr.error('Opération échoué  ', 'password incorrect');
          stepper.reset();
        }
      },
      (error) => {
        this.toastr.error('Opération échoué  ', 'error server');
      }
    );
  }
  connecter(stepper: MatStepper): void {

    if (this.demandeurForm.invalid) {
      return;
    }
    else {
      this.verify(stepper);
      this.delay(5000).then(any => {
        if (this.role != null) {
          this.returnUrl = '/' + this.role;
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('token', this.demandeurForm.controls['LoginDemandeur'].value);
          // localStorage.setItem('url', this.returnUrl);
          // this.router.navigate([this.returnUrl]);
        }
        else {
          this.message = "Login et Password incorrect !";
        }
      });
    }
  }


}
