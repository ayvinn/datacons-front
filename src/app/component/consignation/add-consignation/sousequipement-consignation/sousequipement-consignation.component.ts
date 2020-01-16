import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { SousEquipment } from 'src/app/models/sous-equipment.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ServicesousequipementService } from 'src/app/services/servicesousequipement.service';
import { DataService } from 'src/app/services/data.service';
import { take } from 'rxjs/operators';
import { AddSousequipementConsignationComponent } from './add-sousequipement-consignation/add-sousequipement-consignation.component';

@Component({
  selector: 'app-sousequipement-consignation',
  templateUrl: './sousequipement-consignation.component.html',
  styleUrls: ['./sousequipement-consignation.component.sass']
})
export class SousequipementConsignationComponent implements OnInit {

  sousequipement = new SousEquipment;
  sousequipements: SousEquipment[];
  IDEquipement: number;
  totalCount;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private sousequipementser: ServicesousequipementService, public dialog: MatDialog, private dataService: DataService) { }

  async ngOnInit() {
    this.dataService.currentCountSousEquipement.subscribe();
    this.dataService.allDataConsignation.subscribe(async res => {
      console.log('Current Consignation Intervention: ', res);
      this.IDEquipement = res['IDEquipment'];
      if (this.IDEquipement) {
        await this.sousequipementser.GetTodoItems(this.IDEquipement).pipe(take(1)).toPromise().then(res => {
          console.log('Sous Equipement: ', res);
          this.dataService.changeCountSousEquipement(res.length);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

       });
      }
    });

  }
  func(){

    this.dataService.changelieu(true);
  }

  delete(id) {
    if (confirm("vous etes sur de supprimer cette categorie ")) {
      this.sousequipementser.deleteService(id).subscribe(res => {
        this.sousequipementser.getAllSousEquipments();
        this.ngOnInit();
      })
    }
  }

  displayedColumns: string[] = ['numero', 'codeHAC', 'nomequipement', 'emplacement', 'typeenergie', 'lieu', 'idequipement', 'remarque'];
  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  datasourceupdate(){
    this.sousequipementser.GetTodoItems(this.IDEquipement).pipe(take(1)).toPromise().then(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        var a = res.filter(r=>r.TypeEnergie == "ELEC" && r.Lieu != "ICV");
        if (a.length > 0) {
    
          this.dataService.changelieu(true);
        }
        console.log(a);
      });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddSousequipementConsignationComponent, {
      width: '700px',
      data : {idE : this.IDEquipement}
    });
    dialogRef.afterClosed().subscribe(result => {
       this.datasourceupdate();
    });

  }

}
