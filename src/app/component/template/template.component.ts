import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicedemandeurService } from 'src/app/services/servicedemandeur.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.sass']
})
export class TemplateComponent implements OnInit {

  constructor(private router: Router,public authService: ServicedemandeurService) { }

  ngOnInit() {
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['consignation']);
  }
}
