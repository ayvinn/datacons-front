import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constantURL } from '../shared/constantURL';

@Injectable({
  providedIn: 'root'
})
export class ConsignationService {

  constructor(private http: HttpClient) { }

  addConsignation(data) {
    console.log('Data Consignation: ', data);
    // console.log('Data Consignation JSON: ', JSON.parse(data));
    return this.http.post(`${constantURL.apiEndpoint}/api/consignations`, data);
  }

  getConsignation(etat) {
    return this.http.get(`${constantURL.apiEndpoint}/api/consignations/etat/${etat}`);
  }
}
