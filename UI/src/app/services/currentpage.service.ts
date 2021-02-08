import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { BaseFile, Dir, MFile, SizeType } from '../table/table/fileinfo';

@Injectable({
  providedIn: 'root'
})
export class CurrentpageService {
  dataSource: MatTableDataSource<BaseFile> = new MatTableDataSource([]);
  private dirs: Dir[];
  private files: MFile[];
  private tablePage: Dir[] = [];
  constructor() { }

  initCurrentPage() {
    this.dataSource.data = (this.dirs as BaseFile[]).concat((this.files as BaseFile[]));
  }
  getPageRoute(): Dir[] {
    return this.tablePage;
  }

  getCurrentPage(): Dir {
    return this.tablePage[this.tablePage.length - 1];
  }

  add(page: Dir): Dir[] {
    this.tablePage.push(page);
    this.initDirAndFile(page);
    this.initCurrentPage();
    return this.tablePage;
  }

  initDirAndFile(page: Dir) {
    this.dirs = page.dirs;
    this.files = page.files;
  }

  addNewDirCur(dir: Dir) {
    this.getCurrentPage().dirs.push(dir);
    this.initCurrentPage();
  }
  removeDir(dir: BaseFile) {
    var index = this.dirs.findIndex(item => item.id === dir.id);
    this.dirs.splice(index, 1);
    this.initCurrentPage();
  }

  addNewFileCur(file: MFile) {
    this.getCurrentPage().files.push(file);
    this.initCurrentPage();
  }
  removeFile(file: BaseFile) {
    var index = this.files.findIndex(item => item.id === file.id);
    this.files.splice(index, 1);
    this.initCurrentPage();
  }
  resize(size: number) {
    if (this.getSize(size, SizeType.B)) {
      return this.getSize(size, SizeType.B) + 'B';
    }
    if (this.getSize(size, SizeType.K)) {
      return this.getSize(size, SizeType.K) + 'K';
    }
    if (this.getSize(size, SizeType.M)) {
      return this.getSize(size, SizeType.M) + 'M';
    }
    if (this.getSize(size, SizeType.G)) {
      return this.getSize(size, SizeType.G) + 'G';
    }
    return 0;
  }
  private getSize(size: number, type: SizeType): string | boolean {
    var result = size / type;
    return result > 1 && result < 1024 ? result.toFixed(2) : false;
  }
}
