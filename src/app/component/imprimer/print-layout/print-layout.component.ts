import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.sass']
})
export class PrintLayoutComponent implements OnInit {
  readonly img_Holcim2: string = constants.img_Holcim2;
  readonly img_siege: string = constants.img_siege;
  readonly logo: string = constants.img_sec;
  constructor() { }

  ngOnInit() {
  }

}
