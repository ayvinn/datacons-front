import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipment } from 'src/app/models/equipment.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateequipementComponent } from '../equipement/updateequipement/updateequipement.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {
  equipement = new Equipment;
  equipements: Equipment[];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private equipementser: ServiceequipementService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  openDialog1(elt): void {
    const dialogRef = this.dialog.open(UpdateequipementComponent, {
      width: '2000px',
      data: { element: elt }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.equipementser.GetTodoItems(false).subscribe(res => {
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

  displayedColumns: string[] = ['id', 'codeHAC', 'description', 'Idsecteur', 'etat', 'Action'];


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateTo() {
    console.log('Navigate');
    this.router.navigate([{ outlets: { template: 'ajouterequipement' } }], { replaceUrl: false });
  }
}
