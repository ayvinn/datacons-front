import { Injectable } from '@angular/core';
import { constantURL } from 'src/app/shared/constantURL';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Passation } from '../models/passation.model';
import { PrintPassation } from '../component/printpassation/print-passation';


@Injectable({
  providedIn: 'root'
})
export class ServicepassationService {

  readonly url: string = constantURL.apiEndpoint + '/api/passations';
  public passations: Passation[];
  passation: Passation;
  constructor(private http: HttpClient) { }
  getAllPassations(): Observable<Passation[]> {
    return this.http.get<Passation[]>(this.url);
  }

  postPassation(par) {
    return this.http.post(this.url, par);
  }
  getPassation(id) {
    return this.http.get<PrintPassation>(`${constantURL.apiEndpoint}/api/passations/nom/${id}`);
  }
  put(id, data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deletepassation(id) {
    return this.http.delete(this.url + "/" + id);
  }
}
