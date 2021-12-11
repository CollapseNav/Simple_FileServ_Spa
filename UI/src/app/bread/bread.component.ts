import { Component, OnInit } from '@angular/core';
import { CurrentpageService } from '../services/currentpage.service';
import { Dir } from '../table/table/fileinfo';

/**假装自己是个面包屑 */
@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.sass']
})
export class BreadComponent implements OnInit {
  constructor(public cur: CurrentpageService) { }
  ngOnInit(): void {
  };
  /**定位到某个文件夹 */
  popTo(page: Dir) {
    this.cur.popTo(page);
  }
}
