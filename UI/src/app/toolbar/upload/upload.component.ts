import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrentpageService } from 'src/app/services/currentpage.service';
import { UploadFile, UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent implements OnInit {

  uploadFiles: UploadFile[] = [];

  constructor(public dialogRef: MatDialogRef<UploadComponent>,
    public uploadServ: UploadService,
    public cur: CurrentpageService) { }

  ngOnInit(): void {
  }

  remove(index: number) {
    this.uploadFiles.splice(index, 1);
  }
  uploadFile(index: number) {
    this.uploadServ.uploadFile(this.uploadFiles.filter(item => item.index == index)[0]).subscribe(res => {
      if (res) {
        this.cur.addNewFileCur(res);
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
        ? `${this.cur.resize(file.loaded)}/${this.cur.resize(file.file.size)}(${file.per.toFixed(2)}%)`
        : `${this.cur.resize(file.file.size)} (100%已完成)`;
    }
    return `${this.cur.resize(file.file.size)} (未上传)`;
  }
}
