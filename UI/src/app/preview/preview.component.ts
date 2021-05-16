import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { TableApi } from '../api/tableApi';
import { MFile } from '../table/table/fileinfo';

export enum PreviewType {
  mp4,
  mkv,
  avi,
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent implements OnInit {

  @ViewChild('videoPlay') videoref: ElementRef;
  get video(): HTMLVideoElement {
    return this.videoref?.nativeElement as HTMLVideoElement;
  }
  get paused(): boolean {
    return this.video ? this.video.paused : true;
  }
  previewDialog: MatDialogRef<any, any>;
  downloadUrl: string = `${environment.BaseUrl}${TableApi.downloadFile}/`;
  constructor(@Inject(MAT_DIALOG_DATA) public file: MFile, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.previewDialog = this.dialog.getDialogById(this.file.id);
  }

  play() {
    this.paused ? this.video.play() : this.video.pause();
  }
}
