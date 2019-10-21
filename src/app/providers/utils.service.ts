import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatRMB(v: Number): string {
    var str = v.toString();
    var s1 = str.substring(0, str.length - 2);
    var s2 = str.substring(str.length - 2, str.length);
    return s1 + '.' + s2
  }
}

export const utilsService = new UtilsService();