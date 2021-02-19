import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NewdirComponent } from 'src/app/toolbar/newdir/newdir.component';
import { environment } from 'src/environments/environment';
import { FileTypeApi } from 'src/app/api/tableApi';
import { MatIcon, MatIconLocation, MatIconRegistry } from '@angular/material/icon';
import { FileType } from '../selconfig';

@Component({
  selector: 'app-newtype',
  templateUrl: './newtype.component.html',
  styleUrls: ['./newtype.component.sass']
})
export class NewtypeComponent implements OnInit {
  exts: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  typeName: string;
  typeIcon: string;
  constructor(public dialogRef: MatDialogRef<NewdirComponent>,
    public http: HttpClient) { }
  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.exts.indexOf(value) > -1)
        this.exts.splice(this.exts.indexOf(value), 1);
      this.exts.push(value);
    }
    if (input) {
      input.value = '';
    }
  }

  addNewType() {
    let type: FileType = {
      ext: this.exts.join(','),
      name: this.typeName,
      icon: this.typeIcon
    };

    this.http.post<FileType>(`${environment.BaseUrl}${FileTypeApi.defaultFileType}`, type).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  remove(item: string): void {
    const index = this.exts.indexOf(item);

    if (index >= 0) {
      this.exts.splice(index, 1);
    }
  }
}
