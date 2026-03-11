import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarHorizontalPosition as MatSnackBarHorizontalPosition, MatLegacySnackBarVerticalPosition as MatSnackBarVerticalPosition } from '@angular/material/legacy-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }
  openSTSnackBar(msg: string = '', h: MatSnackBarHorizontalPosition = 'start', v: MatSnackBarVerticalPosition = 'top', action: string = '我知道了', duration: number = 5000) {
    this._snackBar.open(msg, action, {
      duration: duration,
      horizontalPosition: h,
      verticalPosition: v,
    });
  }
}
