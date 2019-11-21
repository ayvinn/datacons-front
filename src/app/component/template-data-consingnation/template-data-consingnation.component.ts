import { Component, OnInit } from '@angular/core';

import { constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-template-data-consingnation',
  templateUrl: './template-data-consingnation.component.html',
  styleUrls: ['./template-data-consingnation.component.sass']
})
export class TemplateDataConsingnationComponent implements OnInit {

  readonly img_Holcim2: string = constants.img_Holcim2;
  readonly img_siege: string = constants.img_siege;
  readonly logo: string = constants.img_sec;
  constructor() { }

  ngOnInit() {
    
  }

}
