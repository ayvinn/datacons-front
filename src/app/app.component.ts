import { Component } from '@angular/core';
import { PrintserviceService } from './services/printservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(public printService: PrintserviceService) { }
}
