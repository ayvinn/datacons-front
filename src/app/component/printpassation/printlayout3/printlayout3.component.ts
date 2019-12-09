import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-printlayout3',
  templateUrl: './printlayout3.component.html',
  styleUrls: ['./printlayout3.component.sass']
})
export class Printlayout3Component implements OnInit {

  readonly img_Holcim2: string = constants.img_Holcim2;
  readonly img_siege: string = constants.img_siege;
  readonly logo: string = constants.img_sec;
  constructor() { }

  ngOnInit() {
  }


}
