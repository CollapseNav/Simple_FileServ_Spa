import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { FileTypeApi, TableApi } from './api/tableApi';
import { CurrentpageService } from './services/currentpage.service';
import { TypeService } from './services/type.service';
import { BaseFile } from './table/table/fileinfo';
import { ButtonStyle, ColumnBtnEvent, TableConfig } from './table/table/tablecolumn';
import { FileType, SelConfig } from './typesel/selconfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'UI';
  selconfig!: SelConfig;
  isHandSet: boolean = false;
  @ViewChild('sidenav') sidenav: MatSidenav;

  sideMode: MatDrawerMode = 'side';

  tc: TableConfig<BaseFile> = {
    downloadUrl: `${environment.BaseUrl}${TableApi.downloadFile}`,
    columns: [
      { label: 'Name', valIndex: 'fileName', sort: true, format: item => item.fileName },
      { label: 'CreateTime', valIndex: 'addTime', sort: true, format: item => new Date(item.addTime).toLocaleDateString() },
      { label: 'Ext', valIndex: 'ext', sort: true },
      { label: 'Size', valIndex: 'size', sort: true, format: item => this.cur.resize(item.size) },
      {
        label: 'Actions', valIndex: 'actions',
        buttons: [
          {
            content: '下载', style: ButtonStyle.link,
            getUrl: item => this.tc.downloadUrl + '/' + item.id,
            isHidden: item => item.ext,
          },
          {
            content: '删除', style: ButtonStyle.raised, color: 'warn',
            type: ColumnBtnEvent.del,
            getUrl: item => `${environment.BaseUrl}${item.ext ? TableApi.defaultFile : TableApi.defaultDir}`
          }
        ],
      },
    ]
  };
  constructor(public typeServ: TypeService, public breakobs: BreakpointObserver, public cur: CurrentpageService, public http: HttpClient) {
    this.breakobs.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait]).subscribe(res => {
      this.isHandSet = res.matches;
      if (this.isHandSet)
        this.sideMode = 'over';
      else {
        this.sideMode = 'side';
        // this.sidenav.toggle();
      }
    });
  }
  ngOnInit() {
    this.http.get<FileType[]>(`${environment.BaseUrl}${FileTypeApi.defaultFileType}`).subscribe(res => {
      this.selconfig = {
        list: res,
        count: 0,
        selected: res
      };
      // console.log(this.sidenav);
      if (!this.isHandSet) this.sidenav.toggle();
    });
  }
  toggleEmit(item: MatDrawer, status: boolean) {
    switch (status) {
      case undefined: { item.toggle(); break; }
      case true: { if (item.opened) item.toggle(); break; }
      case false: { if (!item.opened) item.toggle(); break; }
    }
  }
}
