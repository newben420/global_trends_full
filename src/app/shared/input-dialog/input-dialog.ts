import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputDialogConfig } from '../../model/input-dialog-config';
import { RegexPatterns } from './../../../../serve/lib/regex';
import { GRes } from './../../../../serve/lib/res';

@Component({
  selector: 'app-input-dialog',
  standalone: false,
  templateUrl: './input-dialog.html',
  styleUrl: './input-dialog.scss'
})
export class InputDialog {
  initVal!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: InputDialogConfig) {
    if(data.initVal || data.initVal === 0){
      this.initVal = structuredClone(data.initVal);
      this.val = this.initVal;
    }
  }
  val!: any;
  pattern = RegexPatterns;
  gres = GRes;
}
