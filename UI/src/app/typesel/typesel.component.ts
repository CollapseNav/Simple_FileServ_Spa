import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { NewtypeComponent } from './newtype/newtype.component';
import { FileType, SelConfig } from './selconfig';

@Component({
  selector: 'app-typesel',
  templateUrl: './typesel.component.html',
  styleUrls: ['./typesel.component.sass']
})
export class TypeselComponent implements OnInit {
  selectAll = true;
  @Input() title: string = 'Title';
  @Output() sel = new EventEmitter<any>();
  @Input() config!: SelConfig;

  constructor(public dialog: MatDialog,) { }


  ngOnInit() { }
  isSelectAll(selist: MatSelectionList): boolean {
    return this.config.list.length == selist.selectedOptions.selected.length;
  }
  selectChange(change: MatSelectionListChange): void {
    this.selectAll = this.isSelectAll(change.source);
  }
  setSelectAll(selist: MatSelectionList): void {
    this.selectAll = !this.isSelectAll(selist);
    let nn = this.selectAll ? selist.selectAll() : selist.deselectAll();
  }
  getSelectedValues(selectedList: MatSelectionList): string[] | number[] {
    return selectedList.selectedOptions.selected.map(item => item.value);
  }

  openNewType() {
    const newdia = this.dialog.open(NewtypeComponent, { maxWidth: 350 });
    newdia.afterClosed().subscribe((res: FileType) => {
      this.config.list.push(res);
    });
  }
}
