import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  colors = [
    '#F6A7A7',
    '#6CCECA',
    '#7FE7CC',
    '#F4DADA',
    '#C6CBEF',
    '#C5F8C8',
    '#FF9D76',
    '#FFE5AE',
    '#FFFEEC',
    '#EAEAEA',
    '#C6CFFF'
  ];

  constructor() { }



}
