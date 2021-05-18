import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { environment } from 'src/environments/environment';
import { TableApi } from '../api/tableApi';
import { MFile } from '../table/table/fileinfo';

export enum PreviewType {
  mp4,
  mkv,
  avi,
  mp3,
  mpeg,
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent implements OnInit {
  @ViewChild('videoPlay') videoref: ElementRef;
  @ViewChild('audioPlay') audioPlay: ElementRef;

  sliderValue: number;
  type: string;
  disableDrag: boolean = false;


  sliderMin: number = 1;
  sliderMax: number = 10;
  get video(): HTMLVideoElement {
    return this.videoref?.nativeElement as HTMLVideoElement;
  }
  get paused(): boolean {
    if (this.video)
      return this.video ? this.video.paused : true;
    if (this.audio)
      return this.audio ? this.audio.paused : true;
    return false;
  }
  get audio(): HTMLAudioElement {
    return this.audioPlay?.nativeElement as HTMLAudioElement;
  }
  previewDialog: MatDialogRef<any, any>;
  downloadUrl: string = `${environment.BaseUrl}${TableApi.downloadFile}/`;
  constructor(@Inject(MAT_DIALOG_DATA) public file: MFile, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.type = this.getPreview(this.file.contentType);
    this.previewDialog = this.dialog.getDialogById(this.file.id);
  }

  play() {
    if (this.video) {
      this.paused ? this.video.play() : this.video.pause();
      // this.video.ontimeupdate = (ev: Event) => this.sliderValue = ev.currentTarget['currentTime'];
    }
    if (this.audio)
      this.paused ? this.audio.play() : this.audio.pause();
  }

  sliderValueChange(value) {
    this.disableDrag = false;
  }

  onTouched(event: MatSliderChange) {
    this.disableDrag = true;
    if (this.video) {
      this.sliderMax = (this.sliderMax == this.video.duration) ? this.sliderMax : this.video.duration;
      this.video.currentTime = event.value;
    }
  }

  formatLabel(value: number): number {
    return value;
  }

  canPreview(contentType: string): boolean {
    if (PreviewType[contentType.split('/')[1]] > -1)
      return true;
    return false;
  }

  getPreview(contentType: string): string {
    return contentType.split('/')[0];
  }
}
