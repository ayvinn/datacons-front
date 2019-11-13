import { Component, OnInit, ViewChild } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ServicecategorieService } from 'src/app/services/servicecategorie.service';
import { AddcategorieComponent } from './addcategorie/addcategorie.component';
import { UpdatecategorieComponent } from './updatecategorie/updatecategorie.component';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.sass']
})
export class CategorieComponent implements OnInit {

  NomComplet_: string;
  categories:Categorie[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private categorie:ServicecategorieService,public dialog: MatDialog) { }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddcategorieComponent, {
      width: '400px',
      data: {nomcomplet: this.NomComplet_}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.NomComplet_ = result;
      this.ngOnInit();
    });
  }
  openDialog1(element): void {
    console.log(element);

    const dialogRef = this.dialog.open(UpdatecategorieComponent, {
      width: '400px',
      data: {element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.NomComplet_ = result;
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.categorie.getAllCategories().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
    
  }

  delete(id,NomComplet_:string){
    if(confirm("vous etes sur de supprimer cette categorie ?")){
      this.categorie.deleteService(id).subscribe(res=>{
      this.categorie.getAllCategories();
      this.ngOnInit();
    })}
  }

    displayedColumns: string[] = ['id', 'NomComplet','Action'];
    
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
