import { Component, OnInit, ViewChild } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ServicecategorieService } from 'src/app/services/servicecategorie.service';
import { AddServiceComponent } from '../sevice/add-service/add-service.component';
import { AddcategorieComponent } from './addcategorie/addcategorie.component';
import { UpdatecategorieComponent } from './updatecategorie/updatecategorie.component';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.sass']
})
export class CategorieComponent implements OnInit {

  Libelle: string;
  services:Categorie[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private service:ServicecategorieService,public dialog: MatDialog) { }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddcategorieComponent, {
      width: '700px',
      data: {libelle: this.Libelle}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Libelle = result;
      this.ngOnInit();
    });
  }
  openDialog1(element): void {
    console.log(element);

    const dialogRef = this.dialog.open(UpdatecategorieComponent, {
      width: '700px',
      data: {element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Libelle = result;
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.service.getAllCategories().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
    
  }

  delete(id,libelle_:string){
    if(confirm("vous etes sur de supprimer ce service "+libelle_)){
      this.service.deleteService(id).subscribe(res=>{
      this.service.getAllCategories();
      this.ngOnInit();
    })}
  }

    displayedColumns: string[] = ['id', 'libelle','Action'];
    
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
