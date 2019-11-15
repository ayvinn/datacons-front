
import { Injectable } from '@angular/core';

import { constantURL } from 'src/app/shared/constantURL';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';


import { Intervention } from '../models/intervention.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceinterventionService {
  readonly url: string = constantURL.apiEndpoint+'/api/Interventions';
  readonly url2: string = constantURL.apiEndpoint+'/api/Interventions/sous';
  public inteventions:Intervention[];
  intervention:Intervention;
  constructor(private http:HttpClient) { }

  GetIntervention(): Observable<Intervention[]>{
    return this.http.get<Intervention[]>(this.url);

    
  }
  PostIntervention(par:Intervention){
    return this.http.post(this.url,par);
  }
  GetTodoItems(idequipment){
    return this.http.get<Intervention[]>(this.url2+"/"+idequipment);
  }
  
  PutIntervention(id,data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  DeleteIntervention(id){
    return this.http.delete(this.url+"/"+id);
  }
}
