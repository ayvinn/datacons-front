import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-passation',
  templateUrl: './passation.component.html',
  styleUrls: ['./passation.component.sass']
})
export class PassationComponent implements OnInit {
  @ViewChild('stepper', {static: false}) stepper: MatStepper;

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
