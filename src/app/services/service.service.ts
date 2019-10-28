import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { constantURL } from 'src/app/shared/constantURL';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  readonly url: string = constantURL.apiEndpoint + '/api/services';
  public services: Service[];
  service: Service;
  constructor(private http: HttpClient) { }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.url);


  }
  getAllServices2() {

    this.http.get(this.url).toPromise().then(
      res => {
        this.services = res as Service[];
      }
    )
  }

  postService() {
    return this.http.post(this.url, this.service);
  }

  put(id, data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteService(id) {
    return this.http.delete(this.url + "/" + id);
  }

}
