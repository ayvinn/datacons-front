import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';

import { AddequipementComponent } from './addequipement/addequipement.component';
//import { UpdatedemandeurComponent } from './updatedemandeur/updatedemandeur.component';
import { Equipment } from 'src/app/models/equipment.model';

import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { UpdateequipementComponent } from './updateequipement/updateequipement.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.sass']
})
export class EquipementComponent implements OnInit {
  equipement = new Equipment;
  equipements: Equipment[];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private equipementser: ServiceequipementService, private activatedRoute: ActivatedRoute,public dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddequipementComponent,{
      width:'1100px',
      autoFocus: false,
      maxHeight: '90vh' //you can adjust the value as per your view
   });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.ngOnInit();
    });
  }
  openDialog1(elt): void {
    const dialogRef = this.dialog.open(UpdateequipementComponent, {
      width:'1100px',
      autoFocus: false,
      maxHeight: '90vh',
      data: { element: elt }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.equipementser.GetTodoItems(true).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });



  }

  delete(id) {
    if (confirm("vous etes sur de supprimer cet equipement ")) {
      this.equipementser.deleteService(id).subscribe(res => {

        this.equipementser.getAllEquipements();
        this.ngOnInit();
      })
    }
  }

  displayedColumns: string[] = ['codeHAC', 'description', 'Idsecteur', 'etat', 'Action'];


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateTo() {
          console.log('Navigate');
          this.router.navigate([{ outlets: { template: 'ajouterequipement' } }], {relativeTo: this.activatedRoute});
    //      this.router.navigate(["ajouterequipement"]);
    //sthis.router.navigate([{ outlets: { template: 'ajouterequipement' } }], { replaceUrl: false });
  }
}
