import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private messageSource = new BehaviorSubject<number>(-1);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(id: number) {
    this.messageSource.next(id);
  }
}
