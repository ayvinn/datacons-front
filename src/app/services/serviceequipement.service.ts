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


  postEquipement(){
    return this.http.post(this.url,this.equipement);
  }

  put(id,data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteService(id){
    return this.http.delete(this.url+"/"+id);
  }

}

