import { Injectable } from '@angular/core';
import { constantURL } from 'src/app/shared/constantURL';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Equipment } from '../models/equipment.model';
import { ClassImprimerequipement } from '../component/imprimer/invoice/class-imprimerequipement';

@Injectable({
  providedIn: 'root'
})
export class ServiceequipementService {
  readonly url: string = constantURL.apiEndpoint+'/api/equipements';
  public equipements:Equipment[];
  equipement:Equipment;
  constructor(private http:HttpClient) { }
  getAllEquipements(): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(this.url);

    
  }
  getAllEquipements2(){

    this.http.get(this.url).toPromise().then(
      res=>{
        this.equipements = res as Equipment[];
      }
    )
  }

  postEquipement(par:Equipment){
    return this.http.post(this.url,par);
  }
  GetTodoItems(etat : boolean){
    return this.http.get<Equipment[]>(this.url+"/sous/"+etat);
  }
  GetTodoItem(){
    return this.http.get<Equipment[]>(this.url+"/equi/");
  }
  put(id,data) {
    return this.http.put(`${this.url}/${id}`, data);
  }
  PostLogin(id){
    console.log(id);
    return this.http.get(this.url+"/select/"+id);
  }
  PostLoginDroit(id){
    console.log(id);
    return this.http.get(this.url+"/selectDroit/"+id);
  }
  deleteService(id){
    return this.http.delete(this.url+"/"+id);
  }
  GetEquipement(id){
    return this.http.get<ClassImprimerequipement>(this.url+"/"+id);
  }
}


