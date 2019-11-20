import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';
import { constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.sass']
})
export class TemplateComponent implements OnInit {
  readonly logodatacons: string = constants.img_logoDataCons;
  constructor(private router: Router,public authService: ServicedemandeurService) { }

  ngOnInit() {
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['consignation']);
  }
}
