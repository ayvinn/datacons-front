import { Injectable } from '@angular/core';

import { constantURL } from 'src/app/shared/constantURL';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Image } from '../models/image.model';
import { ajax } from 'rxjs/ajax';
@Injectable({
  providedIn: 'root'
})
export class ServiceimageService {
  readonly url: string = constantURL.apiEndpoint+'/api/images';
 
  public images:Image[];
  image:Image;
  constructor(private http:HttpClient) { }

  uploadImage(formData) {
    return ajax.post(`${this.url}`, formData);
  }

  deleteImage(formData) {
    return this.http.post<any>(`${this.url}`, formData)
    
  }
  saveProduct(formData) {
    return this.http.post<any>(`${this.url}`, formData)
    
  }


  getAllImages(): Observable<Image[]>{
    return this.http.get<Image[]>(this.url);

    
  }
  getAllImages2(){

    this.http.get(this.url).toPromise().then(
      res=>{
        this.images = res as Image[];
      }
    )
  }

  postImage(){
    return this.http.post(this.url,this.image);
  }

  put(id,data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteService(id){
    return this.http.delete(this.url+"/"+id);
  }
  GetImagemodification(id){
    return this.http.get<Image[]>(this.url+"/sous/"+id);
  }
}
