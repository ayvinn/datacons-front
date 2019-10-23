import { Injectable } from '@angular/core';

import { constantURL } from 'src/app/shared/constantURL';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Secteur } from '../models/secteur.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesecteurService {
  readonly url: string = constantURL.apiEndpoint+'/api/secteurs';
  public secteurs:Secteur[];
  secteur:Secteur;
  constructor(private http:HttpClient) { }

  getAllSecteurs(): Observable<Secteur[]>{
    return this.http.get<Secteur[]>(this.url);

    
  }
  getAllSecteurs2(){

    this.http.get(this.url).toPromise().then(
      res=>{
        this.secteurs = res as Secteur[];
      }
    )
  }

  postSecteur(){
    return this.http.post(this.url,this.secteur);
  }

  put(id,data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteService(id){
    return this.http.delete(this.url+"/"+id);
  }
}

