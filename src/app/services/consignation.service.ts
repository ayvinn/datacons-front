import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constantURL } from '../shared/constantURL';
import { Observable } from 'rxjs';
import { ClassImprimerconsignation } from '../component/imprimer/invoice/class-imprimerconsignation';
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
  getConsignationEssaie(id,data) {
    return this.http.put(`${constantURL.apiEndpoint}/api/consignations/essaie/${id}`,data);
  }
  putConsignationdem(id,data) {
    return this.http.put(`${constantURL.apiEndpoint}/api/consignations/chef/${id}`,data);
  }
  authdemandeur(id,iddemandeur) {
    console.log("demandeur2",iddemandeur)
    return this.http.get(`${constantURL.apiEndpoint}/api/consignations/verifierdemandeur/${id}/${iddemandeur}`);
  }
  deconsigner(id){
    console.log(id);
    return this.http.get(`${constantURL.apiEndpoint}/api/consignations/deconsigne/${id}`)
  }
  Getconsignationforprint(id){
    return this.http.get<ClassImprimerconsignation>(`${constantURL.apiEndpoint}/api/consignations/${id}`);
  }

}
