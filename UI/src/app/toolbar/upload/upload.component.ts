import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrentpageService } from 'src/app/services/currentpage.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { UploadFile, UploadService } from 'src/app/services/upload.service';
import { ConvertSize } from 'src/app/table/table/fileinfo';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent implements OnInit {

  uploadFiles: UploadFile[] = [];

  constructor(public dialogRef: MatDialogRef<UploadComponent>,
    public uploadServ: UploadService,
    public snack: SnackBarService,
    public cur: CurrentpageService) { }

  ngOnInit(): void {
  }

  remove(index: number) {
    this.uploadFiles.splice(index, 1);
  }
  uploadFile(index: number) {
    this.uploadServ.uploadFile(this.uploadFiles.filter(item => item.index == index)[0]).subscribe(res => {
      if (!!res?.id) {
        this.cur.addNewFileCur(res);
      } else {
      }
    });
  }

  uploadAll() {
    this.uploadFiles.forEach(item => {
      if (item.per != 100)
        this.uploadFile(item.index);
    });
  }

  removeAll() {
    this.uploadFiles = [];
  }
  addNew(input: HTMLInputElement) {
    const file = input.files[0];
    if (file)
      this.uploadFiles.push({ index: this.uploadFiles.length, file: file, per: 0 });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  uploadStatus(file: UploadFile): string {
    if (file.loaded) {
      return file.per < 100
        ? `${ConvertSize(file.loaded)}/${ConvertSize(file.file.size)}(${file.per.toFixed(2)}%)`
        : `${ConvertSize(file.file.size)} (100%已完成)`;
    }
    return `${ConvertSize(file.file.size)} (未上传)`;
  }
}
