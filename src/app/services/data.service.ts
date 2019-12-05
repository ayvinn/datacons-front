import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject<number>(-1);
  currentMessage = this.messageSource.asObservable();

  private numerosousequipement = new BehaviorSubject<number>(0);
  currentnumero = this.numerosousequipement.asObservable();

  private idequipment = new BehaviorSubject<number>(-1);
  currentidequipment = this.idequipment.asObservable();

  private iddemandeur = new BehaviorSubject<number>(-1);
  currentdemandeur = this.iddemandeur.asObservable();

  private idEquipement = new BehaviorSubject<number>(-1);
  currentIdEquipement = this.idEquipement.asObservable();

  private idconsignation = new BehaviorSubject<number>(-1);
  currentidconsignation = this.idconsignation.asObservable();

  private demandeur = new BehaviorSubject<any>([]);
  currentDemandeur = this.demandeur.asObservable();

  private demandeur2 = new BehaviorSubject<any>([]);
  currentDemandeur2 = this.demandeur2.asObservable();

  private selectedIDEquip = new BehaviorSubject<number>(-1);
  currentSelectedIDEquip = this.selectedIDEquip.asObservable();

  private consignation = new BehaviorSubject<any>([]); 
  currentConsignation = this.consignation.asObservable();

  private countSousEquipement = new BehaviorSubject<number>(-1);
  currentCountSousEquipement = this.countSousEquipement.asObservable();


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
  changenumero(id: number) {
    this.numerosousequipement.next(id);
  }

  changeImprimerequipement(id : number){
    this.idequipment.next(id);
  }

  changeImprimerdemandeur(id : number){
    this.iddemandeur.next(id);
  }

  changeImprimerconsignation(id : number){
    this.idconsignation.next(id);
  }
  changeDemandeur(data) {
    console.log('Demandeur: ', data);
    this.demandeur.next(data);
  }

  changeDemandeur2(data) {
    console.log('Demandeur: ', data);
    this.demandeur2.next(data);
  }

  changeSelectedIDEquip(data) {
    console.log('ID Equipement: ', data);
    this.selectedIDEquip.next(data);
  }

  changeConsignation(data) {
    // console.log('Consignation: ', data);
    this.consignation.next(data);
  }

  changeCountSousEquipement(data) {
    this.countSousEquipement.next(data);
  }

}
