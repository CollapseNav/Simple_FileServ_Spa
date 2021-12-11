import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TableApi } from '../api/Api';
import { MFile } from '../table/table/fileinfo';
import { CurrentpageService } from './currentpage.service';

export interface DownloadFile {
  index: number;
  file: File;
  loaded?: number;
  per?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(public http: HttpClient, public cur: CurrentpageService) { }

  downloadFile(fileId: string): void {
    this.http.get(`${environment.BaseUrl}${TableApi.downloadFile}/${fileId}`, { reportProgress: true, observe: 'events', responseType: 'blob' }).pipe(
      map((event: HttpEvent<any>) => this.getInfo(event))
    ).subscribe(res => {
      if (res)
        console.log(res);
    });
  }

  getInfo(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        let progress = event.loaded / event.total;
        return null;
      case HttpEventType.Response:
        return event.body as MFile;
      case HttpEventType.DownloadProgress:
        console.log(event.loaded / event.total);
        return null;
      default: return null;
    }
  }
}

