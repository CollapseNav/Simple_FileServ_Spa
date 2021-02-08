import { Injectable } from '@angular/core';
import { SelItemConfig } from '../typesel/selconfig';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  typelist: SelItemConfig[] = [
    { icon: 'article', title: 'doc' },
    { icon: 'movie', title: 'video' },
    { icon: 'music_note', title: 'audio' },
  ];
  constructor() { }

  getTypeList(): SelItemConfig[] {
    return this.typelist;
  }
}
