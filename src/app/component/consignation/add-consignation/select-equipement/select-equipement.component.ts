import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipment } from 'src/app/models/equipment.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material'
import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-select-equipement',
  templateUrl: './select-equipement.component.html',
  styleUrls: ['./select-equipement.component.sass']
})
export class SelectEquipementComponent implements OnInit {

  dataSource;
  IDEquipement;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private equipementser: ServiceequipementService, 
    public dialog: MatDialog, 
    private dataService: DataService) { }


  ngOnInit() {
    this.dataService.currentSelectedIDEquip.subscribe(res => this.IDEquipement = res);
    this.equipementser.GetTodoItem().subscribe(res => {
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

  displayedColumns: string[] = ['codeHAC', 'description', 'nomsecteur', 'Action'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecord(row) {
    console.log('Row: ', row);
    this.dataService.changeSelectedIDEquip(row.id);
  }
}
