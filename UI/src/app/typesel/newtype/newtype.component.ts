import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NewdirComponent } from 'src/app/toolbar/newdir/newdir.component';
import { environment } from 'src/environments/environment';
import { FileTypeApi } from 'src/app/api/tableApi';
import { MatIconRegistry } from '@angular/material/icon';
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

  fileType: FileType = {};
  constructor(@Inject(MAT_DIALOG_DATA) public id: string, public dialogRef: MatDialogRef<NewdirComponent>,
    public IconReg: MatIconRegistry, public http: HttpClient) { }

  ngOnInit(): void {
    if (this.id) {
      this.http.get<FileType>(`${environment.BaseUrl}${FileTypeApi.defaultFileType}/${this.id}`).subscribe(res => {
        this.fileType = res;
        this.exts = this.spliteExts(this.fileType.ext);
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  spliteExts(ext: string): string[] {
    if (!ext) return [];
    return ext.split(',');
  }

  /** 添加新的文件类型 */
  addNewType() {
    this.fileType.ext = this.exts.join(',');
    if (this.id) {
      this.http.put(`${environment.BaseUrl}${FileTypeApi.defaultFileType}/${this.id}`, this.fileType).subscribe(res => {
        this.dialogRef.close(this.fileType);
      });
    } else {
      this.http.post<FileType>(`${environment.BaseUrl}${FileTypeApi.defaultFileType}`, this.fileType).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }

  /** 添加文件后缀 */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if (this.exts.indexOf(value) > -1)
        this.exts.splice(this.exts.indexOf(value), 1);
      this.exts.push(value);
    }
    if (input)
      input.value = '';
  }

  /** 移除文件后缀 */
  remove(item: string): void {
    console.log(this.fileType);
    const index = this.exts.indexOf(item);
    if (index >= 0) {
      this.exts.splice(index, 1);
    }
  }
}
