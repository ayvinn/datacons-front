import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { HttpClient } from '@angular/common/http';
import { TreeError } from '@angular/compiler';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url:string="http://localhost:52255/api/services";
  public services:Service[];
  service:Service;
  constructor(private http:HttpClient) {}

    getAllServices(){
      this.http.get(this.url).toPromise().then(
        res=>{
          this.services = res as Service[];
        }
      )
    }
  
    postService(){
      return this.http.post(this.url,this.service);
    }
  
    putService(){
      return this.http.put(this.url + "/" + this.service.id,this.service);
    }
  
    deleteService(id){
      return this.http.delete(this.url+"/"+id);
    }
   }
