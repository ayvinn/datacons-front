import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Demandeur } from 'src/app/models/demandeur.model';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  demandeur = new Demandeur;
  demandeurs: Demandeur[];
  demandeurControl:FormControl;
  form : FormGroup;
  filteredDemandeurs: Observable<Demandeur[]>;
  constructor(private _DemandeurService: ServicedemandeurService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getData()
    this.createFormControls();
    this.createForm();
    
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms));
  }
  getData() {
    this.getDemandeurs(); 

      this.delay(1500).then(any=>{
      this.filterInitemandeurs();
    console.log('demp: ',this.demandeurs);
    });
    

  }
  createFormControls() {
    this.demandeurControl = new FormControl('', Validators.required);
  }
  get f() { return this.form.controls; }
  createForm() {
    this.form = this.formBuilder.group({ 

      demandeur:this.demandeurControl,

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
    const filterValue = value!= null ? value.toLowerCase():"";
    return this.demandeurs.filter(e => e.nomcomplet.toLowerCase().includes(filterValue));
  }
  getDemandeurs() {
    this._DemandeurService.getAllDemandeurs().subscribe((res:Demandeur[]) => {
      console.log('dem: ', res);
      this.demandeurs = res;
    });
  }
}
