import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileTypeApi } from '../api/Api';
import { FileType, SelConfig, SelItemConfig } from '../typesel/selconfig';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  config: SelConfig;
  constructor(private http: HttpClient) {
    this.http.get<FileType[]>(`${environment.BaseUrl}${FileTypeApi.defaultFileType}`).subscribe(res => {
      res.forEach(item => item.selected = true);
      this.config = {
        list: res,
        count: 0,
      };
    });
  }

  getTypeList(): SelConfig {
    return this.config;
  }
}
