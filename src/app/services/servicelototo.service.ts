import { Injectable } from '@angular/core';

import { constantURL } from 'src/app/shared/constantURL';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Lototo } from '../models/lototo.model';

@Injectable({
  providedIn: 'root'
})
export class ServicelototoService {
  readonly url: string = constantURL.apiEndpoint+'/api/lototoes';
  readonly url2: string = constantURL.apiEndpoint+'/api/lototoes/sous';
  public lototos:Lototo[];
  lototo:Lototo;
  constructor(private http:HttpClient) { }
  getAllLototos(): Observable<Lototo[]>{
    return this.http.get<Lototo[]>(this.url);

    
  }
  getAllLototos2(){

    this.http.get(this.url).toPromise().then(
      res=>{
        this.lototos = res as Lototo[];
      }
    )
  }
  postLototo(par){
    return this.http.post(this.url,par);
  }

  put(id,data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteService(id){
    return this.http.delete(this.url+"/"+id);
  }
  GetTodoItems(idequipment : number){
    return this.http.get<Lototo[]>(this.url2+"/"+idequipment);
  }
  
}
