import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private messageSource = new BehaviorSubject<number>(-1);
  currentMessage = this.messageSource.asObservable();

  private idEquipement = new BehaviorSubject<number>(-1);
  currentIdEquipement = this.idEquipement.asObservable();

  private demandeur = new BehaviorSubject<any>([]);
  currentDemandeur = this.demandeur.asObservable();

  private selectedIDEquip = new BehaviorSubject<number>(-1);
  currentSelectedIDEquip = this.selectedIDEquip.asObservable();
  private consignation = new BehaviorSubject<any>([]); 
  currentConsignation = this.consignation.asObservable();


  public allDataConsignation = this.consignation.pipe(
    scan((acc, curr) => Object.assign({}, acc, curr), {})
  );

  constructor() { }

  changeMessage(id: number) {
    this.messageSource.next(id);
  }

  changeIdEquipement(id: number) {
    this.idEquipement.next(id);
  }

  changeDemandeur(data) {
    console.log('Demandeur: ', data);
    this.demandeur.next(data);
  }

  changeSelectedIDEquip(data) {
    console.log('ID Equipement: ', data);
    this.selectedIDEquip.next(data);
  }

  changeConsignation(data) {
    // console.log('Consignation: ', data);
    this.consignation.next(data);
  }

}
