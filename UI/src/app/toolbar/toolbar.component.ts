import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrentpageService } from '../services/currentpage.service';
import { TableComponent } from '../table/table.component';
import { NewdirComponent } from './newdir/newdir.component';
import { UploadService } from '../services/upload.service';
import { UploadComponent } from './upload/upload.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {
  @Output() collapse = new EventEmitter<boolean>();
  @Input() isHandset: boolean;

  constructor(public cur: CurrentpageService,
    public dialog: MatDialog,) {
  }

  ngOnInit(): void {
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
