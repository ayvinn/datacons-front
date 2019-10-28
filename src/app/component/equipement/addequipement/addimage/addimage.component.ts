import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Renderer2, Input } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ServiceimageService } from 'src/app/services/serviceimage.service';
import { Image } from 'src/app/models/image.model';
import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { DataService } from "src/app/services/data.service";

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.sass']
})
export class AddimageComponent implements OnInit {
  fileData: File = null;
  previewUrl: any = null;
  imageForm: FormGroup;
  error: string;
  uploadError: string;
  @ViewChild(Image, { static: true }) private image: ElementRef;
  idEquipement: number;
  @Output() close = new EventEmitter();
  message: string;

  constructor(private fb: FormBuilder,
    private imageService: ServiceimageService,
    private renderer: Renderer2, private equipement: ServiceequipementService, private data1: DataService) { }
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

  /* onSelectedFile(event) {
    console.log(event);
    if (event.addedFiles.length > 0) {
      const productImage = event.addedFiles[0];
 
      const formData = new FormData();
      formData.append('file', productImage);
      this.imageService.uploadImage(formData).subscribe(
        res => {
          if (res.status === 200 && res.response.status === 'success') {
            this.uploadError = '';
 
            const li: HTMLLIElement = this.renderer.createElement('li');
 
            const img: HTMLImageElement = this.renderer.createElement('img');
            img.src = res.response.imagePath;
            this.renderer.addClass(img, 'image');
 
            const a: HTMLAnchorElement = this.renderer.createElement('a');
            a.innerText = 'Delete';
            this.renderer.addClass(a, 'delete-btn');
            a.addEventListener('click', this.deleteImage.bind(this, res.response.filename, a));
 
            this.renderer.appendChild(this.image.nativeElement, li);
            this.renderer.appendChild(li, img);
            this.renderer.appendChild(li, a);
          } else {
            this.uploadError = res.response.message;
          }
        },
        err => this.error = err
      );
    }
  }
  deleteImage(filename, a) {
    const formData = new FormData();
    formData.append('filename', filename);
    this.imageService.deleteImage(formData).subscribe(
      res => {
        a.parentElement.remove();
      },
      err => this.error = err
    );
  }  */
  onSubmit(form: NgForm) {
    /*const formData = new FormData();
    formData.append('id', this.imageForm.get('id').value);
    formData.append('lien', this.imageForm.get('lien').value);
    formData.append('idequipement', this.imageForm.get('idequipement').value);*/

    const values = { lien: this.previewUrl, Idequipement: this.idEquipement };
    console.log('Form: ', values);
    this.imageService.saveProduct(values).subscribe(
      res => {
        if (res.status === 'success') {
          this.onClose(res);
        }
      },
      err => this.error = err
    );
  }
  onClose(data: any) {
    this.close.emit(data);
  }

  /*files: File[] = [];

	onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
 */

}
