import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private messageSource = new BehaviorSubject<number>(-1);
  currentMessage = this.messageSource.asObservable();

  private idEquipement = new BehaviorSubject<number>(-1);
  currentIdEquipement = this.idEquipement.asObservable();

  constructor() { }

  changeMessage(id: number) {
    this.messageSource.next(id);
  }

  changeIdEquipement(id: number) {
    this.idEquipement.next(id);
  }
}
