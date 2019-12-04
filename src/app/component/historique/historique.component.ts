import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConsignationService } from 'src/app/services/consignation.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.sass'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
})
export class HistoriqueComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dateEntree = new FormControl(moment());
  dateSortie = new FormControl(moment());

  displayedColumns: string[] = ['id', 'date', 'description', 'duree', 'demandeur', 'secteur', 'action'];
  data = [];
  dataSource;
  oldDataSource;
  de; ds;


  constructor(private consignationService: ConsignationService) { }

  ngOnInit() {
    const etat = false;
    this.consignationService.getConsignation(etat).subscribe((res:any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.oldDataSource = this.dataSource.data;
      this.data = <any[]>this.dataSource.data;
      console.log('Get Consignation: ', res);
      console.log('Date Consignation: ', this.dateEntree);
    });
  }

  ngAfterViewInit() {
    this.de = moment(this.dateEntree.value).format('YYYY-MM-DD') + 'T00:00:00';
    this.ds = moment(this.dateSortie.value).format('YYYY-MM-DD') + 'T00:00:00';
  }

  /*applyFilter(filterValue: string) {
    // console.log('Filter Value: ', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }*/

  onChange(term, event) {
    // console.log('Date: ', term);
    if (event === 'dateEntree') {
      this.de = this.validateDate(term);
      console.log('De: ', new Date(this.de) + ' ' + this.de);
    } else if (event === 'dateSortie') {
      this.ds = this.validateDate(term);
      console.log('Ds: ', new Date(this.ds) + ' ' + this.ds);
    }
  }

  validateDate(date) {
    // console.log('Date: ', date.value);
    let result = `${date.value._i.year}`;
    const validateMonth = `${date.value._i.month}`;
    const validateDay = `${date.value._i.date}`;
    console.log('Month: ', validateMonth + ', Day: ' + validateDay);
    const time = 'T00:00:00';
    if (Number(validateMonth) < 9 && Number(validateDay) < 10) {
      result += `-0${Number(validateMonth) + 1}-0${validateDay}${time}`;
    } else {
      if (Number(validateMonth) >= 9) {
        result += `-${Number(validateMonth) + 1}`;
      } else {
        result += `-0${Number(validateMonth) + 1}`;
      }

      if (Number(validateDay) >= 10) {
        result += `-${validateDay}${time}`;
      } else {
        result += `-0${validateDay}${time}`;
      }
    }
    return result;
  }

  filtrer() {
    console.log('DataSource: ', this.dataSource.data);
    if (this.de && this.ds) {
      if (this.de > this.ds) {
        console.log(this.de);
        alert('La date d\'entree doit être supérieure à la date de sortie');
      } else {
        const filter = this.data.filter(x => x.date >= this.de && x.date <= this.ds);
        this.dataSource.data = filter;
      }
    }
  }

  refresh() {
    this.dataSource.data = this.oldDataSource;
  }
}
