import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  trackObjectById(idx, item) {
    return item.id;
  }

  compareWithId(item1, item2) {
    if (item1 && item2) {
      return item1.id === item2.id;
    }
  }

  copyObj(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  findById(id: string | number, arr: any[]) {
    return arr.find((obj: any) => {
      return obj.id == id;
    });
  }

}
