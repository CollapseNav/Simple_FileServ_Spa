import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatSnackBarContainer } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { FileTypeApi } from '../api/tableApi';
import { SnackBarService } from '../services/snackbar.service';
import { NewtypeComponent } from './newtype/newtype.component';
import { FileType, SelConfig } from './selconfig';

@Component({
  selector: 'app-typesel',
  templateUrl: './typesel.component.html',
  styleUrls: ['./typesel.component.sass']
})
export class TypeselComponent implements OnInit {
  selectAll = true;
  start: number;
  canDelete: boolean;
  canEdit: boolean;
  @Input() title: string = 'Title';
  @Output() sel = new EventEmitter<any>();
  @Input() config!: SelConfig;

  constructor(public dialog: MatDialog,
    public snackbar: SnackBarService,
    public http: HttpClient) { }


  ngOnInit() { }
  isSelectAll(selist: MatSelectionList): boolean {
    return this.config.list.length == selist.selectedOptions.selected.length;
  }
  selectChange(change: MatSelectionListChange): void {
    this.selectAll = this.isSelectAll(change.source);
    const option = change.options[0];
    const ft = this.config.list.find(item => item.name === option.value);
    ft.selected = option.selected;
  }
  setSelectAll(selist: MatSelectionList): void {
    this.selectAll = !this.isSelectAll(selist);
    if (this.selectAll)
      selist.selectAll();
    else
      selist.deselectAll();
    this.config.list.forEach(item => item.selected = this.selectAll);
  }

  openNewType(selist: MatSelectionList = null): void {
    let id: string;
    if (selist) {
      let selectedList = selist.options.filter(item => item.selected);
      if (selectedList.length == 1) {
        id = this.config.list.find(item => item.name == selectedList[0].value).id;
      } else if (selectedList.length > 1) {
        this.snackbar.openSTSnackBar('编辑时只能选中一种类型');
        return;
      }
    }
    const newdia = this.dialog.open(NewtypeComponent, { maxWidth: 350, data: id });
    newdia.afterClosed().subscribe((res: FileType) => {
      if (res) {
        res.selected = true;
        this.config.list.push(res);
      }
    });
  }

  /** 删除所选项 */
  delSelected(): void {
    let delist = this.config.list.filter(item => item.selected);
    delist.forEach(item => {
      this.http.delete(`${environment.BaseUrl}${FileTypeApi.defaultFileType}/${item.id}`).subscribe(res => {
        this.config.list.splice(this.config.list.indexOf(item), 1);
      });
    });
  }

  mouseOver(data: MouseEvent) {
    if (!this.start)
      this.start = data.timeStamp;
    this.canDelete = ((data.timeStamp - this.start) / 1000) > 6.66;
    this.canEdit = this.canDelete;
    // console.log(((data.timeStamp - this.start) / 1000));
  }
  mouseOut(data: MouseEvent) {
    this.start = undefined;
    this.canDelete = false;
    this.canEdit = this.canDelete;
  }

  maxText(txt: string, max: number): string {
    if (txt.length <= max) return txt;
    return txt.substring(0, max) + '...';
  }
}
