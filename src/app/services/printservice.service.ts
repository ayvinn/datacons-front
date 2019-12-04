import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintserviceService {
  isPrinting = false;
  constructor(private router: Router) { }

  printDocument(documentName: string, documentData: string[]) {
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName]
      }}]);
  }

  
  printDocument2(documentName: string, documentData: string[]) {
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'print2': ['print2', documentName]
      }}]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }

  onDataReady2() {
    setTimeout(() => {
      window.print();
      if(confirm("Voulez vous recommençer l'impression ? ")) {
        window.print();
      }
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print2: null }}]);
    });
  }

}
