import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/shared/constants';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-confirmprint',
  templateUrl: './confirmprint.component.html',
  styleUrls: ['./confirmprint.component.sass']
})
export class ConfirmprintComponent implements OnInit {
  readonly img_print: string = constants.img_print;
  
  constructor(public dialogRef: MatDialogRef<ConfirmprintComponent>) { }
  ngOnInit() {
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}
