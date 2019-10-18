import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Service } from '../models/service.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';




export interface DialogData {
  Libelle: string;
}

@Component({
  selector: 'app-sevice',
  templateUrl: './sevice.component.html',
  styleUrls: ['./sevice.component.sass']
})
export class SeviceComponent implements OnInit {
  Libelle: string;
  services:Service[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private service:ServiceService,public dialog: MatDialog) { }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(dialogajout, {
      width: '700px',
      data: {libelle: this.Libelle}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Libelle = result;
      this.ngOnInit();
    });
  }






  ngOnInit() {
    this.service.getAllServices().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
    
  }
 
  
  fillData(item){
    this.service.service.id=item.id;
    this.service.service.Libelle=item.title;
  }

  delete(id){
    this.service.deleteService(id).subscribe(res=>{
      this.service.getAllServices()
    })
  }

    displayedColumns: string[] = ['id', 'libelle'];
    
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
@Component({
  selector: 'dialogajout',
  templateUrl: 'dialogajout.html',
})


export class dialogajout implements OnInit {
  ngOnInit() {
    this.service.service={
      id:0,
      Libelle:null
    }
  }
  services:Service[];
  constructor(
    public dialogRef: MatDialogRef<dialogajout>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private service:ServiceService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(){
    if(this.service.service.id==0){
      this.service.postService().subscribe(res=>{
        this.service.getAllServices();
      },
      err=>{
        console.log(err);
      }



      )
    }
    else{
      this.service.postService().subscribe(res=>{
        this.service.getAllServices();
      },
      err=>{
        console.log(err);
      }



      )
    }
      
    
    }
  }