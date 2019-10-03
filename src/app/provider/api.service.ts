import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  key = '';
  currentAddress='湖北荆门市';
}

export const apiService = new ApiService();