import { Injectable } from '@angular/core';
import { constantURL } from '../shared/constantURL';
import { Intervenants } from '../models/intervenants.model';
import { HttpClient } from '@angular/common/http';
import { Intervention } from '../models/intervention.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceintervenantService {
  readonly url: string = constantURL.apiEndpoint+'/api/Intervenants';
 
  public intevenants:Intervenants[];
  intervenant:Intervenants;
  constructor(private http:HttpClient) { }

  GetIntervenants(): Observable<Intervenants[]>{
    return this.http.get<Intervenants[]>(this.url);

    
  }
  GetTodoItems(idconsignation){
    return this.http.get<Intervenants[]>(this.url+"/"+idconsignation);
  }
  PostIntervenants(par){
    return this.http.post(this.url,par);
  }
  
  
  PutIntervenants(id,data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  DeleteIntervenants(id){
    return this.http.delete(this.url+"/"+id);
  }
}
