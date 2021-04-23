import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TableApi } from 'src/app/api/tableApi';
import { CurrentpageService } from 'src/app/services/currentpage.service';
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
    this.http.post<Dir>(`${environment.BaseUrl}${TableApi.defaultDir}`, { fileName: data, parentId: this.cur.getCurrentPage().id, mapPath: this.cur.getCurrentPage().mapPath }).subscribe(res => {
      this.cur.addNewDirCur(res);
      this.close();
    });
  }
}
