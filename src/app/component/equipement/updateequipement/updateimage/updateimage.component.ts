import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Renderer2, Input } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ServiceimageService } from 'src/app/services/serviceimage.service';
import { Image } from 'src/app/models/image.model';
import { ServiceequipementService } from 'src/app/services/serviceequipement.service';
import { DataService } from "src/app/services/data.service";
@Component({
  selector: 'app-updateimage',
  templateUrl: './updateimage.component.html',
  styleUrls: ['./updateimage.component.sass']
})
export class UpdateimageComponent implements OnInit {
  files: File[] = []
  fileData: File = null;
  previewUrl: any = null;
  idEquipement: number;


  constructor(private fb: FormBuilder,
    private imageService: ServiceimageService, private equipement: ServiceequipementService, private dataShared: DataService) { }

  ngOnInit() {
    this.dataShared.currentIdEquipement.subscribe(id => {
      console.log('ID Test: ', id);
      this.idEquipement = id;
      this.imageService.GetImagemodification(id).subscribe(res => console.log(res));
    })
  }
  preview() {
    // Show preview 
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

  }
}
