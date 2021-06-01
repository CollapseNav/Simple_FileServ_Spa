import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TableApi } from 'src/app/api/Api';
import { CurrentpageService } from 'src/app/services/currentpage.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Dir } from 'src/app/table/table/fileinfo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newdir',
  templateUrl: './newdir.component.html',
  styleUrls: ['./newdir.component.sass']
})
export class NewdirComponent implements OnInit {
  newDirName: string;
  constructor(public dialogRef: MatDialogRef<NewdirComponent>,
    public cur: CurrentpageService,
    public snack: SnackBarService,
    public http: HttpClient) { }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  onEnter(data: string): void {
    this.addNewDir(data);
  }
  addNewDir(data: string): void {
    this.http.post<Dir>(`${environment.BaseUrl}${TableApi.defaultDir}`, { fileName: data, parentId: this.cur.getCurrentPage().id }).subscribe(res => {
      if (res) {
        this.cur.addNewDirCur(res);
        this.close();
      } else {
        this.snack.openSTSnackBar('已存在重名文件夹', 'center');
      }
    });
  }
}
