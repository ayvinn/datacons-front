import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServiceimageService } from 'src/app/services/serviceimage.service';
import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { DataService } from "src/app/services/data.service";
import { constantURL } from 'src/app/shared/constantURL';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-updateimage',
  templateUrl: './updateimage.component.html',
  styleUrls: ['./updateimage.component.sass']
})
export class UpdateimageComponent implements OnInit {
  files: File[] = [];
  fileData: File = null;
  previewUrl: any = null;
  idEquipement: number;
  images;


  constructor(private fb: FormBuilder,
    private imageService: ServiceimageService,
    private equipement: ServiceequipementService,
    private dataShared: DataService,private toastr: ToastrService) { }

  ngOnInit() {
    this.files = [];
    this.dataShared.currentIdEquipement.subscribe(id => {
      console.log('ID Test: ', id);
      this.idEquipement = id;
      this.imageService.GetImagemodification(id).subscribe(res => {
        console.log(res.length);
        this.images = res;
        /*this.files[0].name = res[0].lien.slice(7, res[0].lien.length - 5);
        this.files[0].type = res[0].lien.slice(res[0].lien.length - 4, res[0].lien.length);*/
        // console.log('Name: ', res[0].lien.slice(7, res[0].lien.length - 5));
        // console.log('Type: ', res[0].lien.slice(res[0].lien.length - 4, res[0].lien.length));
      })
    })
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

  upload(event) {
    this.fileData = event.addedFiles[0];
    this.files.push(...event.addedFiles);
    console.log('Event: ', event.addedFiles);
    console.log('FileName: ', this.fileData.name);
    this.preview();
  }


  updateImage() {
    if(this.images.length>0){ const values = { id: this.images[0].id, lien: this.previewUrl, idequipement: this.idEquipement };
    console.log(values);
   this.imageService.put(values.id, values).subscribe(
     res => { 
       if (res.status === 'success') {
    this.toastr.success('Image modifiée', 'Image bien modifié');
     } 
      console.log(res);
    });}else
    {
      const values = { lien: this.previewUrl, Idequipement: this.idEquipement };
    
    console.log('Form: ', values);
    if(this.previewUrl!=null)
    this.imageService.saveProduct(values).subscribe(
      res => {
        console.log('Ajouter Produit: ', res);
        if (res.status === 'success') {
         this.toastr.success('Image ajouter', 'Image bien ajouter');
        } 
      }, 
    );
    this.ngOnInit();
    }
   
  }

  createImage(url) {
    
    return `${constantURL.apiEndpoint}/${url}`;
  }
  onRemove(event) {
		console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.previewUrl=null;
  }
}
