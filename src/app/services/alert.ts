import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Locale } from './locale';
import { AlertContainer } from '../shared/alert-container/alert-container';

type AlertType = 'success' | 'error' | 'warning' | "alert";
class Opts {
  tr?: any;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class Alert {
  constructor(
    private snackbar: MatSnackBar,
    private locale: Locale,
  ) { }

  private typeMap = {
    "success": "success",
    "error": "danger",
    "warning": "warning",
    "alert": "alert"
  };

  show(
    type: AlertType,
    message: string,
    opts: Opts = {}
  ) {
    if (message) {
      const { tr, duration } = opts;
      this.locale.conv([message], r => {
        this.snackbar.openFromComponent(AlertContainer, {
          data: { type: this.typeMap[type], message: r[0], opts },
          duration: duration || 5000,
          horizontalPosition: "end",
          verticalPosition: "top",
        })
      }, tr || {});
    }
  }
}
