import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Renderer2, Input } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ServiceimageService } from 'src/app/services/serviceimage.service';
import { Image } from 'src/app/models/image.model';
import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { DataService } from "src/app/services/data.service";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.sass']
})
export class AddimageComponent implements OnInit {
  @ViewChild(Image, { static: true }) private image: ElementRef;
  @Output() close = new EventEmitter();

  fileData: File = null;
  previewUrl: any = null;
  imageForm: FormGroup;
  error: string;
  uploadError: string;

  idEquipement: number;
  message: string;
  files: File[] = [];

  constructor(private fb: FormBuilder,
    private imageService: ServiceimageService,
    private renderer: Renderer2, private equipement: ServiceequipementService, private data1: DataService,public dialog: MatDialog,
    private toastr: ToastrService) { }
  ngOnInit() {
    this.imageForm = this.fb.group({
      id: [''],
      lien: [''],
      idequipement: ['']

    });
    this.equipement.getAllEquipements2();
    console.log('Equipements: ', this.equipement.equipement);
    this.data1.currentMessage.subscribe(id => {
      console.log('ID: ', id);
      this.idEquipement = id;
    })
    
  }


  public upload(event: any): void {
    this.fileData = event.addedFiles[0];
    this.files.push(...event.addedFiles);
    console.log('Event: ', event.addedFiles);
    console.log('FileName: ', this.fileData.name);
    this.preview();
  }

  preview() {
    // Show preview 
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
      console.log('Result: ', reader.result);
      console.log('Reader: ', this.previewUrl);
    };
  }
  resetid(){
    this.toastr.success("Equipement bien ajouté");
    this.data1.changeMessage(0);
  }

 
  onSubmit() {
 

    const values = { lien: this.previewUrl, Idequipement: this.idEquipement };
    
    console.log('Form: ', values);
    if(this.previewUrl!=null)
    this.imageService.saveProduct(values).subscribe(
      res => {
        console.log('Ajouter Produit: ', res);
        if (res.status === 'success') {
          this.onClose(res);
        } this.toastr.success('Image ajouter', 'Image bien ajouter');
      },
      err => this.error = err
    );
    this.ngOnInit();
  }


	onRemove(event) {
		console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.previewUrl=null;
  }
  
  onClose(data: any) {
    this.close.emit(data);
  }

  



}
