import { Injectable } from '@angular/core';

import { constantURL } from 'src/app/shared/constantURL';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Demandeur } from '../models/demandeur.model';
@Injectable({
  providedIn: 'root'
})
export class ServicedemandeurService {

  readonly url: string = constantURL.apiEndpoint+'/api/demandeurs';
  public demandeurs:Demandeur[];
  demandeur:Demandeur;
  constructor(private http:HttpClient) { }
  getAllDemandeurs(): Observable<Demandeur[]>{
    return this.http.get<Demandeur[]>(this.url);

    
  }

  postDemandeur(){
    return this.http.post(this.url,this.demandeur);
  }

  put(id,data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteService(id){
    return this.http.delete(this.url+"/"+id);
  }
}
