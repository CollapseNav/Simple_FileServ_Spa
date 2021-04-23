import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }
  openSTSnackBar(msg: string = '') {
    this._snackBar.open(msg, '我知道了', {
      duration: 5000,
      horizontalPosition: 'start',
      verticalPosition: 'top',
    });
  }
}
