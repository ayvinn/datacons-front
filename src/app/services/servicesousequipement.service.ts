import { Injectable } from '@angular/core';

import { constantURL } from 'src/app/shared/constantURL';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { SousEquipment } from '../models/sous-equipment.model';


@Injectable({
  providedIn: 'root'
})
export class ServicesousequipementService {
  readonly url: string = constantURL.apiEndpoint+'/api/SousEquipments';
  public soussequipements:SousEquipment[];
  sousequipement:SousEquipment;
  constructor(private http:HttpClient) { }
  getAllSousEquipments(): Observable<SousEquipment[]>{
    return this.http.get<SousEquipment[]>(this.url);

    
  }

  postSousEquipment(){
    return this.http.post(this.url,this.sousequipement);
  }

  put(id,data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteService(id){
    return this.http.delete(this.url+"/"+id);
  }
}
