import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { TableApi } from '../api/tableApi';
import { PreviewComponent } from '../preview/preview.component';
import { CurrentpageService } from '../services/currentpage.service';
import { BaseFile, Dir, SizeType } from './table/fileinfo';
import { ButtonStyle, TableColumn, TableConfig } from './table/tablecolumn';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  btnStyle = ButtonStyle;
  @ViewChild(MatSort) sort: MatSort;

  /** 表格的列配置 */
  @Input() tableConfig: TableConfig<BaseFile>;
  column: TableColumn<BaseFile>[];

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<BaseFile> = new MatTableDataSource([]);
  constructor(public http: HttpClient,
    public dialog: MatDialog,
    public cur: CurrentpageService) { }
  ngOnInit(): void {
    this.column = this.tableConfig.columns;
    this.displayedColumns = this.column.map(item => item.valIndex);
    this.dataSource = this.cur.dataSource;
    this.http.get<Dir>(`${environment.BaseUrl}${TableApi.getRoot}`).subscribe((res: Dir) => {
      this.resetTableData(res);
    });
  };
  doubleClick(dir: BaseFile) {
    if (dir['contentType']) {
      this.dialog.open(PreviewComponent, {
        maxWidth: '50%',
        minWidth: '10%',
        disableClose: true,
        autoFocus: false,
        hasBackdrop: false,
        id: dir.id,
        data: dir
      });
    }
    else
      this.http.get<Dir>(`${environment.BaseUrl}${TableApi.defaultDir}/${dir.id}`).subscribe(res => {
        this.resetTableData(res);
      });
  }

  resetTableData(data: Dir): void {
    this.cur.add(data);
    this.dataSource.sort = this.sort;
  };

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  format(item: BaseFile, col: TableColumn<BaseFile>): string {
    let result: string = !!col.format ? col.format(item) : item[col.valIndex];
    return col.maxLen ? (result?.length > col.maxLen ? result.substr(0, col.maxLen - 1) + '...' : result) : result;
  }

  delete(item: BaseFile) {
    if (item.ext) this.cur.removeFile(item);
    else this.cur.removeDir(item);
  }
};
