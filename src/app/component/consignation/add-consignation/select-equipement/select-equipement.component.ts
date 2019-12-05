import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatStepper } from '@angular/material'
import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { AddConsignationComponent } from '../add-consignation.component';

@Component({
  selector: 'app-select-equipement',
  templateUrl: './select-equipement.component.html',
  styleUrls: ['./select-equipement.component.sass']
})
export class SelectEquipementComponent implements OnInit {
  @Input() stepper: MatStepper;
  dataSource;
  consignation;
  IDEquipement;
  countSousEquipement;
  demandeur;
  public ss: AddConsignationComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private equipementser: ServiceequipementService,
    public dialog: MatDialog,
    private dataService: DataService,
    private toastr: ToastrService) { }


  ngOnInit() {
    this.dataService.currentCountSousEquipement.subscribe(res => {
      console.log('Count Sous Equipement: ', res);
      this.countSousEquipement = res;
    });
    this.dataService.currentDemandeur.subscribe(res => {
      console.log('Demandeur', res);
      this.demandeur = res;
    });
    this.dataService.currentConsignation.subscribe(/*res => console.log('Current Consignation: ', res)*/);
    this.dataService.currentSelectedIDEquip.subscribe(res => this.IDEquipement = res);
    this.equipementser.GetTodoItem().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.dataService.allDataConsignation.subscribe(res => this.consignation = res);
  }

  delete(id) {
    if (confirm("vous etes sur de supprimer cet equipement ")) {
      this.equipementser.deleteService(id).subscribe(res => {

        this.equipementser.getAllEquipements();
        this.ngOnInit();
      })
    }
  }

  displayedColumns: string[] = ['codeHAC', 'description', 'nomsecteur', 'Action'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecord(row): void {
    console.log(row);
    this.equipementser.PostLogin(row.id).subscribe(
      data => {
        console.log('EquipeSer: ', data);
        if (data) {
          this.dataService.changeConsignation({ IDEquipment: row.id });
          this.checkDemandeurDroit(this.consignation.idDemandeur);
        } else {
          this.toastr.warning('Cette Installation est en isolation spéciale');
        }
      },
      (error) => {
        this.toastr.error('Opération échoué  ', 'error server');
      }
    );
  }

  checkDemandeurDroit(id): void {
    this.equipementser.PostLoginDroit(id).subscribe(
      data => {
        console.log('Check Demandeur Droit: ', data)
        if (data) {
          this.dataService.changeSelectedIDEquip(id);
          if (this.countSousEquipement > 1 && this.demandeur.droit === 'ICV') {
            this.toastr.warning("Vous n'etes pas autorise de faire une consignation multiple");
            // this.stepper.selectedIndex = 0;
          } else {
            this.stepper.next();
            this.toastr.success('Opération reussie');
          }
        } else {
          this.toastr.warning("Vous n'etes pas autorise de faire une consignation multiple");
        }
      },
      (error) => {
        this.toastr.error('Opération échoué  ', 'error server');
      }
    );
  }

}
