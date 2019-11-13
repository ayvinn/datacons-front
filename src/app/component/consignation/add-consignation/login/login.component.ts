import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Demandeur } from 'src/app/models/demandeur.model';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  demandeur = new Demandeur;
  demandeurs: Demandeur[];
  demandeurControl: FormControl;
  demandeurForm: FormGroup;
  interval :any;
  model = {};
  
  message: string;
  returnUrl: string;
  role :string;

  filteredDemandeurs: Observable<Demandeur[]>;

  constructor(private _DemandeurService: ServicedemandeurService, private formBuilder: FormBuilder,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.getData()
    this.createFormControls();
    this.createForm();
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
  get f() { return this. demandeurForm.controls; }
  createForm() {
    this. demandeurForm = this.formBuilder.group({
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
  connecter() : void {
    if (this.demandeurForm.invalid) {
      return;
    }
    else{
      this.verify();
      this.delay(500).then(any=>{ 
        if(this.role != null){
          this.returnUrl = '/'+this.role;
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('token', this.f.LoginUser.value);
          localStorage.setItem('url', this.returnUrl);
          this.router.navigate([this.returnUrl]);
        }
        else{
          this.message = "Login et Password incorrect !";
        }
      });
    }   
  }
  
  verify() : void {
    this._DemandeurService.authLogin(this.demandeurForm.value).subscribe(
      data => { 
        console.log(data);
       // this.role =  data!=null ? data.nomcomplet: null;
      },
      (error) => {
        this.toastr.error('Opération échoué  ', 'error server');
      }
    );
  }
}
