import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TableApi } from '../api/tableApi';
import { MFile } from '../table/table/fileinfo';
import { CurrentpageService } from './currentpage.service';

export interface UploadFile {
  index: number;
  file: File;
  loaded?: number;
  per?: number;
}


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(public http: HttpClient, public cur: CurrentpageService) { }

  uploadFile(file: UploadFile): Observable<MFile> {
    const formdata = new FormData();
    formdata.append('file', file.file);
    return this.http.post(`${environment.BaseUrl}${TableApi.defaultFile}/${this.cur.getCurrentPage().id}`, formdata, { reportProgress: true, observe: 'events' }).pipe(
      map((event: HttpEvent<any>) => this.getInfo(event, file))
    );
  }

  getInfo(event: HttpEvent<any>, file: UploadFile) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        let progress = event.loaded / event.total;
        file.loaded = event.loaded;
        file.per = progress * 100;
        return null;
      case HttpEventType.Response:
        file.per = 100;
        return event.body as MFile;
      default: return null;
    }
  }
}

