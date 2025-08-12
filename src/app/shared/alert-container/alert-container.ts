import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-container',
  standalone: false,
  templateUrl: './alert-container.html',
  styleUrl: './alert-container.scss'
})
export class AlertContainer {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private _snackbar: MatSnackBar) {
    if(data.message){
      data.message = (data.message as string).replace(/\n/g, "<br>");
    }
  }

  upp(type: string){
    return type.toUpperCase();
  }

  close(){
    this._snackbar.dismiss();
  }
}
