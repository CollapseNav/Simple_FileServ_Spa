import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FileApi } from '../api/tableApi';
import { NavConfig } from '../app.component';
import { CurrentpageService } from '../services/currentpage.service';
import { MFile } from '../table/table/fileinfo';
import { NewdirComponent } from './newdir/newdir.component';
import { UploadComponent } from './upload/upload.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {
  @Output() collapse = new EventEmitter<boolean>();
  @ViewChild('filenameInput', { static: true }) filenameInput: ElementRef;
  @Input() navConfig: NavConfig;
  myControl = new FormControl();

  filename: string = '';
  constructor(public cur: CurrentpageService,
    public dialog: MatDialog,
    public http: HttpClient) {
  }

  params = { name: '' };

  files: MFile[];
  fileObs = this.http.get<MFile[]>(`${environment.BaseUrl}${FileApi.findByName}`, { params: this.params }).pipe(debounceTime(500));
  ngOnInit(): void {
    fromEvent(this.filenameInput.nativeElement, 'keyup')
      .pipe(debounceTime(500), map((e: KeyboardEvent) => {
        return { text: this.filenameInput.nativeElement.value, code: e.code };
      })).subscribe(e => {
        this.http.get<MFile[]>(`${environment.BaseUrl}${FileApi.findByName}`, { params: { name: e.text } }).subscribe(res => {
          this.files = res;
          if (e.code.toLowerCase() === 'enter') {
            this.cur.dataSource.data = this.files;
          }
        });
      });
  }

  sidernavToggle() {
    this.collapse.emit();
  }

  addNewFiles() {
    const newdia = this.dialog.open(UploadComponent, { minWidth: 350 });
  }

  addNewFolder() {
    const newdia = this.dialog.open(NewdirComponent, { minWidth: 200 });
  }
}
