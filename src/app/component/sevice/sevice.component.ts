import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Service } from '../../models/service.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddServiceComponent } from './add-service/add-service.component';
import { UpdateServiceComponent } from './update-service/update-service.component';





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
    const dialogRef = this.dialog.open(AddServiceComponent, {
      width: '400px',
     // data: {libelle: this.Libelle}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.Libelle = result;
      this.ngOnInit();
    });
  }
  openDialog1(element): void {
    console.log(element);

    const dialogRef = this.dialog.open(UpdateServiceComponent, {
      width: '400px',
      data: {element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.Libelle = result;
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

  delete(id,libelle_:string){
    if(confirm("vous etes sur de supprimer ce service "+libelle_)){
      this.service.deleteService(id).subscribe(res=>{
      this.service.getAllServices();
      this.ngOnInit();
    })}
  }

    displayedColumns: string[] = ['id', 'libelle','Action'];
    
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
/*@Component({
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
  }*/
  
//class update
/*@Component({
  selector: 'dialogupdate',
  templateUrl: 'dialogupdate.html',
})

export class dialogupdate implements OnInit {

    form:FormGroup;
    private toastr: ToastrService;
    services:Service[];
        
    constructor(private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<dialogupdate>,
      private service:ServiceService,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
    
    
    ngOnInit() {
      this.createForm();

    }

    onNoClick(): void {
      this.dialogRef.close();
    }
    createForm(){
      this.form = this.formBuilder.group({
          id :[this.data.element.id],
          libelle:[this.data.element.libelle,Validators.required]
      })
      
    }
    get f() { return this.form.controls; }
    update(){
      console.log(this.data.id);
      this.service.put(this.data.element.id,this.form.value).subscribe(res=>{
          this.service.getAllServices();
        },
        err=>{
          console.log(err);
        })
        this.onNoClick();
        this.ngOnInit();
  }
        
      
}*/
    