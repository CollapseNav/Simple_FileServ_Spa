import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { SelConfig } from './selconfig';

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
}
