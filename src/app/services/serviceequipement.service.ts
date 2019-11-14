import { Injectable } from '@angular/core';
import { constantURL } from 'src/app/shared/constantURL';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Equipment } from '../models/equipment.model';

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
  GetTodoItem(etat : boolean){
    return this.http.get<Equipment[]>(this.url+"/equi/"+etat);
  }
  put(id,data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteService(id){
    return this.http.delete(this.url+"/"+id);
  }

}


