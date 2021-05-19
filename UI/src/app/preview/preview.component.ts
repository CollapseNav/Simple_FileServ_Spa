import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { fromEvent, Observable } from 'rxjs';
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
export class PreviewComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlay') videoref: ElementRef;
  @ViewChild('audioPlay') audioPlay: ElementRef;

  sliderValue: number;
  type: string;
  /** 控制全屏或者取消全屏 */
  isFullScreen: boolean = false;
  disableDrag: boolean = false;
  /** 默认的进度条最小值 */
  sliderMin: number = 1;
  /** 默认的进度条最大值 */
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
  ngAfterViewInit() {
    fromEvent(this.video, 'timeupdate').subscribe((res: Event) => {
      this.sliderValue = res.currentTarget['currentTime'];
    });
    fromEvent(this.video, 'play').subscribe((res: Event) => {
      this.sliderMax = this.video.duration;
    });
  }
  ngOnInit(): void {
    this.type = this.getPreview(this.file.contentType);
    this.previewDialog = this.dialog.getDialogById(this.file.id);
    this.previewDialog.updateSize('60%');
  }
  /** 双击事件 */
  doubleClick() {
    this.isFullScreen ? this.video.ownerDocument.exitFullscreen().then(item => this.isFullScreen = false) : this.video.requestFullscreen({ navigationUI: 'show' }).then(item => this.isFullScreen = true);

  }
  /** 播放或暂停 */
  play() {
    if (this.video) {
      this.paused ? this.video.play() : this.video.pause();
    }
    if (this.audio)
      this.paused ? this.audio.play() : this.audio.pause();
  }
  /** 获取视频总时长 */
  get totalTime(): string {
    return this.convertNumberToTime(this.video?.duration);
  }

  /** 获取视频已播放时长 */
  get currentTime(): string {
    return this.convertNumberToTime(this.video?.currentTime).padStart(2, '0').padStart(this.totalTime.length, '00:00:00:00:00:00:00');
  }

  /** number 转成时长 */
  convertNumberToTime(num: number): string {
    if (!num) return '0';
    if ((num / 60) < 1) return Math.ceil(num % 60).toString().padStart(2, '0');
    return this.convertNumberToTime(num / 60) + ':' + Math.ceil(num % 60).toString().padStart(2, '0');
  }

  sliderValueChange(value) {
    this.disableDrag = false;
  }

  /** 拖动进度条时触发 */
  onTouched(event: MatSliderChange) {
    this.disableDrag = true;
    this.video.currentTime = event.value;
  }

  getPreview(contentType: string): string {
    return contentType.split('/')[0];
  }
}
