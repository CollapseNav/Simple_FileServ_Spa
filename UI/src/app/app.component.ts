import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer, MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { FileTypeApi, TableApi } from './api/Api';
import { PreviewComponent, PreviewType } from './preview/preview.component';
import { CurrentpageService } from './services/currentpage.service';
import { DownloadService } from './services/download.service';
import { BaseFile, ConvertSize, MFile } from './table/table/fileinfo';
import { ButtonStyle, ColumnBtnEvent, TableConfig } from './table/table/tablecolumn';
import { FileType, SelConfig } from './typesel/selconfig';


export interface NavConfig {
  SideNav: MatSidenav;
  SideModel: MatDrawerMode;
  IsHandSet?: boolean;
  IsXsmall?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'UI';
  selconfig!: SelConfig;
  isHandSet: boolean;
  @ViewChild('sidenav') sidenav: MatSidenav;
  sidenavConfig: NavConfig;
  isXsmall: boolean;
  sideMode: MatDrawerMode = 'side';
  tc: TableConfig<BaseFile> = {
    columns: [
      { label: 'Name', valIndex: 'fileName', sort: true, icon: item => 'folder', format: item => item.fileName },
      { label: 'CreateTime', valIndex: 'addTime', sort: true, format: item => new Date(item.addTime).toLocaleDateString() },
      { label: 'Ext', valIndex: 'ext', sort: true, format: item => item.ext ? item.ext : 'folder' },
      { label: 'Size', valIndex: 'size', sort: true, format: item => ConvertSize(item.size) },
      { label: 'ConType', valIndex: 'contentType', sort: true, maxLen: 10 },
      {
        label: 'Actions', valIndex: 'actions',
        buttons: [
          {
            content: '下载', style: ButtonStyle.raised,
            type: ColumnBtnEvent.action,
            click: item => {
              this.download.downloadFile(item.id);
            },
            // getUrl: item => {
            //   return `${environment.BaseUrl}${TableApi.downloadFile}` + '/' + item.id;
            // },
            isHidden: item => !!item['contentType'],
          },
          {
            content: '删除', style: ButtonStyle.raised, color: 'warn',
            type: ColumnBtnEvent.del,
            getUrl: item => `${environment.BaseUrl}${item['contentType'] ? TableApi.defaultFile : TableApi.defaultDir}`
          },
          {
            content: '预览', style: ButtonStyle.raised, color: 'primary',
            icon: 'play_arrow',
            type: ColumnBtnEvent.action,
            isHidden: item => {
              if (!item.ext) return false;
              if (PreviewType[item.ext.substring(1, item.ext.length)] > -1) return true;
              return false;
            },
            click: item => {
              this.dialog.open(PreviewComponent, {
                maxWidth: '100%',
                minWidth: '10%',
                disableClose: true,
                autoFocus: false,
                hasBackdrop: false,
                id: item.id,
                data: item
              });
            }
          }
        ],
      },
    ]
  };

  checkIsXsmall() {
    this.breakobs.observe([Breakpoints.XSmall]).subscribe(res => {
      this.isXsmall = res.matches;
    });
  }
  checkNavClose() {
    // 保持nav关闭状态
    this.breakobs.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait, Breakpoints.XSmall]).subscribe(res => {
      if (!res.matches) return;
      if (!this.sidenav) return;
      this.keepNavClose();
      this.isHandSet = res.matches;
    });
  }
  checkNavOpen() {
    // 保持nav开启状态
    this.breakobs.observe([Breakpoints.Web, Breakpoints.TabletLandscape, Breakpoints.WebLandscape]).subscribe(res => {
      if (!res.matches) return;
      if (!this.sidenav) return;
      this.keepNavOpen();
      this.isHandSet = res.matches;
    });
  }
  constructor(public breakobs: BreakpointObserver,
    public cur: CurrentpageService,
    public dialog: MatDialog,
    public download: DownloadService,
    public http: HttpClient) {
    this.checkNavClose();
    this.checkNavOpen();
    this.checkIsXsmall();
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
    if (!this.sidenavConfig) {
      this.sidenavConfig = {
        SideModel: 'side',
        SideNav: this.sidenav,
      };
    }
    this.http.get<FileType[]>(`${environment.BaseUrl}${FileTypeApi.defaultFileType}`).subscribe(res => {
      res.forEach(item => item.selected = true);
      this.selconfig = {
        list: res,
        count: 0,
      };
      this.checkNavClose();
      this.checkNavOpen();
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
