import { Injectable } from '@angular/core';
import { Locale } from './locale';
import { MatDialog } from '@angular/material/dialog';
import { BoolParamFx } from '../../../serve/lib/functions';
import { ConfirmDialog } from '../shared/confirm-dialog/confirm-dialog';
import { InputDialogConfig } from '../model/input-dialog-config';
import { InputDialog } from '../shared/input-dialog/input-dialog';

@Injectable({
  providedIn: 'root'
})
export class Dialog {
  constructor(
    private locale: Locale,
    private dialog: MatDialog,
  ) { }

  confirm(title: string, callback: BoolParamFx, val: any = {}) {
    this.locale.conv([title], tr => {
      title = tr[0];
      const dialogRef = this.dialog.open(ConfirmDialog, {
        data: { message: title },
        autoFocus: true,
        disableClose: true,
        hasBackdrop: true,
        panelClass: "p-2",
        restoreFocus: true,
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          callback(true);
        }
        else {
          callback(false);
        }
      });
    }, val);
  }

  getInput(config: InputDialogConfig) {
    const dialogRef = this.dialog.open(InputDialog, {
      data: config,
      autoFocus: true,
      minWidth: '300px',
      maxWidth: '100%',
      disableClose: true,
      hasBackdrop: true,
      restoreFocus: true,
      panelClass: "p-2"
    });

    dialogRef.afterClosed().subscribe((r) => {
      config.callback(r);
    });
  }
}
