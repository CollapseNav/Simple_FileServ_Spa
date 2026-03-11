import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseFile, Dir, MFile, SizeType } from '../table/table/fileinfo';

@Injectable({
  providedIn: 'root'
})
export class CurrentpageService {
  dataSource: MatTableDataSource<BaseFile> = new MatTableDataSource([]);
  private tablePage: Dir[] = [];
  constructor() { }

  /** 初始化当前页 */
  private initCurrentPage() {
    this.dataSource.data = (this.getCurrentPage().dirs as BaseFile[]).concat((this.getCurrentPage().files as BaseFile[]));
  }

  /** 获取目录 路径 */
  getPageRoute(): Dir[] {
    return this.tablePage;
  }

  popTo(page: Dir): void {
    this.tablePage.splice(this.tablePage.indexOf(page));
    this.add(page);
  }

  /** 获取目录 路径(string) */
  getPageRouteString(): string {
    return this.tablePage.map(item => item.fileName).join('/');
  }

  /** 获取目录 路径(array) */
  getPageRouteStringArray(): string[] {
    return this.tablePage.map(item => item.fileName);
  }

  /** 获取当前页 */
  getCurrentPage(): Dir {
    return this.tablePage[this.tablePage.length - 1];
  }

  add(page: Dir): Dir[] {
    this.tablePage.push(page);
    this.initCurrentPage();
    return this.tablePage;
  }

  /** 添加新的文件夹 */
  addNewDirCur(dir: Dir) {
    this.getCurrentPage().dirs.push(dir);
    this.initCurrentPage();
  }

  /** 移除文件夹 */
  removeDir(dir: BaseFile) {
    var index = this.getCurrentPage().dirs.findIndex(item => item.id === dir.id);
    this.getCurrentPage().dirs.splice(index, 1);
    this.initCurrentPage();
  }

  /** 添加新的文件 */
  addNewFileCur(file: MFile) {
    this.getCurrentPage().files.push(file);
    this.initCurrentPage();
  }

  /** 移除文件 */
  removeFile(file: BaseFile) {
    var index = this.getCurrentPage().files.findIndex(item => item.id === file.id);
    this.getCurrentPage().files.splice(index, 1);
    this.initCurrentPage();
  }
}
