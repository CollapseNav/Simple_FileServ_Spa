import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { FileTypeApi, TableApi } from './api/tableApi';
import { CurrentpageService } from './services/currentpage.service';
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
  isHandSet: boolean = true;
  @ViewChild('sidenav') sidenav: MatSidenav;

  isXsmall: boolean;
  isNavOpen: boolean = false;
  navClass: string = 'nav-container-main';

  // navClass(): string {
  //   return this.navClass = this.isXsmall ? 'nav-container-min' : 'nav-container-main';
  // }


  sideMode: MatDrawerMode = 'side';

  tc: TableConfig<BaseFile> = {
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
            getUrl: item => {
              return `${environment.BaseUrl}${TableApi.downloadFile}` + '/' + item.id;
            },
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
  constructor(public breakobs: BreakpointObserver, public cur: CurrentpageService, public http: HttpClient) {
    // 保持nav关闭状态
    this.breakobs.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait, Breakpoints.XSmall]).subscribe(res => {
      if (!res.matches) return;
      if (!this.sidenav) return;
      this.keepNavClose();
    });
    // 修改到顶部的距离
    this.breakobs.observe([Breakpoints.XSmall]).subscribe(res => {
      this.isXsmall = res.matches;
    });
    // 保持nav开启状态
    this.breakobs.observe([Breakpoints.Web, Breakpoints.TabletLandscape, Breakpoints.WebLandscape]).subscribe(res => {
      if (!res.matches) return;
      if (!this.sidenav) return;
      this.keepNavOpen();
    });
  }

  keepNavClose() {
    this.sideMode = 'over';
    if (this.sidenav.opened)
      this.sidenav.toggle();
  }

  keepNavOpen() {
    this.sideMode = 'side';
    if (!this.sidenav.opened)
      this.sidenav.toggle();

  }
  ngOnInit() {
    this.http.get<FileType[]>(`${environment.BaseUrl}${FileTypeApi.defaultFileType}`).subscribe(res => {
      res.forEach(item => item.selected = true);
      this.selconfig = {
        list: res,
        count: 0,
      };
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
