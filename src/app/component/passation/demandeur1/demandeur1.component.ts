import { Component, OnInit, Input } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Demandeur } from 'src/app/models/demandeur.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-demandeur1',
  templateUrl: './demandeur1.component.html',
  styleUrls: ['./demandeur1.component.sass']
})
export class Demandeur1Component implements OnInit {



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
    private dataService: DataService  ) { }

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
       
        this.dataService.changeDemandeur(data);
        
        if (data) {
          this.dataService.changeConsignation({idDemandeur: data.id});
          this.role = data != null ? data.nomcomplet : null;
          this.toastr.success('Opération reussie  ', data.nomcomplet, {timeOut: 500});
          this.stepper.next();
        } else {
          this.toastr.error('Opération échoué  ', 'mot de passe incorrecte', {timeOut: 1500});
          this.stepper.reset();
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