import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-printlayout2',
  templateUrl: './printlayout2.component.html',
  styleUrls: ['./printlayout2.component.sass']
})
export class Printlayout2Component implements OnInit {
  readonly img_Holcim2: string = constants.img_Holcim2;
  readonly img_siege: string = constants.img_siege;
  readonly logo: string = constants.img_sec;
  constructor() { }

  ngOnInit() {
  }

}
