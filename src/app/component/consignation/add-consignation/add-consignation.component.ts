import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';


@Component({
  selector: 'app-add-consignation',
  templateUrl: './add-consignation.component.html',
  styleUrls: ['./add-consignation.component.sass']
})
export class AddConsignationComponent implements OnInit {
 
  constructor() { }

  ngOnInit() {
  }

  goPrevious(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    console.log('next');
    stepper.next();
  }

}
