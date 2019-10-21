import { Injectable } from '@angular/core';

import { constantURL } from 'src/app/shared/constantURL';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class ServicecategorieService {
  readonly url: string = constantURL.apiEndpoint+'/api/categories';
  public services:Categorie[];
  categorie:Categorie;
  constructor( private http:HttpClient) { }
  getAllCategories(): Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.url);

    
  }

  postCategorie(){
    return this.http.post(this.url,this.categorie);
  }

  put(id,data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteService(id){
    return this.http.delete(this.url+"/"+id);
  }
}
