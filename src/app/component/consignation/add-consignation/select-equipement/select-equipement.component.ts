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
  state;

  ngOnInit() {
    this.dataService.currentCountSousEquipement.subscribe(res => {
      this.countSousEquipement = res;
      this.state = false;
    });

    this.dataService.currentDemandeur.subscribe(res => {
      this.demandeur = res;
    });
    this.dataService.currentConsignation.subscribe(/*res => console.log('Current Consignation: ', res)*/);
    this.dataService.currentSelectedIDEquip.subscribe(res => this.IDEquipement = res);
    this.equipementser.GetTodoItem().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(res);
    });
    this.dataService.allDataConsignation.subscribe(res => this.consignation = res);
  }
  func() {
    this.state = true;
  }
  delete(id) {
    if (confirm("vous etes sur de supprimer cet equipement ")) {
      this.equipementser.deleteService(id).subscribe(res => {

        this.equipementser.getAllEquipements();
        this.ngOnInit();
      })
    }
  }

  displayedColumns: string[] = ['codeHAC', 'description', 'nomsecteur', 'intervention','Action'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecord(row): void {
  
    if (row.description.includes('Bande') || row.description.includes('Filtre')
      || row.description.includes('Compresseur') ) {
      this.dataService.changedescription(true);
    }

    this.equipementser.PostLogin(row.id).subscribe(
      data => {
       
        if (data) {
          this.dataService.changeConsignation({ IDEquipment: row.id });
          this.checkDemandeurDroit(this.consignation.idDemandeur);
        } else {
          this.toastr.warning("Cette Installation est en regime d'essai ");
        }
      },
      (error) => {
        this.toastr.error('Op??ration ??chou??  ', 'error server');
      }
    );
  }

  checkDemandeurDroit(id): void {
    this.equipementser.PostLoginDroit(id).subscribe(
      data => {
       
        if (data) {
          
          if (this.countSousEquipement > 1 && this.demandeur.droit.toLowerCase() === 'ICV'.toLowerCase()) {
            this.toastr.warning("Vous n'etes pas autorise de faire une consignation multiple");
            
          } else {
            
            this.stepper.next();
            this.toastr.success('Op??ration reussie');
          }
        } else {
          this.toastr.warning("Vous n'etes pas autorise de faire une consignation multiple");
        }
      },
      (error) => {
        this.toastr.error('Op??ration ??chou??  ', 'error server');
      }
    );
  }

}
